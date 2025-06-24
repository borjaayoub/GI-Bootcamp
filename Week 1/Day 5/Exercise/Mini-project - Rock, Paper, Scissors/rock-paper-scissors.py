import game
def get_user_menu_choice():
    while True:
        print("\n----Welcome to Rock, Paper, Scissors!----")
        choice = input(f"Menu:\n (g) Play a new game\n (s) Show scores \n (q) Quit\n").strip().lower()
        if choice == "q":
            return "Thanks for playing."
        elif choice == "s" or choice == "scores":
            return "the score"
        elif choice == "g" or choice == "game":
            return "the game"
        else:
            print("Invalid choice. Please try again.")

def print_results(results):
    print("\n-------Game Results:--------")
    print(f"Wins:  {results.get('win', 0)}")
    print(f"Losses: {results.get('loss', 0)}")
    print(f"Draws:  {results.get('draw', 0)}")

def main():
    results = {'win': 0, 'loss': 0, 'draw': 0}
    while True:
        choice = get_user_menu_choice()
        if choice == "Thanks for playing.":
            print_results(results)
            break
        elif choice == "the score":
            print_results(results)
        elif choice == "the game":
            g = game.Game()
            user_item = g.get_user_item()
            computer_item = g.get_computer_item()
            result = g.get_game_result(user_item, computer_item)
            print(f"You selected {user_item}. The computer selected {computer_item}. {result}")
            if result == "You win!":
                results['win'] += 1
            elif result == "You lose!":
                results['loss'] += 1
            else:
                results['draw'] += 1

if __name__ == "__main__":
    main()

