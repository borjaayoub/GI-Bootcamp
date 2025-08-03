from deep_translator import GoogleTranslator

def translate_french_words():
    # French words list
    french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]
    
    # Dictionary to store translations
    translations = {}
    
    # Translate each French word to English
    for word in french_words:
        try:
            # Translate from French to English using Google Translator
            translator = GoogleTranslator(source='fr', target='en')
            result = translator.translate(word)
            translations[word] = result
        except Exception as e:
            print(f"Error translating '{word}': {e}")
            translations[word] = "Translation error"
    
    return translations

def main():
    """Main function to run the translator"""
    print("Translating French words to English...")
    print("=" * 40)
    
    # Get translations
    result = translate_french_words()
    
    # Display the result
    print("Translation result:")
    print(result)
    
    # Also display in a more readable format
    print("\nDetailed translations:")
    for french_word, english_translation in result.items():
        print(f"'{french_word}' -> '{english_translation}'")

if __name__ == "__main__":
    main()