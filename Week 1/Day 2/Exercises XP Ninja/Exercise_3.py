morse_code_dict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',
    '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
    '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
    '&': '.-...', '@': '.--.-.', ':': '---...', ',': '--..--', '.': '.-.-.-',
    "'": '.----.', '"': '.-..-.', '?': '..--..', '/': '-..-.', '=': '-...-',
    '+': '.-.-.', '-': '-....-', '(': '-.--.', ')': '-.--.-', '!': '-.-.--',
    ' ': '/'
}

def english_to_morse(text):
    morse = []
    for word in text.upper().split(' '):
        morse_word = []
        for char in word:
            if char in morse_code_dict:
                morse_word.append(morse_code_dict[char])
        morse.append(' '.join(morse_word))
    return ' / '.join(morse)

def morse_to_english(morse_code):
    morse_to_char = {v: k for k, v in morse_code_dict.items()}
    words = morse_code.split(' / ')
    decoded_words = []
    for word in words:
        chars = word.split()
        decoded_word = ''.join(morse_to_char.get(char, '') for char in chars)
        decoded_words.append(decoded_word)
    return ' '.join(decoded_words)


print(english_to_morse('Hello World'))
print(morse_to_english('.... . .-.. .-.. --- / .-- --- .-. .-.. -..'))
