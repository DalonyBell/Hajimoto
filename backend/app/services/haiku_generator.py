import random
import json
import os
from typing import List, Dict, Tuple, Optional


class HaikuGenerator:
    """
    A service for generating haiku poems.
    A haiku is a three-line poem with a 5-7-5 syllable pattern.
    """

    def __init__(self, words_path: str = None):
        """
        Initialize the HaikuGenerator with word dictionary.

        Args:
            words_path: Path to the JSON file containing words and their syllable counts
        """
        # Default dictionary if no file is provided
        self.word_dict = self._load_words(words_path)

        # Categorize words by syllable count for faster generation
        self.words_by_syllables = self._categorize_words()

        # Define themes to make haikus more coherent
        self.themes = {
            "nature": ["sky", "tree", "flower", "river", "mountain", "bird", "wind", "rain", "sun", "moon"],
            "seasons": ["spring", "summer", "autumn", "winter", "snow", "bloom", "leaf", "heat", "cold"],
            "emotions": ["love", "joy", "peace", "sad", "dream", "hope", "fear", "smile", "tear"],
            "urban": ["city", "street", "light", "night", "crowd", "train", "car", "road", "building"],
        }

    def _load_words(self, words_path: Optional[str]) -> Dict[str, int]:
        """Load words from file or use default dictionary."""
        if words_path and os.path.exists(words_path):
            with open(words_path, 'r') as f:
                return json.load(f)
        else:
            # Basic dictionary with common words and their syllable counts
            return {
                "sky": 1, "tree": 1, "flower": 2, "river": 2, "mountain": 2,
                "bird": 1, "wind": 1, "rain": 1, "sun": 1, "moon": 1,
                "spring": 1, "summer": 2, "autumn": 2, "winter": 2, "snow": 1,
                "bloom": 1, "leaf": 1, "heat": 1, "cold": 1,
                "love": 1, "joy": 1, "peace": 1, "sad": 1, "dream": 1,
                "hope": 1, "fear": 1, "smile": 1, "tear": 1,
                "city": 2, "street": 1, "light": 1, "night": 1, "crowd": 1,
                "train": 1, "car": 1, "road": 1, "building": 2,
                "green": 1, "blue": 1, "red": 1, "white": 1, "black": 1,
                "soft": 1, "hard": 1, "gentle": 2, "fierce": 1, "calm": 1,
                "walk": 1, "run": 1, "sit": 1, "stand": 1, "lie": 1,
                "water": 2, "fire": 1, "earth": 1, "air": 1, "spirit": 2,
                "morning": 2, "evening": 3, "day": 1, "night": 1, "dawn": 1, "dusk": 1,
                "whisper": 2, "silence": 2, "sound": 1, "voice": 1, "echo": 2,
                "small": 1, "large": 1, "tiny": 2, "vast": 1, "endless": 2,
                "bright": 1, "dark": 1, "shadow": 2, "light": 1, "glow": 1,
                "old": 1, "young": 1, "ancient": 2, "new": 1, "fresh": 1,
                "life": 1, "death": 1, "birth": 1, "growth": 1, "decay": 2,
                "happy": 2, "sad": 1, "angry": 2, "peaceful": 2, "lonely": 2,
                "friend": 1, "family": 3, "stranger": 2, "neighbor": 2, "lover": 2,
                "heart": 1, "mind": 1, "soul": 1, "body": 2, "spirit": 2,
                "deep": 1, "shallow": 2, "high": 1, "low": 1, "even": 2,
                "wild": 1, "tame": 1, "free": 1, "trapped": 1, "lost": 1,
                "sweet": 1, "bitter": 2, "sour": 1, "salty": 2, "rich": 1,
                "slow": 1, "fast": 1, "sudden": 2, "gradual": 3, "still": 1,
                "hot": 1, "cold": 1, "warm": 1, "cool": 1, "frozen": 2,
                "start": 1, "end": 1, "middle": 2, "journey": 2, "path": 1,
                "clear": 1, "cloudy": 2, "foggy": 2, "misty": 2, "hazy": 2
            }

    def _categorize_words(self) -> Dict[int, List[str]]:
        """Group words by syllable count for efficient retrieval."""
        categorized = {}
        for word, syllables in self.word_dict.items():
            if syllables not in categorized:
                categorized[syllables] = []
            categorized[syllables].append(word)
        return categorized

    def _get_random_word_with_syllables(self, syllables: int) -> str:
        """Get a random word with the specified number of syllables."""
        if syllables in self.words_by_syllables and self.words_by_syllables[syllables]:
            return random.choice(self.words_by_syllables[syllables])
        # If no word with exact syllable count is found, try to combine words
        return self._combine_words_for_syllables(syllables)

    def _combine_words_for_syllables(self, target_syllables: int) -> str:
        """Combine multiple words to match the target syllable count."""
        result = []
        remaining = target_syllables

        # Attempt to fill the line with words
        while remaining > 0:
            # Find all possible syllable counts we can use
            available_counts = [s for s in self.words_by_syllables.keys() if s <= remaining]

            if not available_counts:
                # No appropriate words found, use a placeholder
                return f"[{target_syllables} syllables]"

            # Choose a random syllable count
            syllable_count = random.choice(available_counts)
            word = random.choice(self.words_by_syllables[syllable_count])

            result.append(word)
            remaining -= syllable_count

        return " ".join(result)

    def _generate_line(self, syllables: int, theme_words: List[str] = None) -> str:
        """Generate a single line with the specified number of syllables."""
        if theme_words and random.random() < 0.7:  # 70% chance to use theme words
            # Try to include a thematic word
            theme_word = random.choice(theme_words)
            theme_syllables = self.word_dict.get(theme_word, 0)

            if theme_syllables <= syllables:
                # Use theme word and fill the rest
                remaining_syllables = syllables - theme_syllables
                if remaining_syllables == 0:
                    return theme_word
                else:
                    filler = self._combine_words_for_syllables(remaining_syllables)
                    # Randomly place the theme word at beginning or end
                    if random.choice([True, False]):
                        return f"{theme_word} {filler}"
                    else:
                        return f"{filler} {theme_word}"

        # Just generate a line with the desired syllables
        return self._combine_words_for_syllables(syllables)

    def generate_haiku(self, theme: str = None) -> Dict[str, str]:
        """
        Generate a complete haiku poem with 5-7-5 syllable pattern.

        Args:
            theme: Optional theme for the haiku

        Returns:
            Dictionary containing the three lines of the haiku
        """
        # Select theme words if a theme is specified
        theme_words = []
        if theme and theme in self.themes:
            theme_words = self.themes[theme]
        elif theme is None and self.themes:
            # Randomly select a theme if none specified
            theme = random.choice(list(self.themes.keys()))
            theme_words = self.themes[theme]

        # Generate the three lines
        line1 = self._generate_line(5, theme_words)
        line2 = self._generate_line(7, theme_words)
        line3 = self._generate_line(5, theme_words)

        return {
            "line1": line1,
            "line2": line2,
            "line3": line3,
            "theme": theme
        }

    def generate_multiple_haikus(self, count: int = 3, theme: str = None) -> List[Dict[str, str]]:
        """Generate multiple haikus."""
        return [self.generate_haiku(theme) for _ in range(count)]

    def get_available_themes(self) -> List[str]:
        """Return a list of available themes."""
        return list(self.themes.keys())

    def add_word(self, word: str, syllables: int) -> bool:
        """
        Add a new word to the dictionary.

        Args:
            word: The word to add
            syllables: Number of syllables in the word

        Returns:
            True if the word was added successfully
        """
        if not isinstance(syllables, int) or syllables <= 0:
            return False

        word = word.lower()
        self.word_dict[word] = syllables

        # Update categorized words
        if syllables not in self.words_by_syllables:
            self.words_by_syllables[syllables] = []
        self.words_by_syllables[syllables].append(word)

        return True