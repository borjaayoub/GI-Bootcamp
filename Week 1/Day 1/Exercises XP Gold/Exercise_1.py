month_received = int(input("Enter a month between 1 and 12: "))

if month_received < 1 or month_received > 12:
    print("Invalid month. Please enter a number between 1 and 12.")
elif month_received>=3 and month_received<=5:
    print("The month is in the Spring season.")
elif month_received>=6 and month_received<=8:
    print("The month is in the Summer season.")
elif month_received>=9 and month_received<=11:
    print("The month is in the Autumn season.")
elif month_received == 12 or month_received <= 2:
    print("The month is in the Winter season.")