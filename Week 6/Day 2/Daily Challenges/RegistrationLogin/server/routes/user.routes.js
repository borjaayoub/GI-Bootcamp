import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();

// Register new user
router.post('/register', UserController.register);

// Login user
router.post('/login', UserController.login);

// Get all users
router.get('/users', UserController.getAllUsers);

// Get user by ID
router.get('/users/:id', UserController.getUserById);

// Update user
router.put('/users/:id', UserController.updateUser);

export default router;
