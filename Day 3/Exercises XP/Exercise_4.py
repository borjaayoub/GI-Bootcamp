class Zoo():
    def __init__(self, zoo_name):
        self.zoo_name = zoo_name
        self.animals = []

    def add_animal(self, new_animal):
        if new_animal not in self.animals:
            self.animals.append(new_animal)
    
    def get_animals(self):
        print("All the animals currently in the zoo: ")
        for animal in self.animals:
            print(animal)
    
    def sell_animal(self, animal_sold):
        if animal_sold not in self.animals:
            print("Animal not found")
        else:
            self.animals.remove(animal_sold)
    
    def sort_animals(self):
        sorted_animals = {}
        for animal in sorted(self.animals):
            letter = animal[0].upper()
            if letter not in sorted_animals:
                sorted_animals[letter] = []
            sorted_animals[letter].append(animal)
        return sorted_animals
    
    def get_groups(self):
        grouped_animals = self.sort_animals()
        for letter, animal in grouped_animals.items():
            print(f"{letter}: [{', '.join(animal)}]")
        


ramat_gan_safari = Zoo("Ramat Gan Safari")

ramat_gan_safari.add_animal("Giraffe")
ramat_gan_safari.add_animal("Bee")
ramat_gan_safari.add_animal("Bear")
ramat_gan_safari.add_animal("Baboon")
ramat_gan_safari.add_animal("Elephant")
ramat_gan_safari.add_animal("Lion")
ramat_gan_safari.add_animal("Zebra")
ramat_gan_safari.add_animal("Tiger")

ramat_gan_safari.get_animals()

ramat_gan_safari.sell_animal("Bear")
ramat_gan_safari.sell_animal("Lion")

print("\n------------------------------------------")
ramat_gan_safari.get_animals()

print("\n------------------------------------------")
print(ramat_gan_safari.sort_animals())

print("\n------------------------------------------")
ramat_gan_safari.get_groups()