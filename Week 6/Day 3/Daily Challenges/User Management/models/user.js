import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { hash, compare } from 'bcrypt';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const USERS_FILE = join(__dirname, '..', 'users.json');
const SALT_ROUNDS = 10;

const readUsersFile = async () => {
    try {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            // If file doesn't exist, create it with empty array
            await fs.writeFile(USERS_FILE, '[]');
            return [];
        }
        throw error;
    }
};

const writeUsersFile = async (users) => {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

const findByUsername = async (username) => {
    const users = await readUsersFile();
    return users.find(user => user.username === username);
};

const findById = async (id) => {
    const users = await readUsersFile();
    return users.find(user => user.id === parseInt(id));
};

const create = async ({ firstName, lastName, email, username, password }) => {
    const users = await readUsersFile();
    
    // Check if username exists
    const existingUser = await findByUsername(username);
    if (existingUser) {
        throw new Error('Username already exists');
    }

    const hashedPassword = await hash(password, SALT_ROUNDS);
    
    const newUser = {
        id: users.length + 1,
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword
    };

    users.push(newUser);
    await writeUsersFile(users);
    return {
        user: newUser,
        message: 'User registered successfully'
    };
};

const update = async (id, { firstName, lastName, username, password }) => {
  const users = await readUsersFile();
  const userIndex = users.findIndex(user => user.id === parseInt(id));

  if (userIndex === -1) {
    throw new Error('User not found');
  }

  if (firstName) {
    users[userIndex].firstName = firstName;
  }

  if (lastName) {
    users[userIndex].lastName = lastName;
  }

  if (username) {
    // Check if new username already exists (excluding current user)
    const usernameExists = users.some((user, index) =>
      index !== userIndex && user.username === username
    );

    if (usernameExists) {
      throw new Error('Username already exists');
    }

    users[userIndex].username = username;
  }

  if (password) {
    users[userIndex].password = await hash(password, SALT_ROUNDS);
  }

  await writeUsersFile(users);
  return (
    users[userIndex],
    { message: 'User updated successfully' }
  );

};

const getAll = async () => readUsersFile();

const verifyPassword = async (password, hashedPassword) => compare(password, hashedPassword);

export {
    findByUsername,
    findById,
    create,
    update,
    getAll,
    verifyPassword
};
