cars = "Volkswagen, Toyota, Ford Motor, Honda, Chevrolet"

car_list = cars.split(",")
car_len = len(car_list)
car_list.sort(reverse=True)

# print(f"There are {car_len} manufacturers in the list.")
# print(car_list)

for letter in car_list:
    if "r" in letter:
        print(len(letter))

