import unittest
from unittest.mock import patch, MagicMock
from modules.profiler import ProfilerObj

class TestProfiler(unittest.TestCase):
    def setUp(self):
        with patch('builtins.open', unittest.mock.mock_open()), patch('pickle.load', return_value={"cache": "data"}):
            self.profiler = ProfilerObj(False)

    # ===== set_stopwords ===== #
    def test_set_stopwords(self):
        self.profiler.set_stopwords(['stop', 'words'])
        self.assertEqual(self.profiler.stopwords, {'stop', 'words'})
    
    def test_set_stopwords_with_duplicated_words(self):
        self.profiler.set_stopwords(['stop', 'stop', 'words'])
        self.assertEqual(self.profiler.stopwords, {'stop', 'words'})

    # ===== load_frequency_list ===== #
    def test_load_frequency_list(self):
        # This test checks if the frequency list is correctly loaded into the profiler.
        # We use patch to mock the open function to control the file's content.
        with patch('builtins.open', unittest.mock.mock_open(read_data="1,example\n2,test")) as mocked_file:
            self.profiler.load_frequency_list("dummy_path")
            # Verify that the file was opened correctly with the specified parameters.
            mocked_file.assert_called_once_with("dummy_path", 'r', encoding='utf-8')
            # Check if the frequency list dictionary was populated correctly.
            self.assertEqual(self.profiler.frequency_list, {'example': 1, 'test': 2})

    # ===== load and save cache ===== #
    # def test_save_and_load_cache(self):
    #     # This test ensures that saving to and loading from the cache work correctly.
    #     # Patch pickle's dump and load methods to simulate file operations without actual disk I/O.
    #     with patch('pickle.dump') as mock_dump, \
    #          patch('pickle.load', return_value={'word': 'data'}) as mock_load:
    #         self.profiler.save_cache()
    #         # Verify that pickle.dump was called once (meaning the cache was saved).
    #         mock_dump.assert_called_once()

    #         self.profiler.load_cache()
    #         # Check if the cache is loaded correctly by comparing to expected data.
    #         self.assertEqual(self.profiler.word_data_cache, {'word': 'data'})

    # ===== get_word_cache ====== #
    # @patch('aiohttp.ClientSession.get')
    # async def test_get_word_data(self, mock_get):
    #     # This test checks the asynchronous get_word_data method by mocking an API response.
    #     mock_response = MagicMock()
    #     mock_response.json = MagicMock(return_value={"def": [{"text": "example"}]})
    #     mock_get.return_value.__aenter__.return_value = mock_response
        
    #     result = await self.profiler.get_word_data("test")
    #     # Ensure that the mocked API returned the data as we expected.
    #     self.assertEqual(result, {"def": [{"text": "example"}]})