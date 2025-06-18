
birthdate = input("Enter your birthdate, respect this format (DD/MM/YYYY): ")

birthdate_split = birthdate.split("/")
age = 2025 - int(birthdate_split[2])

last_number = str(age)[1]

i =  'i' * int(last_number)

cake = f"""
        ___{i}___
       |:H:a:p:p:y:|
     __|___________|__
    |^^^^^^^^^^^^^^^^^|
    |:B:i:r:t:h:d:a:y:|
    |                 |
    ~~~~~~~~~~~~~~~~~~~
"""
print(cake)