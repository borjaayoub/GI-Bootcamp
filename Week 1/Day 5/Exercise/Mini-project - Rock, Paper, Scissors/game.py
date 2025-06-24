import random

class Game:
    
    items = ["rock", "paper", "scissors"]
    
    def get_user_item(self):
        print("--------Rock, Paper, Scissors-------- ")
        user_item = input("Enter your choice: ").lower()
        while user_item not in self.items:
            user_item = input("Invalid choice, try again: ").lower()
        else:
            return user_item
        

    def get_computer_item(self):
        computer_item = random.choice(self.items)
        return computer_item
    
    def get_game_result(self, user_item, computer_item):
        if user_item == computer_item:
            return "It's a tie!"
        if user_item == "rock" and computer_item == "scissors" or user_item == "scissors" and computer_item == "paper" or user_item == "paper" and computer_item == "rock":
            return "You win!"
        else:
            return "You lose!"
    
    def play(self):
        user_item = self.get_user_item()
        computer_item = self.get_computer_item()
        result = self.get_game_result(user_item, computer_item)
        
        print(f"You selected {user_item}. The computer selected {computer_item}. {result}")
