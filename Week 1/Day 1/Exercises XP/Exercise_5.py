my_fav_numbers = {3, 5, 7}

my_fav_numbers.add(30)
my_fav_numbers.add(95)

my_fav_numbers.remove(95)

friend_fav_numbers = {5, 90}

our_fav_numbers = my_fav_numbers.union(friend_fav_numbers)

print("My favorite numbers:", my_fav_numbers)
print("Friend's favorite numbers:", friend_fav_numbers)
print("Our favorite numbers:", our_fav_numbers)