birthdays = {
    "Alice": "1990/05/14",
    "Bob": "1985/12/22",
    "Charlie": "1992/07/09",
    "Diana": "1988/03/30",
    "Ethan": "1995/11/17"
}
print(f"Welcome! You can look up the birthdays of the people in the list!")
for name, birthdate in birthdays.items():
    print(f"{name} : {birthdate}")

user_name = input("Give me a name: ")

if user_name in birthdays:
    print(f"{user_name}'s birthday is on {birthdays[user_name]}")
else:
    print("Sorry, that name is not in the list.")