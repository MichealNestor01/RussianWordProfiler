import unittest
from unittest.mock import patch, mock_open
from datetime import datetime, timedelta
import pickle
from freezegun import freeze_time
from modules.cache import WordCache

STANDARD_CACHE = {
    "test_word": {
        "synonyms": [
            "synonym1", 
            "synonym2"
        ],
        "last_updated": datetime(2024, 6, 10, 15, 0, 0), 
        "time_to_live": 30
    }
}

# Mocking query_yandex_for_synonyms function
async def mock_query_yandex_for_synonyms(word):
    return ["exam", "quiz"]

class TestWordCache(unittest.TestCase):
    def setUp(self):
        self.cache = WordCache()
    
    @patch("builtins.open", new_callable=mock_open, read_data=pickle.dumps({}))
    def test_successful_read_from_empty_file(self, mock_file):
        # test that words dictionary is loaded from file correctly
        self.cache.loadFromFile("dummy_file")
        self.assertEqual(self.cache.words, {})
        mock_file.assert_called_once_with("dummy_file", "rb")

    @patch("builtins.open", new_callable=mock_open, read_data=pickle.dumps(STANDARD_CACHE))
    def test_successful_read_from_file(self, mock_file):
        # test that words dictionary is loaded from file correctly
        self.cache.loadFromFile("dummy_file")
        self.assertEqual(self.cache.words, STANDARD_CACHE)
        mock_file.assert_called_once_with("dummy_file", "rb")

    @patch("builtins.open", new_callable=mock_open)
    def test_file_not_found(self, mock_file):
        # test that an empty dictionary is created when the file is not found
        mock_file.side_effect = FileNotFoundError
        self.cache.loadFromFile("non_existent_file")
        self.assertEqual(self.cache.words, {})

    @patch("builtins.open", new_callable=mock_open)
    def test_successful_save_to_file(self, mock_file):
        # Test saving to file
        self.cache.words = STANDARD_CACHE
        self.cache.save("dummy_file")
        mock_file.assert_called_once_with("dummy_file", "wb")
        handle = mock_file()
        handle.write.assert_called_once()

    @freeze_time("2024-06-10")
    def test_add_word(self):
        word = "test"
        synonyms = ["exam", "quiz"]
        frozen_now = datetime(2024, 6, 10)
        self.cache.addWord(word, synonyms)
        self.assertIn(word, self.cache.words)
        self.assertEqual(self.cache.words[word]["synonyms"], synonyms)
        self.assertEqual(self.cache.words[word]["time_to_live"], self.cache.default_ttl)
        self.assertEqual(self.cache.words[word]["last_updated"], frozen_now)
