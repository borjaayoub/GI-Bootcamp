basket = ["Banana", "Apples", "Oranges", "Blueberries"]

basket.remove("Banana")

basket.remove("Blueberries")

basket.append("Kiwi")

basket.insert(0, "Apples")

print(f"Apples appears {basket.count('Apples')} times in the list.")

basket.clear()

print("Final state of the list:", basket)