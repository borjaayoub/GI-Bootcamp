import random

count = 0

def throw_dice():
    return random.randint(1,6)
    

def throw_until_doubles():
    global count
    
    while True:
        dice_1 = throw_dice()
        dice_2 = throw_dice()
        count += 1 
        
        if dice_1 == dice_2:
            return count




def main():
    results = []
    for _ in range(100):
        throws = throw_until_doubles()
        results.append(throws)
    average_throws = sum(results) / len(results)
    print(f"Total throws: {throws} \n Average throws to reach doubles: {float(average_throws)}")

main()

