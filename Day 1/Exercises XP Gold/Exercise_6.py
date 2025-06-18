import random

wins = 0
losses = 0

while True:
    user_input = input("Enter a number from 1 to 9 (or type 'quit' to exit): ")
    random_number = random.randrange(1,10)
    
    if str(user_input).lower() == "quit":
        print(f"Total games won: {wins}\n Total games lost: {losses}")
        break
    elif int(user_input) == random_number:
        print("Winner.")
        wins += 1
    else:
        print("Better luck next time.")
        losses += 1
    
