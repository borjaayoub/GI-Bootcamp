class Person():
    def __init__(self, first_name, age, last_name):
        self.first_name = first_name
        self.age = age
        self.last_name = last_name

    def is_18(self):
        return self.age >= 18


class Family():
    def __init__(self, last_name, members=None):
        self.last_name = last_name
        self.members = members if members is not None else []
    
    def born(self, first_name, age):
        new_person = Person(first_name, age, self.last_name)
        self.members.append(new_person)
        
    def check_majority(self, first_name):
        for member in self.members:
            if member.first_name == first_name:
                if member.is_18():
                    print(f"{member.first_name} You are over 18, your parents Jane and John accept that you will go out with your friends")
                else:
                    print(f"Sorry {first_name}, you are not allowed to go out with your friends.")
                return
        print(f"No family member named {first_name} found.")
    
    def family_presentation(self):
        print(f"Family Name: {self.last_name}\nMembers:")
        for member in self.members:
            print(f"{member.first_name}, {member.age} years old")


family = Family("Doe")

family.born("Robert", 19)
family.born("Liam", 32)
family.born("Alice", 26)
family.born("Bob", 20)
family.born("Charlie", 15)

family.check_majority("Alice")
family.check_majority("Liam")
family.check_majority("Charlie")

print("---------------------Family Members---------------------")
family.family_presentation()