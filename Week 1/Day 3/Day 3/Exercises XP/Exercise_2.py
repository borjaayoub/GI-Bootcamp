class Dog():
    def __init__(self, name, height):
        self.name = name
        self.height = height
    
    def bark(self):
        print(f"{self.name} goes woof!")
    
    def jump(self,):
        x = self.height*2
        print(f"{self.name} jumps {x}cm high!")

davids_dog = Dog("Rex", 50)
sarahs_dog = Dog("Tummy", 10)

print(f"The dog's name is {davids_dog.name}, his height is {davids_dog.height}")
davids_dog.bark()
davids_dog.jump()

print(f"The dog's name is {sarahs_dog.name}, his height is {sarahs_dog.height}")
sarahs_dog.bark()
sarahs_dog.jump()
