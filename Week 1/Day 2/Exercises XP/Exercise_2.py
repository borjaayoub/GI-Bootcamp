from functools import reduce
family = {"rick": 43, 'beth': 13, 'morty': 5, 'summer': 8}

while True:
    name = input("Enter family member's name (or type 'done' to finish): ")
    if name.lower() == 'done':
        break
    age = int(input(f"Enter {name}'s age: "))
    family[name] = age

total_cost = 0

for name,age in family.items():
    if age<3:
        price = 0
    elif 3<=age<=12:
        price = 10
    else:
        price = 15
    
    print(f"{name} Your ticket price is {price}$")
    
    total_cost += price
    
print(f"The total cost is: {total_cost}")