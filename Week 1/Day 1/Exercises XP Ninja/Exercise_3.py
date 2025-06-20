message = """The world of programming is constantly evolving, offering new challenges and opportunities for those eager to learn. 
By practicing regularly and exploring different technologies, you can develop valuable skills that open doors to exciting careers. 
Remember, every expert was once a beginner—so keep coding and enjoy the journey!
"""

print(len(message))

sentence = message.split(".")
print(len(sentence))

words = message.lower().split(" ")
print(len(words))

unique_words = set(words)

print(unique_words, len(unique_words))