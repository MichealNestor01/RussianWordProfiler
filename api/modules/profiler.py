import csv
from typing import Dict, Any
from pymystem3 import Mystem
import re
import asyncio
from .cache import WordCache

# Load the cache file
CACHE_FILE = "word_data_cache.pickle"

class ProfilerObj:
    """A profiler object to process and analyze word frequency and synonyms.

    Attributes:
        mystem (Mystem): A Mystem object for lemmatization.
        stopwords (set): A set of stopwords to ignore during text processing.
        frequency_list (dict): A dictionary mapping lemmas to their frequency ranks.
        cache (WordCache): A cache object to store and retrieve synonyms.

    Methods:
        init(self, use_cache: bool = True):
            Initializes the ProfilerObj with an optional cache.
        
        set_stopwords(self, stopwords) -> None:
            Sets the stopwords for the profiler.
        
        load_frequency_list(self, file_path: str) -> None:
            Loads a frequency list from a specified file path.
        
        get_frequency_rank(self, lemma: str) -> int:
            Retrieves the frequency rank of a given lemma.
        
        async process_word(self, word: str) -> Dict[str, Dict[str, Any]]:
            Asynchronously processes a single word to determine its lemma, frequency rank, and synonyms.
        
        async scan_text(self, txt: str) -> Dict[str, Dict[str, Any]]:
            Asynchronously scans a block of text and analyzes each word in it.
    """
    def __init__(self, use_cache: bool = True):
        """Initialize the ProfilerObj with an optional cache.

        Args:
            use_cache (bool): If True, connects to a predefined cache file, otherwise initializes a new cache in memory with no cache secondary storage used.
        """
        self.mystem = Mystem()
        self.stopwords = set([])
        self.load_frequency_list("assets/2011-frequency-list-SORTED.txt")
        if use_cache:
            self.cache = WordCache(CACHE_FILE)
        else:
            self.cache = WordCache()

    def set_stopwords(self, stopwords) -> None:
        """Set the stopwords for the profiler.

        Args:
            stopwords (iterable): An iterable of words to set as stopwords.
        """
        self.stopwords = set(stopwords)

    def load_frequency_list(self, file_path: str) -> None:
        """Load a frequency list from a specified file path.

        Args:
            file_path (str): The path to the frequency list file.
        """
        self.frequency_list = {}
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                lemma, rank = row[1], int(row[0])
                if lemma not in self.frequency_list:
                    self.frequency_list[lemma] = rank

    def get_frequency_rank(self, lemma: str) -> int:
        """Retrieve the frequency rank of a given lemma.

        Args:
            lemma (str): The lemma whose frequency rank is to be retrieved.

        Returns:
            int: The frequency rank of the lemma or -1 if the lemma is not found.
        """
        return self.frequency_list.get(lemma, -1)

    async def process_word(self, word: str) -> Dict[str, Dict[str, Any]]:
        """Asynchronously process a single word to determine its lemma, frequency rank, and synonyms.

        Args:
            word (str): The word to process.

        Returns:
            dict: {word: {rank: int, lemma: str, synonyms: [{synonym: str, rank: int, lemma: str}]}
        """
        lemma = self.mystem.lemmatize(word)[0]
        rank = self.get_frequency_rank(lemma)
        synonyms = await self.cache.get_synonyms(lemma)
        synonyms_with_rank_and_lemma = [{
            "synonym": synonym,
            "rank": self.get_frequency_rank(lemma),
            "lemma": lemma,
        } for synonym in synonyms for lemma in [self.mystem.lemmatize(synonym)[0]]]
        return {word: {'rank': rank, 'synonyms': synonyms_with_rank_and_lemma, 'lemma': lemma}}

    async def scan_text(self, txt: str) -> Dict[str, Dict[str, Any]]:
        """
        Asynchronously scan a block of text and analyze each word in it.

        Args:
            txt (str): The text to scan.

        Returns:
            dict: {word: {rank: int, lemma: str, synonyms: [{synonym: str, rank: int, lemma: str}]}
        """
        txt = txt.lower()
        txt = re.sub(r'[.,;:!?…–\-_"“”‘’«»(){}\[\]]', '', txt)
        words = txt.split()
        words = list(set(words) - self.stopwords)
        tasks = [self.process_word(word) for word in words]
        word_data = await asyncio.gather(*tasks)
        self.cache.save()
        return {k: v for word_data_dict in word_data for k, v in word_data_dict.items()}
