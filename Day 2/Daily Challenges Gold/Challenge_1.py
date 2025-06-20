import re

matrix = [
    ['7', 'i', 'i'],
    ['T', 's', 'x'],
    ['h', '%', '?'],
    ['i', ' ', '#'],
    ['s', 'M', ' '],
    ['$', 'a', ' '],
    ['#', 't', '%'],
    ['^', 'r', '!']
]

cols = len(matrix[0])
rows = len(matrix)
col_text = ""

for col in range(cols):
    for row in range(rows):
        col_text += matrix[row][col]

decoded = re.sub(r'(?<=\w)[^a-zA-Z]+(?=\w)', ' ', col_text)

print("Secret message:", decoded)