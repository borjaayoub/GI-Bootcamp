from menu_item import MenuItem
from menu_manager import MenuManager

def show_user_menu():
    print("\n--- Restaurant Menu Manager ---")
    print("Please choose an option:")
    print("(V) View an Item")
    print("(A) Add an Item")
    print("(D) Delete an Item")
    print("(U) Update an Item")
    print("(S) Show the Menu")
    print("(Q) Quit")
    choice = input("Enter your choice: ").strip().upper()
    if choice == 'V':
        view_item()
    elif choice == 'A':
        add_item_to_menu()
    elif choice == 'D':
        delete_item_from_menu()
    elif choice == 'U':
        update_item_from_menu()
    elif choice == 'S':
        show_restaurant_menu()
    elif choice == 'Q':
        print("Goodbye!")
        return
    else:
        print("Invalid choice. Please try again.")
        
    if choice != 'Q':
        show_user_menu()

# viewing one item from the menu
def view_item():
    name = input("Enter the item name: ").strip()
    item = MenuManager.get_by_name(name)
    if item:
        print(f"ID: {item[0]} | Name: {item[1]} | Price: {item[2]}")
    else:
        print("Invalid item.")

# adding new item to the menu
def add_item_to_menu():
    name = input("Enter the item name: ").strip()
    try:
        price = int(input("Enter the item price: ").strip())
    except ValueError:
        print("Invalid price. Please enter a number.")
        return
    item = MenuItem(name, price)
    result = item.save()
    if result:
        print("Item was added successfully.")
    else:
        print("Failed to add item.")

# deleting an item from the menu
def delete_item_from_menu():
    name = input("Enter the item name to delete: ").strip()
    try:
        price = int(input("Enter the item price to delete: ").strip())
    except ValueError:
        print("Invalid price. Please enter a number.")
        return
    item = MenuItem(name, price)
    result = item.delete()
    if result:
        print("Item was deleted successfully.")
    else:
        print("Failed to delete item.")

# updating an item from the menu
def update_item_from_menu():
    name = input("Enter the item name to edit: ").strip()
    
    try:
        price = int(input("Enter the price to edit: ").strip())
    except ValueError:
        print("Invalid price. Please enter a number.")
        return
    new_name = input("Enter the item new name: ").strip()
    try:
        new_price = int(input("Enter the new price: ").strip())
    except ValueError:
        print("Invalid price. Please enter a number.")
        return
    item = MenuItem(name, price)
    result = item.update(new_name, new_price)
    if result:
        print("Item was edited successfully.")
    else:
        print("Failed to edit item.")

# showing the restaurant menu
def show_restaurant_menu():
    items = MenuManager.all_items()
    if not items:
        print("The menu is currently empty.")
        return
    print("\n--- Restaurant Menu ---")
    print("-" * 30)
    print(f"{'ID':<5} {'Name':<15} {'Price':>6}")
    print("-" * 30)
    for item in items:
        # Assuming item = (item_id, item_name, item_price)
        print(f"{item[0]:<5} {item[1]:<15} {item[2]:>6}$")
    print("-" * 30)

# Uncomment the line below to run the menu when this script is executed
show_user_menu()
