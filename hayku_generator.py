import torch
import random
import nltk
from nltk.corpus import wordnet
from transformers import pipeline, set_seed

nltk.download('wordnet', quiet=True)
nltk.download('punkt', quiet=True)


class HaikuGenerator:
    def __init__(self):
        self.generator = pipeline(
            'text-generation',
            model='gpt2',
            pad_token_id=50256,
            device=0 if torch.cuda.is_available() else -1
        )
        set_seed(42)

    def get_syllable_count(self, word):
        """Count syllables in a word."""
        vowels = 'aeiouy'
        word = word.lower().strip(".:;?!")
        if not word:
            return 0
        count = 0
        if word[0] in vowels:
            count += 1
        for i in range(1, len(word)):
            if word[i] in vowels and word[i - 1] not in vowels:
                count += 1
        return max(1, count)

    def generate_line(self, target_syllables, context):
        """Generate a line with syllable constraints."""
        for _ in range(3):  # Try 3 times to generate a valid line
            generated = self.generator(
                f"{context} /",  # Use a natural continuation prompt
                max_length=1000,
                num_return_sequences=1,
                truncation=True,
                temperature=0.9,  # Add creativity
                top_k=40,  # Limit vocabulary for better quality
                do_sample=True,
                stop_sequence=["\n", "/"]  # Stop at natural breaks
            )[0]['generated_text']

            # Clean and extract relevant text
            clean_text = generated.split("/")[-1].strip()
            words = nltk.word_tokenize(clean_text)

            # Build syllable-aware line
            current_line = []
            current_syllables = 0
            for word in words:
                syll = self.get_syllable_count(word)
                if current_syllables + syll <= target_syllables:
                    current_line.append(word)
                    current_syllables += syll
                if current_syllables >= target_syllables:
                    break

            if current_syllables == target_syllables:
                return ' '.join(current_line)

        # Fallback to seed words
        seed_words = [w for w in nltk.word_tokenize(context) if w.isalpha()]
        return ' '.join(random.sample(seed_words, min(3, len(seed_words))))

    def generate_haiku(self, theme):
        """Generate a haiku with connected lines."""
        first_line = self.generate_line(5, f"Under {theme}")
        second_line = self.generate_line(7, first_line)
        third_line = self.generate_line(5, second_line)
        return f"{first_line}\n{second_line}\n{third_line}"


if __name__ == "__main__":
    haiku_ai = HaikuGenerator()
    theme = input("Enter a theme for your haiku (e.g., moonlight whispers): ")
    print("\nGenerated Haiku:\n")
    print(haiku_ai.generate_haiku(theme))