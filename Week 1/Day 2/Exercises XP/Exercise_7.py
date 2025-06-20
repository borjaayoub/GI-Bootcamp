import random
def get_random_temp():
    return random.uniform(-10,40)

def main():
    temp = get_random_temp()
    print(f"The temperature right now is {temp} degrees Celsius.")
    
    if temp<=0:
        print(f"Brrr, that’s freezing! Wear some extra layers today.")
    elif 0< temp <=16:
        print(f"Quite chilly! Don’t forget your coat.")
    elif 16< temp <=23:
        print(f"Nice weather.")
    elif 23< temp <=32:
        print(f"A bit warm, stay hydrated.")
    elif 32< temp <=40:
        print(f"It’s really hot! Stay cool.")
    


main()