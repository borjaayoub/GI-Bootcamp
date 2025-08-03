def display_board(board):
    
    print("TIC TAC TOE")
    print("*************")
    for i in range(3):
        print(f"* {board[i*3]} | {board[i*3+1]} | {board[i*3+2]} *")
        if i < 2:
            print("*---|---|---*")
    print("*************")

def player_input(player):

    print(f"Player {player}'s turn...")
    while True:
        try:
            row = int(input("Enter row: "))
            col = int(input("Enter column: "))
            
            index = (row - 1) * 3 + (col - 1)
            
            if 1 <= row <= 3 and 1 <= col <= 3:
                return index
            else:
                print("Invalid position! Row and column must be between 1 and 3.")
        except ValueError:
            print("Please enter valid numbers for row and column.")

def check_win(board, player):
    
    win_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]            
    ]
    
    for combo in win_combinations:
        if all(board[i] == player for i in combo):
            return True
    return False

def check_tie(board):
    
    return " " not in board

def play():
    
    print("Welcome to TIC TAC TOE!")
    
    board = [" " for _ in range(9)]
    current_player = "X"
    
    while True:
        display_board(board)
        
        position = player_input(current_player)
        
        if board[position] != " ":
            print("Position already taken! Try again.")
            continue
        
        board[position] = current_player
        
        if check_win(board, current_player):
            display_board(board)
            print(f"Player {current_player} wins!")
            break
        
        if check_tie(board):
            display_board(board)
            print("It's a tie!")
            break
        
        current_player = "O" if current_player == "X" else "X"

if __name__ == "__main__":
    play() 