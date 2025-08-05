let currentQuestion = null;
let gameInProgress = false;

// DOM elements
const emojiElement = document.getElementById('emoji');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const resultElement = document.getElementById('result');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const gameForm = document.getElementById('game-form');

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadScore();
    loadNewEmoji();
    setupEventListeners();
});

function setupEventListeners() {
    // Form submission
    gameForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        await submitGuess();
    });

    // Next button
    nextBtn.addEventListener('click', () => {
        loadNewEmoji();
    });

    // Reset button
    resetBtn.addEventListener('click', async () => {
        if (confirm('Are you sure you want to reset your score?')) {
            await resetGame();
        }
    });

    // Option selection
    optionsElement.addEventListener('change', () => {
        submitBtn.disabled = false;
    });
}

async function loadNewEmoji() {
    try {
        // Show loading state
        resultElement.innerHTML = '<div class="loading">🔄 Loading new emoji...</div>';
        submitBtn.disabled = true;
        nextBtn.style.display = 'none';
        
        // Clear previous options
        optionsElement.innerHTML = '';
        
        const response = await fetch('/api/emoji');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        currentQuestion = await response.json();
        displayQuestion();
        gameInProgress = true;
        
    } catch (error) {
        console.error('Error loading emoji:', error);
        resultElement.innerHTML = '<div class="feedback incorrect">❌ Error loading emoji. Please try again.</div>';
    }
}

function displayQuestion() {
    if (!currentQuestion) return;
    
    // Display emoji
    emojiElement.textContent = currentQuestion.emoji;
    
    // Clear result
    resultElement.innerHTML = '';
    
    // Create options
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `
            <input type="radio" name="guess" value="${option}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsElement.appendChild(optionDiv);
        
        // Add click handler to the div
        optionDiv.addEventListener('click', () => {
            const radio = optionDiv.querySelector('input[type="radio"]');
            radio.checked = true;
            submitBtn.disabled = false;
        });
    });
    
    submitBtn.disabled = true;
}

async function submitGuess() {
    if (!currentQuestion || !gameInProgress) return;
    
    const formData = new FormData(gameForm);
    const selectedGuess = formData.get('guess');
    
    if (!selectedGuess) {
        alert('Please select an answer!');
        return;
    }
    
    try {
        submitBtn.disabled = true;
        resultElement.innerHTML = '<div class="loading">🤔 Checking your answer...</div>';
        
        const response = await fetch('/api/guess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guess: selectedGuess,
                correctAnswer: currentQuestion.correctAnswer
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        displayResult(result, selectedGuess);
        gameInProgress = false;
        
    } catch (error) {
        console.error('Error submitting guess:', error);
        resultElement.innerHTML = '<div class="feedback incorrect">❌ Error submitting guess. Please try again.</div>';
        submitBtn.disabled = false;
    }
}

function displayResult(result, selectedGuess) {
    // Update score
    updateScore(result.score, result.totalQuestions, result.percentage);
    
    // Show result feedback
    const feedbackClass = result.correct ? 'correct' : 'incorrect';
    resultElement.innerHTML = `<div class="feedback ${feedbackClass}">${result.feedback}</div>`;
    
    // Update option styles
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        const radio = option.querySelector('input[type="radio"]');
        const optionValue = radio.value;
        
        option.classList.add('disabled');
        
        if (optionValue === currentQuestion.correctAnswer) {
            option.style.backgroundColor = '#d4edda';
            option.style.borderColor = '#28a745';
            option.style.fontWeight = 'bold';
        } else if (optionValue === selectedGuess && !result.correct) {
            option.style.backgroundColor = '#f8d7da';
            option.style.borderColor = '#dc3545';
        } else {
            option.style.opacity = '0.6';
        }
    });
    
    // Show next button
    nextBtn.style.display = 'inline-block';
}

function updateScore(score, totalQuestions, percentage) {
    scoreElement.textContent = `Score: ${score}/${totalQuestions} (${percentage}%)`;
}

async function loadScore() {
    try {
        const response = await fetch('/api/score');
        if (response.ok) {
            const scoreData = await response.json();
            updateScore(scoreData.score, scoreData.totalQuestions, scoreData.percentage);
        }
    } catch (error) {
        console.error('Error loading score:', error);
    }
}

async function resetGame() {
    try {
        const response = await fetch('/api/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            updateScore(0, 0, 0);
            resultElement.innerHTML = '<div class="feedback correct">🎮 Game reset! Ready for a fresh start!</div>';
            loadNewEmoji();
        }
    } catch (error) {
        console.error('Error resetting game:', error);
        resultElement.innerHTML = '<div class="feedback incorrect">❌ Error resetting game. Please try again.</div>';
    }
}