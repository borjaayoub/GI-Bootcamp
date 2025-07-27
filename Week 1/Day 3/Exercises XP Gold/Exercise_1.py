import math

class Circle:
    def __init__(self, radius=1.0):
        self.radius = radius

    def perimeter(self):
        return format(2 * math.pi * self.radius, '.2f')

    def area(self):
        return format(math.pi * (self.radius **2), '.2f')

    def geometrical_definition(self):
        print(f"A circle is a flat shape where all points are the same distance from the center;")
        print(f"It has a radius of {self.radius},")
        print(f"A perimeter of {self.perimeter()},")
        print(f"An area of {self.area()} square units.")



c1 = Circle(5)
c1.geometrical_definition()

print("----------------------------------------")

c2 = Circle()
c2.geometrical_definition()