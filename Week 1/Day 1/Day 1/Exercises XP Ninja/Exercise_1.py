3 <= 3 < 9 
# Output : True

3 == 3 == 3
# Output: True

bool(0)
# Output: False

bool(5 == "5")
# Output: False

bool(4 == 4) == bool("4" == "4")
# Output: True

bool(bool(None))
# Output: False

x = (1 == True)
y = (1 == False)
a = True + 4
b = False + 10

print("x is", x)
# Output: x is True

print("y is", y)
# Output: y is False

print("a:", a)
# Output: a: 5

print("b:", b)
# Output: b: 10