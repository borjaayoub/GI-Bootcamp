def sort_words():
    user_input = input("Enter comma-separated words: ")
    
    sorted_words = [word.strip() for word in user_input.split(',')]
    sorted_words.sort()
    
    result = ','.join(sorted_words)
    
    print(f"Sorted words: {result}")
    return result

if __name__ == "__main__":
    print("Example test:")

    test_input = "without,hello,bag,world"
    print(f"Input: {test_input}")
    
    test_words = [word.strip() for word in test_input.split(',')]
    test_words.sort()
    test_result = ','.join(test_words)
    print(f"Output: {test_result}")
    
    print("\n" + "="*50)
    print("Now try your own input:")
    sort_words()
