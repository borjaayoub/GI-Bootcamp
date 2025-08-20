import { 
    create, 
    findByUsername, 
    findById, 
    update, 
    getAll, 
    verifyPassword 
} from '../models/user.js';

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const result = await create({ firstName, lastName, email, username, password });
        res.status(201).json({ message: result.message });
    } catch (error) {
        if (error.message === 'Username already exists') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        const user = await findByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        res.json({ 
            message: 'Login successful',
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await getAll();
        const sanitizedUsers = users.map(({ id, username }) => ({ id, username }));
        res.json(sanitizedUsers);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { password, ...sanitizedUser } = user;
        res.json(sanitizedUser);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        await update(req.params.id, req.body);
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        if (error.message === 'User not found') {
            return res.status(404).json({ message: error.message });
        }
        if (error.message === 'Username already exists') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Update user error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export {
    register,
    login,
    getAllUsers,
    getUserById,
    updateUser
};
