import json
from db import get_db_connection, insert_game, create_games_table

def print_board(board):
    print("\n")
    for row in board:
        print(" | ".join(row))
        print("-" * 10)
    print("\n")

def check_winner(board):
    lines = board + [list(col) for col in zip(*board)]
    lines.append([board[i][i] for i in range(3)])
    lines.append([board[i][2 - i] for i in range(3)])
    for line in lines:
        if line[0] != " " and all(cell == line[0] for cell in line):
            return line[0]
    return None

def is_full(board):
    return all(cell != " " for row in board for cell in row)

def main():
    create_games_table()
    print("Welcome to Tic Tac Toe!")
    player_x = input("Enter name for player X: ").strip() or "Player X"
    player_o = input("Enter name for player O: ").strip() or "Player O"
    board = [[' ' for _ in range(3)] for _ in range(3)]
    moves =[]
    current, current_name = 'X', player_x
    while True:
        print_board(board)
        print(f"{current_name}'s turn ({current})")
        try:
            row = int(input("Enter row (1-3): ")) - 1
            col = int(input("Enter col (1-3): ")) - 1
        except ValueError:
            print("Invalid input. Please enter numbers 1-3.")
            continue
        if not(0 <= row < 3 and 0 <= col < 3):
            print("Row and column must be between 1 and 3.")
            continue
        if board[row][col] != ' ':
            print("Cell already taken. Try again.")
            continue
        board[row][col] = current
        moves.append({'player': current, 'row': row, 'col': col})
        winner = check_winner(board)
        if winner:
            print_board(board)
            winner_name = player_x if winner == 'X' else player_o
            print(f"{winner_name} ({winner}) wins!")
            insert_game(player_x, player_o, winner_name, json.dumps(moves))
            break
        if is_full(board):
            print_board(board)
            print("It's a draw!")
            insert_game(player_x, player_o, None, json.dumps(moves))
            break
        
        if current == 'X':
            current, current_name = 'O', player_o
        else:
            current, current_name = 'X', player_x

if __name__ == "__main__":
    main()