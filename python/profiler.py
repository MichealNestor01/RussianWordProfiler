from pymystem3 import Mystem

class Profiler:
    def __init__(self):
        self._mystem = Mystem()
        self._textRaw = ""

    def getTextRaw(self):
        return self._textRaw

    def setText(self, text):
        self._textRaw = text


profiler = Profiler()
profiler.setText("hello")
print(profiler.getTextRaw())