from typing import List, TypedDict, Dict, Any
from datetime import datetime
import aiohttp
import pickle
from .query_yandex import query_yandex_for_synonyms

class WordDataCacheEntry(TypedDict):
    synonyms: List[str]
    last_updated: datetime
    time_to_live: int

class WordCache:
    # Time to live levels in days
    default_ttl = 30
    
    def __init__(self, file: str = None):
        self.file = file
        self.words: Dict[str, WordDataCacheEntry] = {}
        if file is not None:
            self.loadFromFile(file)
    
    def loadFromFile(self, file: str) -> None:
        try:
            with open(file, "rb") as f:
                self.words = pickle.load(f)
        except FileNotFoundError:
            self.words: Dict[str, WordDataCacheEntry] = {}

    def save(self, file: str = None) -> None:
        if file is None:
            file = self.file
        try:
            with open(file, "wb") as f:
                pickle.dump(self.words, f)
        except:
            print(f"CACHE ERROR: Failed to save cache: {file}")

    def addWord(self, word: str, synonyms: List[str]) -> None:
        self.words[word] = {
            "synonyms": synonyms,
            "last_updated": datetime.today(),
            "time_to_live": self.default_ttl
        }

    async def get_synonyms(self, word: str) -> List[str]:
        if word in self.words:
            # if the word already exists in the cache, check if it is still valid
            if (datetime.now() - self.words[word]["last_updated"]).days < self.words[word]["time_to_live"]:
                return self.words[word]["synonyms"]
            else:
                # ttl has run out, so check if the data has chaned on yandex, if it has, resent ttl, else increase it 
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