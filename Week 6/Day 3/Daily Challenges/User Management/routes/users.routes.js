import express from 'express';
import { 
    register, 
    login, 
    getAllUsers, 
    getUserById, 
    updateUser,
} from '../controllers/user.controller.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);

// User management routes
router.get('/users', getAllUsers);
router.get('/users/:id', getUserById);
router.put('/users/:id', updateUser);

export default router;
