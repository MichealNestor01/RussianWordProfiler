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