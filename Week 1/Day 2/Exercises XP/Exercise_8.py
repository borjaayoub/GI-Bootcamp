base_price = 10
toppings_price = 2.5

while True:
    
    toppings = input("Enter you pizza toppings (type 'quit' to stop): ")
    
    if toppings.lower() != "quit":
        print(f"Adding {toppings} to your pizza.")
        base_price = base_price + toppings_price
    else:
        break
        
print(f"Total cost of the pizza: {base_price}")
    