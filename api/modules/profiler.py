import csv
from pymystem3 import Mystem
import re
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

class ProfilerObj:
    def __init__(self):
        # Start a mystem connection
        self.mystem = Mystem()
        # Retrieve the stop words
        with open("stopwords.txt", "r", encoding="utf-8") as file:
            self.stopwords = file.readlines()
        # Retrieve frequency list (Sharoff 2011)   
        with open("2011-frequency-list-SORTED.txt", "r", encoding = "utf8") as file_name:
            self.frequency_list = list(csv.reader(file_name))
        # Define frequency band limits and increment
        self.bands_from = 0
        self.bands_to = 53000
        self.bands_step = 1000

    def scan_text(self, txt):
        # REMOVE ALL PUNCTUATION FROM THE TEXT
        txt = re.sub(r'[^\w ]','',txt)
        # ANALYSE TEXT, AND REMOVE WHITE SPACE, (as well as all non-russian words)
        data = [lemma_data for lemma_data in self.mystem.analyze(txt) if len(re.sub(r'[^\w]','',lemma_data['text'])) > 0]
        # LIST LEMMAS
        lemma_data = []
        for i in data:
            if "analysis" in i and len(i["analysis"]) != 0:
                lemma_data.append(i["analysis"][0]['lex'])

        '''
        # COUNT LEMMA OCCURENCES (where available)
        # lemma_data is a list of all lemmas together with there occurences in the text
        lemma_data = FreqDist(lemma_data).most_common()
        # ADD LEMMA FREQUENCY RANK (how often they appear in typical russian)
        for i, val in enumerate (lemma_data):
            if any (val[0] in sl for sl in self.frequency_list):
                rank = [val[0] in lem for lem in self.frequency_list].index(True)
                entry = {"lemma": val[0], "occ": val[1], "rank": rank}
                lemma_data[i] = entry
            else:
                entry = {"lemma": val[0], "occ": val[1], "rank": "not listed"}
                lemma_data[i] = entry
        '''
        lemma_data = FreqDist(lemma_data).most_common()
        lemmas = {}
        for lemma_tuple in lemma_data:
            if any (lemma_tuple[0] in sl for sl in self.frequency_list):
                rank = [lemma_tuple[0] in lem for lem in self.frequency_list].index(True)
                lemmas[lemma_tuple[0]] = {"occ": lemma_tuple[1], "rank": rank}
            else:
                lemmas[lemma_tuple[0]] = {"occ": lemma_tuple[1], "rank": "not listed"}

        print(lemmas)
        word_metadata = {}
        for obj in data:
            if "analysis" in obj and "text" in obj:
                if len(obj["analysis"]) != 0:
                    lemma = obj["analysis"][0]['lex']
                    word_metadata[obj["text"]] = {
                        "word":obj["text"], 
                        "occ":lemmas[lemma]["occ"],
                        "rank":lemmas[lemma]["rank"]
                    }
                else:
                    word_metadata[obj["text"]] = {"word":obj["text"], "lemma":""}

        return word_metadata

        # PAIR WORDs AND LEMMAs
        word_lemma_pairs = []
        for i in data:
            if "analysis" in i and "text" in i:
                if len(i["analysis"]) != 0:
                    word_lemma_pairs.append({"word":i["text"], "lemma":i["analysis"][0]['lex']})
                else:
                    word_lemma_pairs.append({"word":i["text"], "lemma":""})

        # ADD LEMMA RANK DATA TO THE WORD_LEMMA_PAIRS 
        for pair in word_lemma_pairs:  
            for lemma in lemma_data:
                if pair["lemma"] == lemma["lemma"]:
                    pair["occ"] = lemma["occ"]
                    pair["rank"] = lemma["rank"]

        return word_lemma_pairs

        # ====================== #
        # NOTE TO PAVEL:
        # Why are you counting the words identified vs unidentified?
        # ====================== #
        total_identified_words = 0
        for i in lemma_data:
            if "occ" in i and "rank" in i and type(i["rank"])==int:
                total_identified_words += i["occ"]

        total_unidentified_words = 0
        for i in lemma_data:
            if "occ" in i and "rank" in i and type(i["rank"])!=int:
                total_unidentified_words += i["occ"]
        
        total_words = total_identified_words + total_unidentified_words

        # Create bands array
        bands = [{
            "listed": "yes", 
            "from": band_boundary, 
            "to": band_boundary + self.bands_step, 
            "entries": [lemma for lemma in lemma_data 
                        if type (lemma["rank"]) is int 
                        if lemma["rank"] >= band_boundary 
                        and lemma["rank"] < band_boundary + self.bands_step],
        } for band_boundary in range(self.bands_from, self.bands_to, self.bands_step)]
        # add the not listed band
        bands.append({"listed": "no", "entries": [
            lemma for lemma in lemma_data if lemma["rank"] == "not listed"
        ]})

        # DISPLAY WORDS BY BAND
        #for i in bands:
        #    if i["listed"] == "yes":
        #        print(i["from"], i["to"]-1)
        #        for j in i["entries"]:
        #            print("\t", j["lemma"], j["occ"])
        #    if i["listed"] == "no":
        #        print("not listed")
        #        for j in i["entries"]:
        #            print("\t", j["lemma"], j["occ"])

        print(total_words)
        print(bands[-1])
        output = []
        for band in bands:
            if band["listed"] == "yes":  
                from_ = band["from"]
                to_ = band["to"]-1
                coverage = round(100*len(band["entries"])/total_words,2)
                output.append(f"from: {from_} to: {to_} coverage: {coverage}%")
            else:
                not_listed = round(100*len(band["entries"])/total_words,2)
                output.append(f"not listed {not_listed}%")
        return output
    
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