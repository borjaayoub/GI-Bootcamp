
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Emoji data
const emojis = [
    { emoji: '😀', name: 'grinning face' },
    { emoji: '😂', name: 'face with tears of joy' },
    { emoji: '😍', name: 'smiling face with heart-eyes' },
    { emoji: '🤔', name: 'thinking face' },
    { emoji: '😎', name: 'smiling face with sunglasses' },
    { emoji: '😴', name: 'sleeping face' },
    { emoji: '🥳', name: 'partying face' },
    { emoji: '😭', name: 'loudly crying face' },
    { emoji: '🤩', name: 'star-struck' },
    { emoji: '😈', name: 'smiling face with horns' },
    { emoji: '🐶', name: 'dog face' },
    { emoji: '🐱', name: 'cat face' },
    { emoji: '🦁', name: 'lion' },
    { emoji: '🐸', name: 'frog' },
    { emoji: '🦋', name: 'butterfly' },
    { emoji: '🐝', name: 'honeybee' },
    { emoji: '🦄', name: 'unicorn' },
    { emoji: '🐘', name: 'elephant' },
    { emoji: '🦒', name: 'giraffe' },
    { emoji: '🐧', name: 'penguin' },
    { emoji: '🍎', name: 'red apple' },
    { emoji: '🍌', name: 'banana' },
    { emoji: '🍕', name: 'pizza' },
    { emoji: '🍔', name: 'hamburger' },
    { emoji: '🍰', name: 'shortcake' },
    { emoji: '🍪', name: 'cookie' },
    { emoji: '🍫', name: 'chocolate bar' },
    { emoji: '🍭', name: 'lollipop' },
    { emoji: '🍩', name: 'doughnut' },
    { emoji: '🍦', name: 'soft ice cream' },
    { emoji: '⚽', name: 'soccer ball' },
    { emoji: '🏀', name: 'basketball' },
    { emoji: '🎾', name: 'tennis' },
    { emoji: '🎯', name: 'direct hit' },
    { emoji: '🎮', name: 'video game' },
    { emoji: '🎲', name: 'game die' },
    { emoji: '🎸', name: 'guitar' },
    { emoji: '🎹', name: 'musical keyboard' },
    { emoji: '🎵', name: 'musical note' },
    { emoji: '🎤', name: 'microphone' },
    { emoji: '🌟', name: 'glowing star' },
    { emoji: '⭐', name: 'star' },
    { emoji: '🌙', name: 'crescent moon' },
    { emoji: '☀️', name: 'sun' },
    { emoji: '🌈', name: 'rainbow' },
    { emoji: '⚡', name: 'high voltage' },
    { emoji: '❄️', name: 'snowflake' },
    { emoji: '🔥', name: 'fire' },
    { emoji: '💧', name: 'droplet' },
    { emoji: '🌊', name: 'water wave' }
];

// Game state for each session
let gameStats = {
    score: 0,
    totalQuestions: 0
};

// Function to get random options
function getRandomOptions(correctAnswer, count = 4) {
    const incorrect = emojis
        .filter(e => e.name !== correctAnswer)
        .sort(() => Math.random() - 0.5)
        .slice(0, count - 1)
        .map(e => e.name);
    
    const options = [...incorrect, correctAnswer];
    return options.sort(() => Math.random() - 0.5);
}

// API Routes
app.get('/api/emoji', (req, res) => {
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const options = getRandomOptions(randomEmoji.name);
    
    res.json({
        emoji: randomEmoji.emoji,
        correctAnswer: randomEmoji.name,
        options: options
    });
});

app.post('/api/guess', (req, res) => {
    const { guess, correctAnswer } = req.body;
    const isCorrect = guess === correctAnswer;
    
    gameStats.totalQuestions++;
    if (isCorrect) {
        gameStats.score++;
    }
    
    const percentage = gameStats.totalQuestions > 0 
        ? Math.round((gameStats.score / gameStats.totalQuestions) * 100) 
        : 0;
    
    res.json({
        correct: isCorrect,
        correctAnswer: correctAnswer,
        score: gameStats.score,
        totalQuestions: gameStats.totalQuestions,
        percentage: percentage,
        feedback: isCorrect 
            ? "🎉 Correct! Well done!" 
            : `❌ Wrong! The correct answer was "${correctAnswer}"`
    });
});

app.get('/api/score', (req, res) => {
    const percentage = gameStats.totalQuestions > 0 
        ? Math.round((gameStats.score / gameStats.totalQuestions) * 100) 
        : 0;
    
    res.json({
        score: gameStats.score,
        totalQuestions: gameStats.totalQuestions,
        percentage: percentage
    });
});

app.post('/api/reset', (req, res) => {
    gameStats = { score: 0, totalQuestions: 0 };
    res.json({ message: 'Game reset successfully', stats: gameStats });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`🎮 Emoji Guessing Game server running on http://localhost:${PORT}`);
    console.log(`📁 Serving static files from the 'public' directory`);
});