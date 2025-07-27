import random

class MyList():
    def __init__(self, letters):
        self.letters = letters

    def reversed_list(self):
        return list(reversed(sorted(self.letters)))

    def sorted_list(self):
        return sorted(self.letters)

    def random_numbers_list(self):
        return [random.randint(0, 25) for _ in range(len(self.letters))]


first_list = MyList(["g", "b", "r", "h", "e", "a", "i", "o", "z", "n", "m", "e"])
sec_list = MyList(['a','b','a','c','d','e','f','g','h','i','j'])

print(first_list.reversed_list())
print(first_list.sorted_list())
print(first_list.random_numbers_list())
print("------------------------------------------------------------")
print(sec_list.reversed_list())
print(sec_list.sorted_list())
print(sec_list.random_numbers_list())

