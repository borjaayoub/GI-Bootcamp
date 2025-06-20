names = ['Samus', 'Cortana', 'V', 'Link', 'Mario', 'Cortana', 'Samus']
user_name = input("Enter your name: ")

for index, name in enumerate(names):
    if user_name == name:
        print(index)