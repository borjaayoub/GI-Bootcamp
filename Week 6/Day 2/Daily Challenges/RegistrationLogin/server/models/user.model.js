import pool from '../config/db.js';

// Create tables if they don't exist
const createTables = async () => {
    const createTablesQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(100) UNIQUE NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            first_name VARCHAR(50),
            last_name VARCHAR(50),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS hashpwd (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            FOREIGN KEY (username) REFERENCES users(username) ON DELETE CASCADE
        );
    `;
    try {
        await pool.query(createTablesQuery);
        console.log('Tables created successfully');
    } catch (error) {
        console.error('Error creating tables:', error);
        throw error;
    }
};

const UserModel = {
    createUser: async (userData, hashedPassword) => {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // First insert into users table
            const userQuery = `
                INSERT INTO users (email, username, first_name, last_name) 
                VALUES ($1, $2, $3, $4) 
                RETURNING id, email, username, first_name, last_name, created_at
            `;
            const userValues = [userData.email, userData.username, userData.first_name, userData.last_name];
            const userResult = await client.query(userQuery, userValues);

            // Then insert into hashpwd table
            const pwdQuery = 'INSERT INTO hashpwd (username, password) VALUES ($1, $2)';
            await client.query(pwdQuery, [userData.username, hashedPassword]);

            await client.query('COMMIT');
            return userResult.rows[0];
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    },

    findByUsername: async (username) => {
        const query = `
            SELECT u.*, h.password 
            FROM users u 
            JOIN hashpwd h ON u.username = h.username 
            WHERE u.username = $1
        `;
        const { rows } = await pool.query(query, [username]);
        return rows[0];
    },

    getAllUsers: async () => {
        const query = 'SELECT id, email, username, first_name, last_name, created_at FROM users';
        const { rows } = await pool.query(query);
        return rows;
    },

    getUserById: async (id) => {
        const query = 'SELECT id, email, username, first_name, last_name, created_at FROM users WHERE id = $1';
        const { rows } = await pool.query(query, [id]);
        return rows[0];
    },

    updateUser: async (id, userData) => {
        const query = `
            UPDATE users 
            SET first_name = COALESCE($2, first_name), last_name = COALESCE($3, last_name) 
            WHERE id = $1 
            RETURNING *
        `;
        const values = [id, userData.first_name, userData.last_name];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
};

// Initialize tables
createTables().catch(console.error);

export default UserModel;
