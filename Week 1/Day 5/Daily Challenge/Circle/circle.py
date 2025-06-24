class Circle:
    def __init__(self, radius=None, diameter=None):
        if radius is not None and diameter is not None:
            raise ValueError("Give only radius or diameter, not both.")
        if radius is not None:
            self._radius = float(radius)
        elif diameter is not None:
            self._radius = float(diameter) / 2
        else:
            raise ValueError("You must give radius or diameter.")

    @property
    def radius(self):
        return self._radius

    @property
    def diameter(self):
        return self._radius * 2

    @property
    def area(self):
        import math
        return math.pi * self._radius ** 2

    def __str__(self):
        return f"Circle: radius={self.radius}, diameter={self.diameter}, area={self.area}"

    def __add__(self, other):
        return Circle(radius=self.radius + other.radius)

    def __eq__(self, other):
        return self.radius == other.radius

    def __lt__(self, other):
        return self.radius < other.radius

c1 = Circle(2)

c2 = Circle(5)

c3 = Circle(5)



print("\nAdd two circles:")
print(c1.__add__(c3))

print("\nCheck if two circles are equal:")
print(c2.__eq__(c3))

print("\nCheck if one circle is smaller than another:")
print(c1.__lt__(c2))