num_1 = int(input("Enter a number: "))
num_2 = int(input("Enter a number: "))
num_3 = int(input("Enter a number: "))

greatest = num_1
if num_2 > greatest:
    greatest = num_2
if num_3 > greatest:
    greatest = num_3

print(f"The greatest number is: {greatest}")