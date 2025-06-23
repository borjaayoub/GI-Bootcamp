from Dogs_Ex_2 import Dog
import random

class PetDog(Dog):
    def __init__(self, name, age, weight, trained=False):
        super().__init__(name, age, weight)
        self.trained = trained
    
    def train(self):
        self.trained = True
        return self.bark()

    def play(self, *args):
        return "All play together"

    def do_a_trick(self):
        if self.trained:
            tricks = ["does a barrel roll", "stands on his back legs", "shakes your hand", "plays dead"]
            return random.choice(tricks)




my_dog = PetDog("Fido", 2, 10)

print(my_dog.train())
print(my_dog.play("Buddy", "Max"))
print(my_dog.do_a_trick())
