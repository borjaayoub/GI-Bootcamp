import sqlite3
import hashlib
import os


# Database setup
def create_database():
    """Create the database and users table if it doesn't exist"""
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    # Create users table
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    """
    )

    # Insert initial users if table is empty
    cursor.execute("SELECT COUNT(*) FROM users")
    if cursor.fetchone()[0] == 0:
        initial_users = [
            ("admin", "password123"),
            ("john", "secret456"),
            ("alice", "mypass789"),
        ]

        for username, password in initial_users:
            encrypted_password = encrypt_password(password)
            cursor.execute(
                "INSERT INTO users (username, password) VALUES (?, ?)",
                (username, encrypted_password),
            )

    conn.commit()
    conn.close()


def encrypt_password(password):
    """Encrypt password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(input_password, stored_password):
    """Verify if the input password matches the stored encrypted password"""
    return encrypt_password(input_password) == stored_password


def add_user_to_db(username, password):
    """Add a new user to the database"""
    try:
        conn = sqlite3.connect("users.db")
        cursor = conn.cursor()

        encrypted_password = encrypt_password(password)
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            (username, encrypted_password),
        )

        conn.commit()
        conn.close()
        return True
    except sqlite3.IntegrityError:
        return False  # Username already exists


def check_user_credentials(username, password):
    """Check if username and password match in the database"""
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("SELECT password FROM users WHERE username = ?", (username,))
    result = cursor.fetchone()

    conn.close()

    if result:
        stored_password = result[0]
        return verify_password(password, stored_password)
    return False


def user_exists(username):
    """Check if a user exists in the database"""
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()

    cursor.execute("SELECT 1 FROM users WHERE username = ?", (username,))
    result = cursor.fetchone()

    conn.close()

    return result is not None


# Initialize database
create_database()

# Variable to track the logged in user
logged_in = None

print("Welcome to the Authentication CLI with Database!")
print("Commands: 'login' to login, 'exit' to quit")

# Create a loop that does the following:
while True:
    user_input = input("\nEnter command: ").lower().strip()

    # If the user inputs "exit", break out of the loop.
    if user_input == "exit":
        print("Goodbye!")
        break

    # If the user inputs "login", ask them for their username and password.
    elif user_input == "login":
        username = input("Enter username: ").strip()
        password = input("Enter password: ").strip()

        # If the user's details exist print "you are now logged in".
        if check_user_credentials(username, password):
            print("You are now logged in!")
            # If the user is successfully logged in, store the username in a variable called logged_in
            logged_in = username
        else:
            print("Invalid username or password. Please try again.")
            # If the user does not exist ask if they would like to sign up
            if not user_exists(username):
                signup_choice = (
                    input("User does not exist. Would you like to sign up? (yes/no): ")
                    .lower()
                    .strip()
                )
                if signup_choice == "yes":
                    # Ask the user for a username and make sure it doesn't exist as a key in our database
                    while True:
                        new_username = input("Enter a new username: ").strip()
                        if user_exists(new_username):
                            print(
                                "Username already exists. Please choose a different username."
                            )
                        else:
                            break

                    # Ask the user for a password. The password is the value.
                    new_password = input("Enter a password: ").strip()

                    # Add the new user to the database
                    if add_user_to_db(new_username, new_password):
                        print(f"User '{new_username}' has been successfully created!")
                    else:
                        print("Error creating user. Please try again.")

    else:
        print("Invalid command. Use 'login' to login or 'exit' to quit.")
