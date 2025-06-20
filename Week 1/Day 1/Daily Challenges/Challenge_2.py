user_input = input("Enter a word: ")

result = ""
i = 0

while i < len(user_input):
    result += user_input[i]
    while i + 1 < len(user_input) and user_input[i] == user_input[i + 1]:
        i += 1
    i += 1

print(f"Cleaned word: {result}")
