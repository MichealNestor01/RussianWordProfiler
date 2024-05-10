import unittest
from modules.profiler import ProfilerObj

class TestProfiler(unittest.TestCase):
    def setUp(self):
        self.profiler = ProfilerObj()

    # ===== set_stopwords ===== #
    def test_set_stopwords(self):
        self.profiler.set_stopwords(['stop', 'words'])
        self.assertEqual(self.profiler.stopwords, {'stop', 'words'})
    
    def test_set_stopwords_with_duplicated_words(self):
        self.profiler.set_stopwords(['stop', 'stop', 'words'])
        self.assertEqual(self.profiler.stopwords, {'stop', 'words'})

    