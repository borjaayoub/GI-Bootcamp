number = int(input("Enter a number: "))
length = int(input("Enter the length: "))

multiples = []
i = 1
while len(multiples) < length:
    multiples.append(number * i)
    i += 1

print(multiples)