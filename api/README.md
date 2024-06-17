<!-- api documentation master file, created by
sphinx-quickstart on Mon Jun 17 10:07:45 2024.
You can adapt this file completely to your liking, but it should at least
contain the root `toctree` directive. -->

# Russian Word Profiler Flask API

The Flask api which powers the Russian Word Profiler

# Contents

- [Russian Word Profiler Flask API](#russian-word-profiler-flask-api)
- [Contents](#contents)
- [Usage Instrutctions](#usage-instrutctions)
- [Documentation Instuctions](#documentation-instuctions)
- [API documentation](#api-documentation)
  - [Default Endpoint](#default-endpoint)
    - [GET /](#get-)
  - [Scan Text Endpoint](#scan-text-endpoint)
    - [POST /scantext/](#post-scantext)
- [Profiler documentation](#profiler-documentation)
    - [*class* modules.profiler.ProfilerObj(use\_cache=True)](#class-modulesprofilerprofilerobjuse_cachetrue)
      - [get\_frequency\_rank(lemma)](#get_frequency_ranklemma)
      - [load\_frequency\_list(file\_path)](#load_frequency_listfile_path)
      - [*async* process\_word(word)](#async-process_wordword)
      - [*async* scan\_text(txt)](#async-scan_texttxt)
      - [set\_stopwords(stopwords)](#set_stopwordsstopwords)
- [Cache documentation](#cache-documentation)
    - [*class* modules.cache.WordDataCacheEntry](#class-modulescacheworddatacacheentry)
    - [*class* modules.cache.WordCache(file=None)](#class-modulescachewordcachefilenone)
      - [addWord(word, synonyms)](#addwordword-synonyms)
      - [*async* get\_synonyms(word)](#async-get_synonymsword)
      - [loadFromFile(file)](#loadfromfilefile)
      - [save(file=None)](#savefilenone)
- [query\_yandex documentation](#query_yandex-documentation)
    - [*async* modules.query\_yandex.query\_yandex\_for\_synonyms(word)](#async-modulesquery_yandexquery_yandex_for_synonymsword)


# Usage Instrutctions

Add details here about how to run the development server

# Documentation Instuctions

We have decided to include documentation exclusively in this README so that it is easily accessible and because it is a small project.

Add details of how to generate documentation

# API documentation

This document provides an overview of the available API endpoints and their usage.

> ##### Table of Contents
>
> - [Default Endpoint](#default-endpoint)
> - [Scan Text Endpoint](#scan-text-endpoint)

## Default Endpoint

### GET /

Returns the react.js frontend app.

**Example request**:

```http
GET / HTTP/1.1
Host: michealnestor.pythonanywhere.com
```

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: text/html

(HTML content of index.html)
```

## Scan Text Endpoint

### POST /scantext/

Processes a string of words and returns the frequency rank of each word, synonyms and its lemma.

**Example request**:

```http
POST /scantext/ HTTP/1.1
Host: michealnestor.pythonanywhere.com
Accept: application/json

{
   "text": "The text to be processed.",
   "stopwords": ["a", "an", "the"]
}
```

**Example response**:

```http
HTTP/1.1 200 OK
Content-Type: application/json, text/javascript

{
   "be": {
      "lemma": "be",
      "rank": -1,
      "synonyms":[]
   },
   "processed": {
      "lemma": "processed",
      "rank": -1,
      "synonyms": []
   },
   "text": {
      "lemma": "text",
      "rank": -1,
      "synonyms": []
   },
   "the": {
      "lemma": "the",
      "rank": -1,
      "synonyms": []
   },
   "to": {
      "lemma": "to",
      "rank": -1,
      "synonyms":[]
   }
}
```

- **Status Codes:**
  - [200 OK](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.1) – No error
  - [400 Bad Request](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.1) – Bad request

# Profiler documentation

### *class* modules.profiler.ProfilerObj(use_cache=True)

Bases: `object`

A profiler object to process and analyze word frequency and synonyms.

Attributes:
: mystem (Mystem): A Mystem object for lemmatization.
  stopwords (set): A set of stopwords to ignore during text processing.
  frequency_list (dict): A dictionary mapping lemmas to their frequency ranks.
  cache (WordCache): A cache object to store and retrieve synonyms.

Methods:
: \_\_init_\_(self, use_cache: bool = True):
  : Initializes the ProfilerObj with an optional cache.
: set_stopwords(self, stopwords) -> None:
  : Sets the stopwords for the profiler.
: load_frequency_list(self, file_path: str) -> None:
  : Loads a frequency list from a specified file path.
: get_frequency_rank(self, lemma: str) -> int:
  : Retrieves the frequency rank of a given lemma.
: async process_word(self, word: str) -> Dict[str, Dict[str, Any]]:
  : Asynchronously processes a single word to determine its lemma, frequency rank, and synonyms.
: async scan_text(self, txt: str) -> Dict[str, Dict[str, Any]]:
  : Asynchronously scans a block of text and analyzes each word in it.

#### get_frequency_rank(lemma)

Retrieve the frequency rank of a given lemma.

* **Return type:**
  `int`

Args:
: lemma (str): The lemma whose frequency rank is to be retrieved.

Returns:
: int: The frequency rank of the lemma or -1 if the lemma is not found.

#### load_frequency_list(file_path)

Load a frequency list from a specified file path.

* **Return type:**
  `None`

Args:
: file_path (str): The path to the frequency list file.

#### *async* process_word(word)

Asynchronously process a single word to determine its lemma, frequency rank, and synonyms.

* **Return type:**
  `Dict`[`str`, `Dict`[`str`, `Any`]]

Args:
: word (str): The word to process.

Returns:
: dict: {word: {rank: int, lemma: str, synonyms: [{synonym: str, rank: int, lemma: str}]}

#### *async* scan_text(txt)

Asynchronously scan a block of text and analyze each word in it.

* **Return type:**
  `Dict`[`str`, `Dict`[`str`, `Any`]]

Args:
: txt (str): The text to scan.

Returns:
: dict: {word: {rank: int, lemma: str, synonyms: [{synonym: str, rank: int, lemma: str}]}

#### set_stopwords(stopwords)

Set the stopwords for the profiler.

* **Return type:**
  `None`

Args:
: stopwords (iterable): An iterable of words to set as stopwords.

# Cache documentation

### *class* modules.cache.WordDataCacheEntry

Bases: `TypedDict`

A TypedDict that represents a cache entry for a word.

Attributes:
: synonyms (List[str]): A list of synonyms for the word.
  last_updated (datetime): The timestamp of when the entry was last updated.
  time_to_live (int): The time-to-live (TTL) for the entry in days.

### *class* modules.cache.WordCache(file=None)

Bases: `object`

A class to manage a cache of words and their synonyms with a time-to-live (TTL) mechanism.

Attributes:
: default_ttl (int): Default TTL value in days for cache entries. Set to 30.
  file (str): Path to the file for saving/loading the cache.
  words (Dict[str, WordDataCacheEntry]): Dictionary storing the cache entries.

Methods:
: \_\_init_\_(self, file: str = None):
  : Initializes the WordCache object with an optional file for loading the cache.
: loadFromFile(self, file: str) -> None:
  : Loads the cache from the specified file.
: save(self, file: str = None) -> None:
  : Saves the current cache to the specified file.
: addWord(self, word: str, synonyms: List[str]) -> None:
  : Adds a word and its synonyms to the cache.
: async get_synonyms(self, word: str) -> List[str]:
  : Retrieves the synonyms for the specified word, updating the cache if necessary.

#### addWord(word, synonyms)

Adds a word and its synonyms to the cache with the default TTL.

* **Return type:**
  `None`

Args:
: word (str): The word to add to the cache.
  synonyms (List[str]): List of synonyms for the word.

#### *async* get_synonyms(word)

Retrieves the synonyms for the specified word, updating the cache if necessary.

* **Return type:**
  `List`[`str`]

Args:
: word (str): The word to retrieve synonyms for.

Returns:
: List[str]: List of synonyms for the specified word.

#### loadFromFile(file)

Loads the cache from the specified file.

* **Return type:**
  `None`

Args:
: file (str): Path to the file for loading the cache.

Raises:
: FileNotFoundError: If the specified file does not exist.

#### save(file=None)

Saves the current cache to the specified file.

* **Return type:**
  `None`

Args:
: file (str, optional): Path to the file for saving the cache. If None, uses the initial file path. Defaults to None.

Raises:
: Exception: If there is an error saving the file.

# query_yandex documentation

### *async* modules.query_yandex.query_yandex_for_synonyms(word)

Asynchronously query the Yandex Dictionary API for synonyms of a given word.

* **Return type:**
  `List`[`str`]

Args:
: word (str): The word for which synonyms are to be retrieved.

Returns:
: List[str]: A list of synonyms for the word.

Raises:
: aiohttp.ClientResponseError: If the HTTP request to the Yandex API fails,
  : this exception is raised with detailed error information.


