from typing import List, TypedDict, Dict, Any
from datetime import datetime
import aiohttp
import pickle
from .query_yandex import query_yandex_for_synonyms

class WordDataCacheEntry(TypedDict):
    """
    A TypedDict that represents a cache entry for a word.

    Attributes:
        synonyms (List[str]): A list of synonyms for the word.
        last_updated (datetime): The timestamp of when the entry was last updated.
        time_to_live (int): The time-to-live (TTL) for the entry in days.
    """
    synonyms: List[str]
    last_updated: datetime
    time_to_live: int

class WordCache:
    """
    A class to manage a cache of words and their synonyms with a time-to-live (TTL) mechanism.

    Attributes:
        default_ttl (int): Default TTL value in days for cache entries.
        file (str): Path to the file for saving/loading the cache.
        words (Dict[str, WordDataCacheEntry]): Dictionary storing the cache entries.

    Methods:
        __init__(self, file: str = None):
            Initializes the WordCache object with an optional file for loading the cache.
        
        loadFromFile(self, file: str) -> None:
            Loads the cache from the specified file.
        
        save(self, file: str = None) -> None:
            Saves the current cache to the specified file.
        
        addWord(self, word: str, synonyms: List[str]) -> None:
            Adds a word and its synonyms to the cache.
        
        async get_synonyms(self, word: str) -> List[str]:
            Retrieves the synonyms for the specified word, updating the cache if necessary.
    """
    # Time to live levels in days
    default_ttl = 30
    
    def __init__(self, file: str = None):
        """
        Initializes the WordCache with an optional file for loading the cache.

        Args:
            file (str, optional): Path to the file for loading the cache. Defaults to None.
        """
        self.file = file
        self.words: Dict[str, WordDataCacheEntry] = {}
        if file is not None:
            self.loadFromFile(file)
    
    def loadFromFile(self, file: str) -> None:
        """
        Loads the cache from the specified file.

        Args:
            file (str): Path to the file for loading the cache.
        
        Raises:
            FileNotFoundError: If the specified file does not exist.
        """
        try:
            with open(file, "rb") as f:
                self.words = pickle.load(f)
        except FileNotFoundError:
            self.words: Dict[str, WordDataCacheEntry] = {}

    def save(self, file: str = None) -> None:
        """
        Saves the current cache to the specified file.

        Args:
            file (str, optional): Path to the file for saving the cache. If None, uses the initial file path. Defaults to None.
        
        Raises:
            Exception: If there is an error saving the file.
        """
        if file is None:
            file = self.file
        try:
            with open(file, "wb") as f:
                pickle.dump(self.words, f)
        except:
            print(f"CACHE ERROR: Failed to save cache: {file}")

    def addWord(self, word: str, synonyms: List[str]) -> None:
        """
        Adds a word and its synonyms to the cache with the default TTL.

        Args:
            word (str): The word to add to the cache.
            synonyms (List[str]): List of synonyms for the word.
        """
        self.words[word] = {
            "synonyms": synonyms,
            "last_updated": datetime.today(),
            "time_to_live": self.default_ttl
        }

    async def get_synonyms(self, word: str) -> List[str]:
        """
        Retrieves the synonyms for the specified word, updating the cache if necessary.

        Args:
            word (str): The word to retrieve synonyms for.

        Returns:
            List[str]: List of synonyms for the specified word.
        """
        if word in self.words:
            # if the word already exists in the cache, check if it is still valid
            if (datetime.now() - self.words[word]["last_updated"]).days < self.words[word]["time_to_live"]:
                return self.words[word]["synonyms"]
            else:
                # ttl has run out, so check if the data has changed on Yandex, if it has, reset ttl, else increase it 
                # up to a maximum of 180 days
                new_synonyms: Dict[str, Any] = await query_yandex_for_synonyms(word)
                if new_synonyms != self.words[word]["synonyms"]:
                    del self.words[word]
                    self.addWord(word, new_synonyms)
                else:
                    self.words[word]["time_to_live"] += 30 if self.words[word]["time_to_live"] < 180 else 0
        else: 
            try:
                new_synonyms = await query_yandex_for_synonyms(word)
                self.addWord(word, new_synonyms)
            except aiohttp.client_exceptions.ClientConnectorError:
                new_synonyms = ["Unable to access Yandex API. Please try again later."]
                return new_synonyms
        return self.words[word]["synonyms"]