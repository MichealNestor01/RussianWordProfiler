import csv
from typing import Dict, List, Any, Set
from pymystem3 import Mystem
import re
import asyncio
import aiohttp
from decouple import config

# get api key from local environment variable
API_KEY = config('API_KEY')

class ProfilerObj:
    def __init__(self):
        # Start a mystem connection
        self.mystem = Mystem()
        # Retrieve the stop words
        with open("stopwords.txt", "r", encoding="utf-8") as file:
            self.stopwords: Set[str]  = set(line.strip() for line in file)
        # Retrieve frequency list (Sharoff 2011)   
        self.load_frequency_list("2011-frequency-list-SORTED.txt")
        # Create a cache to store word data
        self.word_data_cache: Dict[str, Dict[str, Any]] = {}

    # loads in the frequency csv
    def load_frequency_list(self, file_path: str) -> None:
        self.frequency_list: Dict[str, int] = {}
        with open(file_path, 'r', encoding='utf-8') as f:
            reader = csv.reader(f)
            for row in reader:
                lemma, rank = row[1], int(row[0])  # Convert the rank to an integer
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
                return data
    
    async def process_word(self, word: str) -> Dict[str, Dict[str, Any]]:
        print(f"Scanning word: {word}")
        # lemmatise the word 
        lemma = self.mystem.lemmatize(word)[0]
        # get data from yandex about the word
        data = await self.get_word_data(word)
        # get the words frequency rank
        rank = self.get_frequency_rank(lemma)
        # find synonyms from the word data
        synonyms = []
        if 'def' in data and data['def']:
            word_def = data['def'][0]
            if 'tr' in word_def:
                synonyms = [tr['text'] for tr in word_def['tr'] if 'text' in tr]
        # get the frequency rank of the synonyms
        synonyms_rank = [{"synonym": synonym, "rank": self.get_frequency_rank(self.mystem.lemmatize(synonym)[0])} for synonym in synonyms]
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
        txt = re.sub(r'[^\w ]','',txt)
        # Split the text into a list of words
        words = txt.split()
        # remove the stopwords
        words = list(set(words) - self.stopwords)
        # now get the data on each word
        # Create an asyncio event loop to run asynchronous tasks
        tasks = [self.process_word(word) for word in words]
        word_data = await asyncio.gather(*tasks)
        return {k: v for word_data_dict in word_data for k, v in word_data_dict.items()}
    
def _tests():
    profiler = ProfilerObj()
    text = "Администрация президента США Джо Байдена обеспокоена возможным обсуждением высокопоставленными российскими военными использования ядерного оружия в войне с Украиной. Военное руководство в Москве недавно вело дискуссии на эту тему. Об этом пишет газета New York Times со ссылкой на неназванных американских чиновников. По данным издания, президент России Владимир Путин не был частью этих обсуждений. Он единственный, кто может принять решение об использовании такого оружия, вне зависимости от мнения генералов. Но сам факт таких дискуссий вызывает опасения Белого дома. Там считают, что обсуждение вызвано фрустрацией российских военных от неудач в войне с Украиной. Западные страны считают, что Кремль с февраля регулярно намекает на возможность использования ядерного оружия. В выступлении 27 октября Путин заявил, что Москва никогда не говорила, что готова сделать это. За день до этого сотрудничающий с российским правительством Института мировой экономики и международных отношений РАН выпустил доклад, в котором утверждалось, что Запад неправильно трактует высказывания российских официальных лиц. Анонимные источники газеты Washington Post в администрации Байдена говорят, что американские чиновники не успокоены словами Путина. Там считают, что риск применения ядерного оружия повысится, когда Москва исчерпает свои силы и конвенциональное оружие в Украине."
    output = profiler.scan_text(text)
    with open("output", "w", encoding="utf-8") as file:
        for i in output:
            file.write(f"{i}\n")
    print(f"OUTPUT:\n\n{output}")

if __name__ == "__main__":
    _tests()