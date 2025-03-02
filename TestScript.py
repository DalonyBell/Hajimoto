#!/usr/bin/env python3
"""
Haiku Generator AI

A terminal-based AI that generates haikus based on user prompts.
Uses NLP techniques to create contextually relevant haikus following the 5-7-5 syllable pattern.
"""

import argparse
import json
import os
import random
import re
import sys
import string
import nltk
from nltk.corpus import wordnet, cmudict
from nltk.tokenize import word_tokenize
import numpy as np
from collections import defaultdict, Counter


# Download required NLTK data (uncomment on first run)
# nltk.download('punkt')
# nltk.download('wordnet')
# nltk.download('cmudict')

class HaikuGenerator:
    def __init__(self, data_path=None):
        """Initialize the haiku generator with a dataset of words."""
        self.syllable_dict = {}
        self.word_associations = defaultdict(list)
        self.theme_words = defaultdict(list)
        self.d = cmudict.dict() if hasattr(cmudict, 'dict') else {}

        # Load pre-existing data or create new dataset
        if data_path and os.path.exists(data_path):
            self.load_dataset(data_path)
        else:
            print("Building new dataset...")
            self.build_dataset()
            if data_path:
                self.save_dataset(data_path)

    def build_dataset(self):
        """Build a comprehensive dataset of words with syllable counts and associations."""
        print("Loading WordNet for word associations...")
        # Populate words from WordNet with their syllable counts
        for synset in list(wordnet.all_synsets()):
            for word in synset.lemma_names():
                if '_' not in word:  # Skip multi-word expressions
                    # Add word with its syllable count
                    self.syllable_dict[word] = self.count_syllables(word)

                    # Add theme associations based on lexical domain
                    pos = synset.pos()
                    if pos == 'n':  # nouns
                        self.theme_words['objects'].append(word)
                        if synset.lexname() == 'noun.animal':
                            self.theme_words['animals'].append(word)
                        elif synset.lexname() == 'noun.plant':
                            self.theme_words['nature'].append(word)
                    elif pos == 'v':  # verbs
                        self.theme_words['actions'].append(word)
                    elif pos == 'a':  # adjectives
                        self.theme_words['descriptions'].append(word)

                    # Create word associations based on synonyms and hypernyms
                    for lemma in synset.lemmas():
                        word1 = lemma.name()
                        if '_' not in word1:
                            # Add synonyms
                            for synonym in synset.lemma_names():
                                if synonym != word1 and '_' not in synonym:
                                    self.word_associations[word1].append(synonym)

                            # Add hypernyms (more general words)
                            for hypernym in synset.hypernyms():
                                for hypernym_word in hypernym.lemma_names():
                                    if '_' not in hypernym_word:
                                        self.word_associations[word1].append(hypernym_word)

        # Add common seasonal words for haiku themes
        self.theme_words['spring'] = ['blossom', 'bloom', 'green', 'birth', 'grow', 'rain', 'fresh']
        self.theme_words['summer'] = ['sun', 'heat', 'bright', 'warm', 'blue', 'beach', 'swim']
        self.theme_words['autumn'] = ['fall', 'leaf', 'red', 'orange', 'crisp', 'harvest', 'cool']
        self.theme_words['winter'] = ['snow', 'cold', 'ice', 'frost', 'bare', 'sleep', 'dark']

        print(f"Dataset built with {len(self.syllable_dict)} words.")

    def load_dataset(self, path):
        """Load a pre-built dataset from a JSON file."""
        print(f"Loading dataset from {path}...")
        try:
            with open(path, 'r') as f:
                data = json.load(f)
                self.syllable_dict = data['syllable_dict']
                self.word_associations = defaultdict(list, data['word_associations'])
                self.theme_words = defaultdict(list, data['theme_words'])
            print(f"Dataset loaded with {len(self.syllable_dict)} words.")
        except Exception as e:
            print(f"Error loading dataset: {e}")
            print("Building new dataset...")
            self.build_dataset()

    def save_dataset(self, path):
        """Save the dataset to a JSON file."""
        print(f"Saving dataset to {path}...")
        data = {
            'syllable_dict': self.syllable_dict,
            'word_associations': dict(self.word_associations),
            'theme_words': dict(self.theme_words)
        }
        try:
            with open(path, 'w') as f:
                json.dump(data, f)
            print("Dataset saved successfully.")
        except Exception as e:
            print(f"Error saving dataset: {e}")

    def count_syllables(self, word):
        """
        Count the number of syllables in a word.
        Uses CMU Pronouncing Dictionary when available, otherwise estimates.
        """
        word = word.lower().strip()

        # Check if already in dictionary
        if word in self.syllable_dict:
            return self.syllable_dict[word]

        # Try using CMU dict
        if word in self.d:
            return max([len(list(y for y in x if y[-1].isdigit())) for x in self.d[word]])

        # Fallback method - estimate syllables
        count = 0
        vowels = "aeiouy"
        word = word.lower().strip(".:;?!")
        if not word:
            return 0

        # Special cases
        if word[-1] == 'e':
            word = word[:-1]

        # Count vowel groups
        prev_is_vowel = False
        for char in word:
            is_vowel = char in vowels
            if is_vowel and not prev_is_vowel:
                count += 1
            prev_is_vowel = is_vowel

        # Ensure at least one syllable
        if count == 0:
            count = 1

        return count

    def get_related_words(self, seed_word, syllable_count, max_distance=2):
        """
        Find words related to the seed word with the specified syllable count.
        Uses word associations up to max_distance steps away.
        """
        visited = set()
        candidates = []

        def collect_related(word, distance=0):
            if distance > max_distance or word in visited:
                return

            visited.add(word)

            # Check direct associations
            for related in self.word_associations.get(word, []):
                if related not in visited:
                    syll_count = self.count_syllables(related)
                    if syll_count == syllable_count:
                        candidates.append(related)

                    # Continue searching but with reduced distance
                    if distance < max_distance:
                        collect_related(related, distance + 1)

        # Start with seed word
        collect_related(seed_word)

        # If no candidates found, fall back to any word with correct syllable count
        if not candidates:
            candidates = [word for word, syll in self.syllable_dict.items()
                          if syll == syllable_count]

        # Return random selection if available
        if candidates:
            return random.choice(candidates)
        else:
            # Last resort: random word fitting syllable pattern
            fallback = [w for w, s in self.syllable_dict.items() if s == syllable_count]
            return random.choice(fallback) if fallback else None

    def extract_theme_words(self, prompt):
        """Extract key theme words from the user prompt."""
        # Tokenize and clean the prompt
        tokens = word_tokenize(prompt.lower())

        # Remove stopwords and punctuation
        stopwords = {'a', 'an', 'the', 'and', 'but', 'or', 'in', 'on', 'at', 'to', 'for', 'with', 'about'}
        cleaned = [word for word in tokens if word not in stopwords and word not in string.punctuation]

        # Find words that exist in our dataset
        theme_words = [word for word in cleaned if word in self.syllable_dict]

        # Add related words from our theme categories if any word matches
        for category, words in self.theme_words.items():
            if any(word in words for word in cleaned):
                theme_words.extend(random.sample(words, min(3, len(words))))

        # Ensure we have enough seed words
        if not theme_words:
            # Pick a random category if no matches
            category = random.choice(list(self.theme_words.keys()))
            theme_words = random.sample(self.theme_words[category], 3)

        return list(set(theme_words))  # Remove duplicates

    def generate_line(self, target_syllables, seed_words, previous_words=None):
        """Generate a line with the target number of syllables."""
        if previous_words is None:
            previous_words = []

        line = []
        current_syllables = 0

        # Try to include at least one seed word
        if seed_words and random.random() < 0.8:  # 80% chance to include seed word
            seed = random.choice(seed_words)
            seed_syllables = self.count_syllables(seed)

            if seed_syllables <= target_syllables:
                line.append(seed)
                current_syllables += seed_syllables
                previous_words.append(seed)

        # Fill the rest with contextually relevant words
        attempts = 0
        while current_syllables < target_syllables and attempts < 50:
            attempts += 1

            # Determine how many syllables we need
            needed = target_syllables - current_syllables

            # Try to find a word with the right syllable count
            if previous_words:
                # Use the most recent word as context
                context = previous_words[-1]
                word = self.get_related_words(context, needed)
            elif seed_words:
                # Use a seed word as context
                context = random.choice(seed_words)
                word = self.get_related_words(context, needed)
            else:
                # Random word with correct syllable count
                candidates = [w for w, s in self.syllable_dict.items() if s == needed]
                word = random.choice(candidates) if candidates else None

            # If we found a suitable word, add it
            if word:
                line.append(word)
                current_syllables += self.count_syllables(word)
                previous_words.append(word)
                break

            # If we can't find a word with exact syllable count, try smaller counts
            if needed > 1:
                for syll_count in range(needed - 1, 0, -1):
                    if previous_words:
                        context = previous_words[-1]
                        word = self.get_related_words(context, syll_count)
                    elif seed_words:
                        context = random.choice(seed_words)
                        word = self.get_related_words(context, syll_count)
                    else:
                        candidates = [w for w, s in self.syllable_dict.items() if s == syll_count]
                        word = random.choice(candidates) if candidates else None

                    if word:
                        line.append(word)
                        current_syllables += self.count_syllables(word)
                        previous_words.append(word)
                        break

        # If we couldn't fill it perfectly, try again with a different approach
        if current_syllables != target_syllables:
            # Start over with a cleaner approach
            return self._simple_line_generation(target_syllables, seed_words)

        return ' '.join(line)

    def _simple_line_generation(self, target_syllables, seed_words):
        """A simpler approach to line generation when the main algorithm fails."""
        # Build a pool of words grouped by syllable count
        syllable_groups = defaultdict(list)

        # Include seed words and their associations
        words_to_include = set(seed_words)
        for seed in seed_words:
            words_to_include.update(self.word_associations.get(seed, [])[:10])  # Limit to 10 associations

        # Add additional random words for variety
        words_to_include.update(random.sample(list(self.syllable_dict.keys()), 100))

        # Group by syllable count
        for word in words_to_include:
            syllable_count = self.count_syllables(word)
            if 1 <= syllable_count <= target_syllables:
                syllable_groups[syllable_count].append(word)

        # Generate line using dynamic programming
        dp = [[] for _ in range(target_syllables + 1)]
        dp[0] = [[]]  # Empty list of words for 0 syllables

        for syllable_count in range(1, target_syllables + 1):
            for word_syllables in range(1, syllable_count + 1):
                if word_syllables in syllable_groups and dp[syllable_count - word_syllables]:
                    for word in syllable_groups[word_syllables]:
                        for prev_words in dp[syllable_count - word_syllables]:
                            dp[syllable_count].append(prev_words + [word])

        # Choose a random valid line if available
        valid_lines = dp[target_syllables]
        if valid_lines:
            return ' '.join(random.choice(valid_lines))

        # Last resort: just pick words that add up to the right syllable count
        line = []
        current_syllables = 0

        while current_syllables < target_syllables:
            needed = target_syllables - current_syllables
            candidates = []

            # Try to find words with 1 to needed syllables
            for syll in range(min(needed, 4), 0, -1):
                if syll in syllable_groups:
                    candidates.extend([(word, syll) for word in syllable_groups[syll]])

            if not candidates:
                # Get any words from our dictionary with appropriate syllable count
                for syll in range(min(needed, 4), 0, -1):
                    words = [word for word, count in self.syllable_dict.items() if count == syll]
                    candidates.extend([(word, syll) for word in words[:100]])  # Limit to 100 options

            if candidates:
                word, syll_count = random.choice(candidates)
                line.append(word)
                current_syllables += syll_count
            else:
                # Emergency fallback
                remaining = target_syllables - current_syllables
                one_syllable_words = [word for word, count in self.syllable_dict.items() if count == 1]
                for _ in range(remaining):
                    if one_syllable_words:
                        line.append(random.choice(one_syllable_words))
                current_syllables = target_syllables  # Force exit

        return ' '.join(line)

    def generate_haiku(self, prompt):
        """Generate a complete haiku based on the user prompt."""
        # Extract theme words from the prompt
        theme_words = self.extract_theme_words(prompt)

        # Generate each line with appropriate syllable counts
        context = []
        line1 = self.generate_line(5, theme_words, context)
        context.extend(line1.split())

        line2 = self.generate_line(7, theme_words, context)
        context.extend(line2.split())

        line3 = self.generate_line(5, theme_words, context)

        return f"{line1}\n{line2}\n{line3}"


def main():
    """Main function to handle command line interface."""
    parser = argparse.ArgumentParser(description='Generate haikus based on a prompt.')
    parser.add_argument('--prompt', '-p', type=str, help='Prompt for generating the haiku')
    parser.add_argument('--dataset', '-d', type=str, default='haiku_data.json',
                        help='Path to the dataset file (will be created if it doesn\'t exist)')
    parser.add_argument('--interactive', '-i', action='store_true',
                        help='Run in interactive mode')

    args = parser.parse_args()

    # Create the haiku generator
    generator = HaikuGenerator(args.dataset)

    if args.interactive:
        print("\n===== Haiku Generator AI =====")
        print("Enter a prompt to generate a haiku, or 'quit' to exit.")

        while True:
            try:
                prompt = input("\nPrompt > ")
                if prompt.lower() in ('quit', 'exit', 'q'):
                    break

                if prompt:
                    print("\nGenerating haiku...\n")
                    haiku = generator.generate_haiku(prompt)
                    print("-" * 20)
                    print(haiku)
                    print("-" * 20)
            except KeyboardInterrupt:
                break
            except Exception as e:
                print(f"Error: {e}")

    elif args.prompt:
        haiku = generator.generate_haiku(args.prompt)
        print(haiku)

    else:
        parser.print_help()


if __name__ == "__main__":
    main()