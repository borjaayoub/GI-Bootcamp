class Cat():
    def __init__(self, cat_name, cat_age):
        self.name = cat_name
        self.age = cat_age

cat1 = Cat(cat_name="mizo", cat_age=2)
cat2 = Cat(cat_name="sashi", cat_age=4)
cat3 = Cat(cat_name="rush", cat_age=10)

def oldest_cat(cat1, cat2, cat3):
    oldest_cat = [cat1.age, cat1.name]
    if cat2.age > oldest_cat[0]:
        oldest_cat = [cat2.age, cat2.name]
    if cat3.age > oldest_cat[0]:
        oldest_cat = [cat3.age, cat3.name]
    
    print(f"The oldest cat is {oldest_cat[1]}, and is {oldest_cat[0]} years old.")

oldest_cat(cat1, cat2, cat3)
