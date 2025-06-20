
while True:
    longest_sentence = input("Input the longest sentence without the character 'A': ")
    if "a" in longest_sentence.lower():
        print('The sentence contains the character "A". Please try again.')
    else:
        print("Congratulations! You have successfully entered a sentence without the character 'A'.")