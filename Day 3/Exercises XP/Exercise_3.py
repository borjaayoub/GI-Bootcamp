class Song():
    def __init__(self, lyrics=[]):
        self.lyrics = lyrics

    def sing_me_a_song(self):
        for line in self.lyrics:
            print(line)

stairway = Song(
    [
    "Under neon city lights,",
    "We chase the dreams that fade at night.",
    "Footsteps echo on empty streets,",
    "Lost in the rhythm, lost in the beat.",
    "Clouds drift by in a painted sky,",
    "Wishes carried as the world goes by.",
    "Silent hopes in the midnight air,",
    "Stories whispered everywhere.",
    "Hearts collide and time stands still,",
    "Dancing shadows on the windowsill."
]
)

stairway.sing_me_a_song()