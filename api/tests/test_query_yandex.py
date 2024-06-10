import unittest
from unittest.mock import patch
from aioresponses import aioresponses
import aiohttp
import asyncio
from modules.query_yandex import query_yandex_for_synonyms 

STANDARD_YANDEX_RESPONSE_STRUCTURE = {
    "def": [
        {
            "text": "test_word",
            "pos": "noun",
            "tr": [
                {
                    "text": "synonym1",
                    "pos": "noun",
                    "syn": [
                        {
                            "text": "synonym2",
                            "pos": "noun",
                        },
                        {
                            "text": "synonym3",
                            "pos": "noun",
                        }
                    ]
                },
                {
                    "text": "synonym4",
                    "pos": "noun",
                    "syn": [
                        {
                            "text": "synonym5",
                            "pos": "noun",
                        }
                    ]
                }
            ]
        }
    ]
}

class TestQueryYandexForSynonyms(unittest.IsolatedAsyncioTestCase):

    @patch("modules.query_yandex.API_KEY", "test_api_key")
    @patch("modules.query_yandex.DEPLOYED", "false")
    async def test_standard_result(self):
        word = "test_word"
        expected_synonyms = ["synonym1", "synonym2", "synonym3", "synonym4", "synonym5"]
        expected_url = "https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=test_api_key&lang=ru-ru&text=test_word"

        with aioresponses() as m:
            m.get(expected_url, payload=STANDARD_YANDEX_RESPONSE_STRUCTURE) 
            synonyms = await query_yandex_for_synonyms(word)
            self.assertCountEqual(synonyms, expected_synonyms)