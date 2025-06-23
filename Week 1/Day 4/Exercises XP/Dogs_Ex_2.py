class Dog():
    def __init__(self, name, age, weight):
        self.name = name
        self.age = age
        self.weight = weight
    
    def bark(self):
        return f"{self.name} is barking!"

    def run_speed(self):
        return int(self.weight / self.age * 10)

    def fight(self, other_dog):
        my_power = self.run_speed() * self.weight
        other_dog_power = other_dog.run_speed() * other_dog.weight
        if my_power > other_dog_power:
            return f"{self.name} wins the fight against {other_dog.name}!"
        elif my_power < other_dog_power:
            return f"{other_dog.name} wins the fight against {self.name}!"
        else:
            return "It's a tie!"


dog1 = Dog("Buddy", 5, 30)
dog2 = Dog("Max", 3, 25)
dog3 = Dog("Charlie", 4, 35)

print(dog3.bark())
print('-------------------Weight----------------------')
print(f"{dog1.name}'s weight is {dog1.weight}")
print(f"{dog2.name}'s weight is {dog2.weight}")
print('-------------------Speed-----------------------')
print(f"{dog1.name}'s speed is {dog1.run_speed()}")
print(f"{dog2.name}'s speed is {dog2.run_speed()}")
print('-------------------Fight-----------------------')
print(dog1.fight(dog2))