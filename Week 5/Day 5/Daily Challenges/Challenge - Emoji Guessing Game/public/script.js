// Game state
let currentSession = null;
let currentScore = 0;
let totalQuestions = 0;
let isSubmitting = false;

// DOM Elements
const howToContainer = document.getElementById('how-to-container');
const gameContainer = document.getElementById('game-container');
const btnStart = document.getElementById('btn-start');
const btnLeaderboard = document.getElementById('btn-leaderboard');
const emojiField = document.getElementById('emoji-field');
const choicesContainer = document.getElementById('choices-container');
const submitBtn = document.querySelector('.btn-submit');

// API calls with retry logic
async function fetchWithRetry(url, options = {}, retries = 3) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return fetchWithRetry(url, options, retries - 1);
    }
    throw error;
  }
}

// Initialize game
const initGame = () => {
  btnStart.addEventListener('click', startNewGame);
  btnLeaderboard.addEventListener('click', showLeaderboard);
  submitBtn.addEventListener('click', submitGuess);
  const btnReset = document.getElementById('btn-reset');
  if (btnReset) {
    btnReset.addEventListener('click', startNewGame);
  }
  gameContainer.classList.add('hidden');
  howToContainer.classList.remove('hidden');
};

// Show loading state
const setLoading = (isLoading) => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.disabled = isLoading;
    button.classList.toggle('loading', isLoading);
  });
};

// Start a new game
const startNewGame = async () => {
  try {
    setLoading(true);
    const gameData = await fetchWithRetry('/api/new-game');

    currentSession = gameData.sessionId;
    currentScore = 0;
    totalQuestions = 0;
    
    howToContainer.classList.add('hidden');
    gameContainer.classList.remove('hidden');

    loadQuestion(gameData.emoji, gameData.choices);
    updateScoreDisplay();
    
  } catch (error) {
    console.error('Error starting new game:', error);
    showError('Failed to start new game. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Load question with emoji and choices
const loadQuestion = (emoji, choices) => {
  emojiField.innerHTML = emoji;
  choicesContainer.innerHTML = '';
  
  choices.forEach((choice, index) => {
    const label = document.createElement('label');
    label.className = 'group cursor-pointer';
    
    label.innerHTML = `
      <input type="radio" name="choice" value="${choice}" class="hidden peer">
      <div class="flex justify-center items-center min-w-60 h-12 px-4 border-1 border-gray-300 rounded-xl shadow-sm
            peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-blue-600
            peer-checked:border-blue-600 peer-checked:text-white peer-checked:shadow-md peer-checked:scale-105
            hover:bg-gray-50 hover:shadow-md
            group-active:scale-95 hover:scale-105
            transition-all duration-150 ease-in-out">
        <p class="text-lg font-semibold text-center transition-colors duration-150">${choice}</p>
      </div>
    `;
    
    choicesContainer.appendChild(label);
  });
  
  submitBtn.disabled = false;
  submitBtn.classList.remove('loading');
};

// Submit player's guess
const submitGuess = async () => {
  if (isSubmitting) return;

  const selectedChoice = document.querySelector('input[name="choice"]:checked');
  
  if (!selectedChoice) {
    showError('Please select an answer before submitting!');
    return;
  }
  
  try {
    isSubmitting = true;
    setLoading(true);
    const guess = selectedChoice.value;

    const result = await fetchWithRetry('/api/submit-guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: currentSession,
        guess: guess
      })
    });
    
    currentScore = result.score;
    totalQuestions = result.totalQuestions;
    
    showFeedback(result.correct, result.correctAnswer, guess);
    updateScoreDisplay();
    
    setTimeout(() => loadNextQuestion(), 2000);

  } catch (error) {
    console.error('Error submitting guess:', error);
    showError('Failed to submit guess. Please try again.');
  } finally {
    isSubmitting = false;
    setLoading(false);
  }
};

// Show error message
const showError = (message) => {
  const errorModal = document.createElement('div');
  errorModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

  errorModal.innerHTML = `
    <div class="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl">
      <div class="text-6xl mb-4">⚠️</div>
      <p class="text-lg text-red-600">${message}</p>
    </div>
  `;

  document.body.appendChild(errorModal);
  setTimeout(() => document.body.removeChild(errorModal), 2000);
};

// Show feedback to player
const showFeedback = (isCorrect, correctAnswer, playerGuess) => {
  const feedbackArea = document.getElementById('feedback-area');
  if (!feedbackArea) return;

  if (isCorrect) {
    feedbackArea.textContent = `🎉 Correct! The answer was "${correctAnswer}"`;
    feedbackArea.style.background = 'linear-gradient(to right, #d1fae5, #bbf7d0)';
    feedbackArea.style.color = '#166534';
  } else {
    feedbackArea.textContent = `😔 Incorrect! You selected: "${playerGuess}". Correct: "${correctAnswer}"`;
    feedbackArea.style.background = 'linear-gradient(to right, #fee2e2, #fecaca)';
    feedbackArea.style.color = '#991b1b';
  }
  feedbackArea.style.transition = 'opacity 0.5s';
  feedbackArea.style.opacity = '1';

  setTimeout(() => {
    feedbackArea.style.opacity = '0';
    setTimeout(() => {
      feedbackArea.textContent = '';
      feedbackArea.style.background = '';
      feedbackArea.style.color = '';
      feedbackArea.style.opacity = '1';
    }, 500);
  }, 1500);
};

// Load next question
const loadNextQuestion = async () => {
  try {
    const response = await fetch(`/api/next-question/${currentSession}`);
    const gameData = await response.json();
    
    loadQuestion(gameData.emoji, gameData.choices);
    
  } catch (error) {
    console.error('Error loading next question:', error);
    alert('Failed to load next question. Please try again.');
  }
};

// Update score display
const updateScoreDisplay = () => {
  // Create or update score display
  let scoreDisplay = document.getElementById('score-display');
  
  if (!scoreDisplay) {
    scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score-display';
    scoreDisplay.className = 'text-center mb-4';

    const gameTitle = document.querySelector('h2');
    gameTitle.parentNode.insertBefore(scoreDisplay, gameTitle.nextSibling);
  }
  
  scoreDisplay.innerHTML = `
    <div class="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-4 mb-4">
      <p class="text-lg font-semibold text-gray-800">
        Score: <span class="text-blue-600">${currentScore}</span> / 
        <span class="text-purple-600">${totalQuestions}</span>
        ${totalQuestions > 0 ? `(${Math.round((currentScore / totalQuestions) * 100)}%)` : ''}
      </p>
    </div>
  `;
  
  // Add end game option after 10 questions
  if (totalQuestions >= 10) {
    setTimeout(() => {
      showEndGameOption();
    }, 2500);
  }
};

// Show end game option
const showEndGameOption = () => {
  // Hide and clear feedback area to avoid overlap
  const feedbackArea = document.getElementById('feedback-area');
  if (feedbackArea) {
    feedbackArea.textContent = '';
    feedbackArea.style.background = '';
    feedbackArea.style.color = '';
    feedbackArea.style.opacity = '1';
  }

  const endGameModal = document.createElement('div');
  endGameModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

  const endGameContent = document.createElement('div');
  endGameContent.className = 'bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl';

  endGameContent.innerHTML = `
    <h3 class="text-2xl font-bold text-gray-800 mb-4">Great Job!</h3>
    <p class="text-lg text-gray-600 mb-2">You've completed 10 questions!</p>
    <p class="text-lg text-gray-600 mb-6">Final Score: ${currentScore}/10 (${Math.round((currentScore / 10) * 100)}%)</p>
    <input type="text" id="player-name" placeholder="Enter your name (optional)"
           class="w-full p-3 border border-gray-300 rounded-lg mb-4 text-center">
    <div class="flex gap-4 justify-center">
      <button id="save-score" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
        Save Score
      </button>
      <button id="continue-playing" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
        Continue
      </button>
    </div>
  `;
  endGameModal.appendChild(endGameContent);
  document.body.appendChild(endGameModal);

  // Attach event listeners after appending to DOM
  document.getElementById('save-score').onclick = () => {
    const playerName = document.getElementById('player-name').value;
    endGame(playerName);
    document.body.removeChild(endGameModal);
  };
  document.getElementById('continue-playing').onclick = () => {
    document.body.removeChild(endGameModal);
    loadNextQuestion();
  };
};

// End game and save score
const endGame = async (playerName) => {
  try {
    const response = await fetch('/api/end-game', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: currentSession,
        playerName: playerName
      })
    });
    
    const finalScore = await response.json();
    
    // Show final score and leaderboard
    showLeaderboard();
    
  } catch (error) {
    console.error('Error ending game:', error);
    alert('Failed to save score. Please try again.');
  }
};

// Show leaderboard
const showLeaderboard = async () => {
  try {
    const response = await fetch('/api/leaderboard');
    const leaderboard = await response.json();
    
    // Hide current view
    howToContainer.classList.add('hidden');
    gameContainer.classList.add('hidden');
    
    // Use static leaderboard container
    let leaderboardContainer = document.getElementById('leaderboard-container');
    leaderboardContainer.className = 'min-h-[80vh] flex items-center justify-center p-4';
    leaderboardContainer.classList.remove('hidden');

    leaderboardContainer.innerHTML = `
      <div class="w-11/12 max-w-4xl border-2 border-gray-200 rounded-2xl shadow-xl bg-white/95 backdrop-blur-sm py-8 px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-8">🏆 Leaderboard 🏆</h2>
        <div class="space-y-4 mb-8">
          ${leaderboard.length === 0 ? 
            '<p class="text-center text-gray-500 text-lg">No scores yet! Be the first to play!</p>' :
            leaderboard.map((score, index) => `
              <div class="flex items-center justify-between p-4 rounded-xl ${
                index === 0 ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-2 border-yellow-300' :
                index === 1 ? 'bg-gradient-to-r from-gray-100 to-gray-200 border-2 border-gray-300' :
                index === 2 ? 'bg-gradient-to-r from-orange-100 to-orange-200 border-2 border-orange-300' :
                'bg-gray-50 border border-gray-200'
              }">
                <div class="flex items-center gap-4">
                  <span class="text-2xl font-bold ${
                    index === 0 ? 'text-yellow-600' :
                    index === 1 ? 'text-gray-600' :
                    index === 2 ? 'text-orange-600' :
                    'text-gray-500'
                  }">
                    ${index + 1}
                  </span>
                  <div>
                    <p class="font-semibold text-lg">${score.playerName}</p>
                    <p class="text-gray-600 text-sm">${new Date(score.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-xl font-bold">${score.score}/${score.totalQuestions}</p>
                  <p class="text-sm text-gray-600">${score.percentage}%</p>
                </div>
              </div>
            `).join('')
          }
        </div>
        <div class="flex justify-center gap-4">
          <button id="new-game-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">
            New Game
          </button>
          <button id="back-home-btn" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    `;
    // Add event listeners
    document.getElementById('new-game-btn').addEventListener('click', () => {
      leaderboardContainer.classList.add('hidden');
      startNewGame();
    });
    document.getElementById('back-home-btn').addEventListener('click', () => {
      leaderboardContainer.classList.add('hidden');
      howToContainer.classList.remove('hidden');
      gameContainer.classList.add('hidden');
    });
    
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    alert('Failed to load leaderboard. Please try again.');
  }
};

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', initGame);