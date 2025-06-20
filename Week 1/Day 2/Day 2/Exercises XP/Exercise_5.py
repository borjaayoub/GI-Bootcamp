import random

def random_number(num):
    if 1<=num<=100:    
        random_number = random.randint(1, 100)
        if random_number == num:
            print(f"Success! {num}")
        else:
            print(f"Fail! Random number: {random_number}, Your guess: {num}")
    else:
        print(f"Sorry! We only accepts numbers between 1 and 100 ")
        
random_number(int(input("enter a number: ")))