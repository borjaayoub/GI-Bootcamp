random_word= str(input(f"Enter a wrord: "))

letter_index_list = {}

for index, letter in enumerate(random_word):
    if letter in letter_index_list:
        letter_index_list[letter].append(index)
    else:
        letter_index_list[letter] = [index]

print(letter_index_list)




