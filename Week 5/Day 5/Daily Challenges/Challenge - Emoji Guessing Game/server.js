import express from "express";
import path from "path";
import cors from "cors";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Emoji data
const emojis = [
  { emoji: "😀", name: "Smile", unicode: "&#128512;" },
  { emoji: "🐶", name: "Dog", unicode: "&#128054;" },
  { emoji: "🌮", name: "Taco", unicode: "&#127790;" },
  { emoji: "🍕", name: "Pizza", unicode: "&#127829;" },
  { emoji: "🎉", name: "Party Popper", unicode: "&#127881;" },
  { emoji: "🚀", name: "Rocket", unicode: "&#128640;" },
  { emoji: "🎸", name: "Guitar", unicode: "&#127928;" },
  { emoji: "🏀", name: "Basketball", unicode: "&#127936;" },
  { emoji: "🎨", name: "Artist Palette", unicode: "&#127912;" },
  { emoji: "🌍", name: "Earth Globe", unicode: "&#127757;" },
  { emoji: "🐱", name: "Cat", unicode: "&#128049;" },
  { emoji: "🍎", name: "Apple", unicode: "&#127822;" },
  { emoji: "🌟", name: "Star", unicode: "&#127775;" },
  { emoji: "⚽", name: "Soccer Ball", unicode: "&#9917;" },
  { emoji: "🎈", name: "Balloon", unicode: "&#127880;" },
  { emoji: "🎤", name: "Microphone", unicode: "&#127908;" },
  { emoji: "🚗", name: "Car", unicode: "&#128663;" },
  { emoji: "🍩", name: "Doughnut", unicode: "&#127849;" },
  { emoji: "🎬", name: "Clapper Board", unicode: "&#127916;" },
  { emoji: "🐰", name: "Rabbit", unicode: "&#128048;" },
  { emoji: "🌈", name: "Rainbow", unicode: "&#127752;" },
  { emoji: "🎮", name: "Video Game", unicode: "&#127918;" },
  { emoji: "🍦", name: "Ice Cream", unicode: "&#127846;" },
  { emoji: "🏖️", name: "Beach with Umbrella", unicode: "&#127958;" },
  { emoji: "🎂", name: "Birthday Cake", unicode: "&#127856;" },
  { emoji: "🌺", name: "Hibiscus", unicode: "&#127802;" },
  { emoji: "🦁", name: "Lion", unicode: "&#129409;" },
];

// In-memory storage for game sessions and leaderboard
let gameSessions = new Map();
let leaderboard = [];

// Generate random emoji with choices
const getRandomEmojiWithChoices = () => {
  const correctEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Get 3 distractors (excluding the correct answer)
  const distractors = emojis
    .filter((emoji) => emoji.name !== correctEmoji.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  // Combine distractors with correct answer and shuffle the final choices
  const choices = [...distractors, correctEmoji].sort(() => Math.random() - 0.5);
  
  return { correctEmoji, choices };
};

// Session cleanup
const cleanupSessions = () => {
  const oneHour = 60 * 60 * 1000;
  for (const [sessionId, session] of gameSessions.entries()) {
    if (Date.now() - session.startTime > oneHour) {
      gameSessions.delete(sessionId);
    }
  }
};

// Run cleanup every hour
setInterval(cleanupSessions, 60 * 60 * 1000);

// Routes with better error handling
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/new-game', (req, res) => {
  try {
    const gameData = getRandomEmojiWithChoices();
    const sessionId = Date.now().toString();

    // Store game session
    gameSessions.set(sessionId, {
      correctAnswer: gameData.correctEmoji.name,
      score: 0,
      totalQuestions: 0,
      startTime: Date.now()
    });

    res.json({
      sessionId,
      emoji: gameData.correctEmoji.emoji,
      choices: gameData.choices.map(choice => choice.name)
    });
  } catch (error) {
    console.error('Error starting new game:', error);
    res.status(500).json({ error: 'Failed to start new game' });
  }
});

app.post('/api/submit-guess', (req, res) => {
  try {
    const { sessionId, guess } = req.body;

    if (!sessionId || !guess) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!gameSessions.has(sessionId)) {
      return res.status(400).json({ error: 'Invalid or expired session' });
    }

    const session = gameSessions.get(sessionId);
    const isCorrect = guess === session.correctAnswer;

    // Update session
    session.totalQuestions += 1;
    if (isCorrect) {
      session.score += 1;
    }

    gameSessions.set(sessionId, session);

    res.json({
      correct: isCorrect,
      correctAnswer: session.correctAnswer,
      score: session.score,
      totalQuestions: session.totalQuestions
    });
  } catch (error) {
    console.error('Error submitting guess:', error);
    res.status(500).json({ error: 'Failed to submit guess' });
  }
});

app.get('/api/next-question/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!gameSessions.has(sessionId)) {
      return res.status(400).json({ error: 'Invalid or expired session' });
    }

    const gameData = getRandomEmojiWithChoices();
    const session = gameSessions.get(sessionId);

    // Update session with new correct answer
    session.correctAnswer = gameData.correctEmoji.name;
    gameSessions.set(sessionId, session);

    res.json({
      emoji: gameData.correctEmoji.emoji,
      choices: gameData.choices.map(choice => choice.name)
    });
  } catch (error) {
    console.error('Error getting next question:', error);
    res.status(500).json({ error: 'Failed to get next question' });
  }
});

app.post('/api/end-game', (req, res) => {
  const { sessionId, playerName } = req.body;
  
  if (!gameSessions.has(sessionId)) {
    return res.status(400).json({ error: 'Invalid session' });
  }
  
  const session = gameSessions.get(sessionId);
  const finalScore = {
    playerName: playerName || 'Anonymous',
    score: session.score,
    totalQuestions: session.totalQuestions,
    percentage: session.totalQuestions > 0 ? Math.round((session.score / session.totalQuestions) * 100) : 0,
    date: new Date().toISOString()
  };
  
  // Add to leaderboard and sort
  leaderboard.push(finalScore);
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.percentage - a.percentage;
  });
  
  // Keep only top 10 scores
  leaderboard = leaderboard.slice(0, 10);
  
  // Clean up session
  gameSessions.delete(sessionId);
  
  res.json(finalScore);
});

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
