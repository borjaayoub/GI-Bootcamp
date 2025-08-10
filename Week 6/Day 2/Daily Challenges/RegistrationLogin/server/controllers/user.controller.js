import bcrypt from 'bcrypt';
import UserModel from '../models/user.model.js';

const SALT_ROUNDS = 10;

const UserController = {
    register: async (req, res) => {
        try {
            const { username, password, email, first_name, last_name } = req.body;

            // Validate required fields
            if (!username || !password || !email) {
                return res.status(400).json({
                    error: 'Missing required fields',
                    required: ['username', 'password', 'email']
                });
            }

            // Validate password strength
            if (password.length < 8) {
                return res.status(400).json({
                    error: 'Password must be at least 8 characters long'
                });
            }

            // Check if user already exists
            const existingUser = await UserModel.findByUsername(username);
            if (existingUser) {
                return res.status(409).json({ error: 'Username already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            // Create new user with transaction (handled in the model)
            const userData = { username, email, first_name, last_name };
            const newUser = await UserModel.createUser(userData, hashedPassword);

            // Return user data without sensitive information
            res.status(201).json({
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                created_at: newUser.created_at
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                error: 'Error creating user',
                message: error.message
            });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // Validate required fields
            if (!username || !password) {
                return res.status(400).json({
                    error: 'Missing required fields',
                    required: ['username', 'password']
                });
            }

            // Find user
            const user = await UserModel.findByUsername(username);
            if (!user) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Verify password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Return user data without password
            res.json({
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                created_at: user.created_at
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({
                error: 'Error during login',
                message: error.message
            });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getAllUsers();
            res.json(users);
        } catch (error) {
            console.error('Get all users error:', error);
            res.status(500).json({ error: 'Error retrieving users' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const user = await UserModel.getUserById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error('Get user by ID error:', error);
            res.status(500).json({ error: 'Error retrieving user' });
        }
    },

    updateUser: async (req, res) => {
        try {
            const { email, first_name, last_name } = req.body;
            if (!email) {
                return res.status(400).json({ error: 'Email is required' });
            }

            const userData = { email, first_name, last_name };
            const updatedUser = await UserModel.updateUser(req.params.id, userData);
            if (!updatedUser) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(updatedUser);
        } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ error: 'Error updating user' });
        }
    }
};

export default UserController;
