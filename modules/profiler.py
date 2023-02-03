import csv
from pymystem3 import Mystem
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
        data = self.mystem.analyze(txt)
        # TAKE OUT STOPSTRING ENTRIES
        stopstring = " , . ; : - – х « » ( ) )\n  \n  "
        for i, val in enumerate (data):
            if val["text"] in stopstring:
                data.pop(i)
        # TAKE OUT STOPWORDS
        for i, val in enumerate (data):
            if "analysis" in val and len(val["analysis"]) > 0 and val["analysis"][0]["lex"] in self.stopwords:
                data.pop(i)
        # LIST LEMMAS
        lemmas = []
        for i in data:
            if "analysis" in i and len(i["analysis"]) != 0:
                lemmas.append (i["analysis"][0]['lex'])
        # COUNT LEMMA OCCURENCES (where available)
        lemmas = FreqDist(lemmas).most_common()
        # ADD LEMMA FREQUENCY RANK
        for i, val in enumerate (lemmas):
            if any (val[0] in sl for sl in self.frequency_list):
                rank = [val[0] in lem for lem in self.frequency_list].index(True)
                entry = {"lemma": val[0], "occ": val[1], "rank": rank}
                lemmas[i] = entry
            else:
                entry = {"lemma": val[0], "occ": val[1], "rank": "not listed"}
                lemmas[i] = entry
        # PAIR WORD AND LEMMA
        words = []
        for i in data:
            if "analysis" in i and "text" in i: 
                if len(i["analysis"]) != 0:
                    words.append({"word":i["text"], "lemma":i["analysis"][0]['lex']})
                else:
                    words.append({"word":i["text"], "lemma":""})
        # ADD OCCURRENCES AND RANK
        for word in words:  
            for lemma in lemmas:
                if word["lemma"] == lemma["lemma"]:
                    word["occ"] = lemma["occ"]
                    word["rank"] = lemma["rank"]
        
        sum_occ_int = 0
        for i in lemmas:
            if "occ" in i and "rank" in i and type(i["rank"])==int:
                sum_occ_int += i["occ"]

        sum_occ_not_int = 0
        for i in lemmas:
            if "occ" in i and "rank" in i and type(i["rank"])!=int:
                sum_occ_not_int += i["occ"]
        
        sum_occ_all = sum_occ_int + sum_occ_not_int

        # Create bands array
        bands = []
        # Create bottom bracket for listed lemmas
        for band_boundary in range(self.bands_from, self.bands_to, self.bands_step):
            bands.append({"listed": "yes", "from": band_boundary})

        # Create top bracket for listed lemmas  
        for i in bands:
            i["to"] = i["from"] + self.bands_step
            i["count"] = 0
            i["entries"] = []
        
        # Populate bands with listed lemmas
        for i in bands:
            for j in lemmas:
                if type (j["rank"]) is int:
                    if j["rank"] >= i["from"] and j["rank"] < i["to"]:
                        i["entries"].append(j)

        # Create a band for unlisted lemmas 
        bands.append({"listed": "no", "count": 0, "entries": []})
        
        # Populate the unlisted lemma band
        for i in (bands):
            if i["listed"] == "no":
                for j in lemmas:
                    if j["rank"] == "not listed":
                        i["entries"].append(j)  
        return bands
        # SORT WORDS BY BAND
        for i in bands:
            if i["listed"] == "yes":
                print(i["from"], i["to"]-1)
                for j in i["entries"]:
                    print("\t", j["lemma"], j["occ"])
            if i["listed"] == "no":
                print("not listed")
                for j in i["entries"]:
                    print("\t", j["lemma"], j["occ"])
        print("ran line 116")
        # CALCULATE COVERAGE
        sum_occ = 0
        for i in bands:
            for j in i["entries"]:
                sum_occ += j["occ"]
            i["count"] = sum_occ
        print(bands[-1]["count"])
        print("ran line 123")
        output = []
        for i in bands:
            if i["listed"] == "yes":  
                from_ = i["from"]
                to_ = i["to"]-1
                coverage = round(100*i["count"]/sum_occ_all,2)
                output.append(f"from: {from_} to: {to_} coverage: {coverage}%")
            else:
                not_listed = round(100*i["count"]/sum_occ_all,2)
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