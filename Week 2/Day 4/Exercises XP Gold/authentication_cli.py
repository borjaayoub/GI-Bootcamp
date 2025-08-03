# dictionary that contains users
users = {"admin": "password123", "john": "secret456", "alice": "mypass789"}

# Variable to track the logged in user
logged_in = None

print("Welcome to the Authentication CLI!")
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
        if username in users and users[username] == password:
            print("You are now logged in!")
            # If the user is successfully logged in, store the username in a variable called logged_in
            logged_in = username
        else:
            print("Invalid username or password. Please try again.")
            # If the user does not exist ask if they would like to sign up
            if username not in users:
                signup_choice = (
                    input("User does not exist. Would you like to sign up? (yes/no): ")
                    .lower()
                    .strip()
                )
                if signup_choice == "yes":
                    # Ask the user for a username and make sure it doesn't exist as a key in our dictionary
                    while True:
                        new_username = input("Enter a new username: ").strip()
                        if new_username in users:
                            print(
                                "Username already exists. Please choose a different username."
                            )
                        else:
                            break

                    # Ask the user for a password. The password is the value.
                    new_password = input("Enter a password: ").strip()

                    # Add the new user to the dictionary
                    users[new_username] = new_password
                    print(f"User '{new_username}' has been successfully created!")

    else:
        print("Invalid command. Use 'login' to login or 'exit' to quit.")
