import Router from 'express'
import quizQuestions from '../models/quizData.js'

const router = Router();

// Game state 
let currentIndex = 0;
let score = 0;

// GET /quiz - Show the first question
router.get('/', (req, res) => {
  currentIndex = 0;
  score = 0;

  res.json({
    message: "Welcome to the trivia quiz!",
    currentQuestion: currentIndex + 1,
    question: quizQuestions[currentIndex].question
  });
});

// POST /quiz - Submit answer and go to next question
router.post('/', (req, res) => {
  const userAnswer = req.body.answer;

  if (!userAnswer) {
    return res.status(400).json({ error: "Please provide an answer." });
  }

  const currentQuestion = quizQuestions[currentIndex];
  const isCorrect = currentQuestion.answer.toLowerCase() === userAnswer.toLowerCase();

  if (isCorrect) score++;

  const feedback = isCorrect ? "Correct!" : `Incorrect. The correct answer was '${currentQuestion.answer}'.`;

  currentIndex++;

  // Check if there are more questions
  if (currentIndex < quizQuestions.length) {
    return res.json({
      feedback,
      score,
      nextQuestion: {
        number: currentIndex + 1,
        question: quizQuestions[currentIndex].question
      }
    });
  } else {
    // Quiz finished
    return res.json({
      feedback,
      message: "Quiz completed!",
      finalScore: score,
      totalQuestions: quizQuestions.length
    });
  }
});

// GET /quiz/score - Return final score
router.get('/score', (req, res) => {
  const finished = currentIndex >= quizQuestions.length;

  res.json({
    finished,
    score,
    totalQuestions: quizQuestions.length,
    message: finished
      ? "You completed the quiz!"
      : "Quiz still in progress."
  });
});



export default router;