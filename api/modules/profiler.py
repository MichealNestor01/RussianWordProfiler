import csv
from typing import Dict, Any
from pymystem3 import Mystem
import re
import asyncio
from .cache import WordCache

# Load the cache file 
CACHE_FILE = "word_data_cache.pickle"

class ProfilerObj:
    def __init__(self, use_cache: bool = True):
        # Start a mystem connection
        self.mystem = Mystem()
        self.stopwords = set([])
        # Retrieve frequency list (Sharoff 2011)
        self.load_frequency_list("assets/2011-frequency-list-SORTED.txt") 
        # connect the cache to a file if we are using it
        if use_cache:
            self.cache = WordCache(CACHE_FILE)
        else:
            self.cache = WordCache()

    # set stowards to user defined stopwards
    def set_stopwords(self, stopwords) -> None:
        self.stopwords = set(stopwords)

    # loads in the frequency csv
    def load_frequency_list(self, file_path: str) -> None:
        self.frequency_list: Dict[str, int] = {}
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                # Convert the rank to an integer
                lemma, rank = row[1], int(row[0])
                # some lemmas appear twice, we only care for the first occurence
                if (lemma not in self.frequency_list):
                    self.frequency_list[lemma] = rank

    # retrives the frequency rank of a lemma
    def get_frequency_rank(self, lemma: str) -> int:
        return self.frequency_list.get(lemma, -1)

    async def process_word(self, word: str) -> Dict[str, Dict[str, Any]]:
        # lemmatise the word
        lemma = self.mystem.lemmatize(word)[0]
        # get the word's frequency rank
        rank = self.get_frequency_rank(lemma)
        # get data from yandex about the word
        synonyms = await self.cache.get_synonyms(lemma)
        # get the frequency rank of the synonyms
        synonyms_rank = [{"synonym": synonym, "rank": self.get_frequency_rank(
            self.mystem.lemmatize(synonym)[0])} for synonym in synonyms]
        # update word data
        return {word: {
            'rank': rank,
            'synonyms': synonyms_rank,
            'lemma': lemma
        }}

    # scan text recieves a large amount of plain text that needs to
    # be analysed
    async def scan_text(self, txt: str) -> Dict[str, Dict[str, Any]]:
        # put text to lower case
        txt = txt.lower()
        # remove all punctuation for the text
        txt = re.sub(r'[.,;:!?…–\-_"“”‘’«»(){}\[\]]', '', txt)
        # Split the text into a list of words
        words = txt.split()
        # remove the stopwords
        words = list(set(words) - self.stopwords)
        # now get the data on each word
        # Create an asyncio event loop to run asynchronous tasks
        tasks = [self.process_word(word) for word in words]
        word_data = await asyncio.gather(*tasks)
        # save the cache after processing all the words
        self.cache.save()
        # return the word data
        return {k: v for word_data_dict in word_data for k, v in word_data_dict.items()}
