import csv
from typing import Dict, Any, List
from pymystem3 import Mystem
import re
import asyncio
from .cache import WordCache

# Load the cache file 
CACHE_FILE = "word_data_cache.pickle"

class ProfilerObj:
    """
    A class used to analyze and process words in a given text, providing information
    such as frequency rank and synonyms.

    Attributes:
        mystem (Mystem): An instance of the Mystem class for lemmatization.
        stopwords (set): A set of stopwords to be excluded from analysis.
        frequency_list (Dict[str, int]): A dictionary mapping lemmas to their frequency rank.
        cache (WordCache): An instance of the WordCache class for caching word data.
    """

    def __init__(self, use_cache: bool = True):
        """
        Initializes the ProfilerObj with an option to use a cache for synonyms.

        Args:
            use_cache (bool): If True, a cache file is used to store synonyms. Defaults to True.
        """
        # Start a mystem connection
        self.mystem = Mystem()
        self.stopwords = set([])
        # Retrieve frequency list (Sharoff 2011)
        self.load_frequency_list("assets/2011-frequency-list-SORTED.txt") 
        # Connect the cache to a file if we are using it
        if use_cache:
            self.cache = WordCache(CACHE_FILE)
        else:
            self.cache = WordCache()

    def set_stopwords(self, stopwords: List[str]) -> None:
        """
        Sets user-defined stopwords to exclude from text analysis.

        Args:
            stopwords (list): A list of stopwords to be set.
        """
        self.stopwords = set(stopwords)

    def load_frequency_list(self, file_path: str) -> None:
        """
        Loads a frequency list from a CSV file into the frequency_list attribute.

        Args:
            file_path (str): The path to the CSV file containing the frequency list.
        
        Raises:
            FileNotFoundError: If the specified file does not exist.
            ValueError: If there is an issue with the format of the file.
        """
        self.frequency_list: Dict[str, int] = {}
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                # Convert the rank to an integer
                lemma, rank = row[1], int(row[0])
                # Some lemmas appear twice, we only care for the first occurrence
                if lemma not in self.frequency_list:
                    self.frequency_list[lemma] = rank

    def get_frequency_rank(self, lemma: str) -> int:
        """
        Retrieves the frequency rank of a given lemma.

        Args:
            lemma (str): The lemma for which the frequency rank is to be retrieved.

        Returns:
            int: The frequency rank of the lemma, or -1 if the lemma is not found.
        """
        return self.frequency_list.get(lemma, -1)

    async def process_word(self, word: str) -> Dict[str, Dict[str, Any]]:
        """
        Processes a word to retrieve its lemma, frequency rank, and synonyms with their ranks.

        Args:
            word (str): The word to be processed.

        Returns:
            Dict[str, Dict[str, Any]]: A dictionary containing the word's data, including
            its rank, synonyms with their ranks, and lemma.
        """
        # Lemmatize the word
        lemma = self.mystem.lemmatize(word)[0]
        # Get the word's frequency rank
        rank = self.get_frequency_rank(lemma)
        # Get data from Yandex about the word
        synonyms = await self.cache.get_synonyms(lemma)
        # Get the frequency rank of the synonyms
        synonyms_with_rank_and_lemma = [{
            "synonym": synonym, 
            "rank": self.get_frequency_rank(lemma), 
            "lemma": lemma,
        } for synonym in synonyms for lemma in [self.mystem.lemmatize(synonym)[0]]]
        # Update word data
        return {word: {
            'rank': rank,
            'synonyms': synonyms_with_rank_and_lemma,
            'lemma': lemma
        }}

    async def scan_text(self, txt: str) -> Dict[str, Dict[str, Any]]:
        """
        Scans a large amount of plain text, analyzes each word, and provides detailed
        word data including frequency ranks and synonyms.

        Args:
            txt (str): The text to be analyzed.

        Returns:
            Dict[str, Dict[str, Any]]: A dictionary containing word data for each word in the text,
            excluding stopwords.
        
        Raises:
            Exception: If any issue occurs during the text processing.
        """
        # Convert text to lowercase
        txt = txt.lower()
        # Remove all punctuation from the text
        txt = re.sub(r'[.,;:!?…–\-_"“”‘’«»(){}\[\]]', '', txt)
        # Split the text into a list of words
        words = txt.split()
        # Remove the stopwords
        words = list(set(words) - self.stopwords)
        # Now get the data on each word
        # Create an asyncio event loop to run asynchronous tasks
        tasks = [self.process_word(word) for word in words]
        word_data = await asyncio.gather(*tasks)
        # Save the cache after processing all the words
        self.cache.save()
        # Return the word data
        return {k: v for word_data_dict in word_data for k, v in word_data_dict.items()}
