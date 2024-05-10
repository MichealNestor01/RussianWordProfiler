import csv
from typing import Dict, List, Any, Set
from pymystem3 import Mystem
import re
import pickle
import asyncio
import aiohttp
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get API key from local environment variable
API_KEY = os.getenv('API_KEY')
# Load the cache file 
CACHE_FILE = "word_data_cache.pickle"


class ProfilerObj:
    def __init__(self, use_cache: bool = True):
        # Start a mystem connection
        self.mystem = Mystem()
        # Retrieve the stop words # I don't think it makes sense to have default stop words
        # with open("stopwords.txt", "r", encoding="utf-8") as file:
        #    self.stopwords: Set[str] = set(line.strip() for line in file)
        self.stopwords = set([])
        # Retrieve frequency list (Sharoff 2011)
        self.load_frequency_list("assets/2011-frequency-list-SORTED.txt")
        self.word_data_cache: Dict[str, Dict[str, Any]] = {}
        if use_cache:
            # Create a cache to store word data
            self.load_cache()

    # set stowards to user defined stopwards
    def set_stopwords(self, stopwords) -> None:
        self.stopwords = set(stopwords)

    # loads in any chanced yandex queries
    def load_cache(self) -> None:
        try:
            with open(CACHE_FILE, "rb") as f:
                self.word_data_cache = pickle.load(f)
        except FileNotFoundError:
            self.word_data_cache: Dict[str, Dict[str, Any]] = {}

    # save queries to the cache file
    def save_cache(self) -> None:
        with open(CACHE_FILE, "wb") as f:
            pickle.dump(self.word_data_cache, f)

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

    # gets dictionary data about a word from yandex
    async def get_word_data(self, word: str) -> Dict[str, Any]:
        if word in self.word_data_cache:
            return self.word_data_cache[word]

        async with aiohttp.ClientSession() as session:
            url = f'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key={API_KEY}&lang=ru-ru&text={word}'
            async with session.get(url) as response:
                data = await response.json()
                self.word_data_cache[word] = data
                self.save_cache()
                return data

    async def process_word(self, word: str) -> Dict[str, Dict[str, Any]]:
        # lemmatise the word
        lemma = self.mystem.lemmatize(word)[0]
        # get data from yandex about the word
        data = await self.get_word_data(word)
        # get the words frequency rank
        rank = self.get_frequency_rank(lemma)
        # find synonyms from the word data
        synonyms = []
        if 'def' in data and 'tr' in  data['def'][0] and 'syn' in data['def'][0]['tr'][0]:
            synonyms = [syn['text'] for syn in data['def'][0]['tr'][0]['syn'] if 'text' in syn]
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
        return {k: v for word_data_dict in word_data for k, v in word_data_dict.items()}
