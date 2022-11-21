#!/usr/bin/env python
# coding: utf-8

# In[1]:


from pathlib import Path
data_folder = Path("OneDrive/Desktop/NLP")

import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.probability import FreqDist

import string
print(string.punctuation)
spec_chars = string.punctuation + '«»—€–'
print(spec_chars)

def preprocess_text(txt):
    txt_lower=txt.lower()
    tkns = mystem.lemmatize(txt_lower)
    tkns = [tkn for tkn in tkns if tkn != " "             and tkn.strip() not in spec_chars]
    txt = " " .join(tkns)
    
    return txt



# Import REGEX interpreter
import re

# mport CSV handler (for Excel export/import)
import csv

# Import JSON handler (for pymystems information dump)
import json

# Import REGEX interpreter
import re

# Import JSON handler (for pymystems information dump)
import json

# Import tkinted GUI stuff
from tkinter import *

#import pymystem3
from pymystem3 import Mystem
mystem = Mystem() 


# In[2]:


# GET TEXT
mytxt = """

Администрация президента США Джо Байдена обеспокоена возможным обсуждением высокопоставленными российскими военными использования ядерного оружия в войне с Украиной. Военное руководство в Москве недавно вело дискуссии на эту тему. Об этом пишет газета New York Times со ссылкой на неназванных американских чиновников.

По данным издания, президент России Владимир Путин не был частью этих обсуждений. Он единственный, кто может принять решение об использовании такого оружия, вне зависимости от мнения генералов. Но сам факт таких дискуссий вызывает опасения Белого дома. Там считают, что обсуждение вызвано фрустрацией российских военных от неудач в войне с Украиной.

Западные страны считают, что Кремль с февраля регулярно намекает на возможность использования ядерного оружия. В выступлении 27 октября Путин заявил, что Москва никогда не говорила, что готова сделать это. За день до этого сотрудничающий с российским правительством Института мировой экономики и международных отношений РАН выпустил доклад, в котором утверждалось, что Запад неправильно трактует высказывания российских официальных лиц.

Анонимные источники газеты Washington Post в администрации Байдена говорят, что американские чиновники не успокоены словами Путина. Там считают, что риск применения ядерного оружия повысится, когда Москва исчерпает свои силы и конвенциональное оружие в Украине.
"""

words = mytxt.split()
print(len(words))

for i in words:
    print(i)


# In[ ]:





# In[20]:


#win = Tk()
#text_box = Text(win)
#text_box.insert(INSERT, mytxt)
#text_box.pack()
#win.mainloop()


# In[3]:


## GET EXTENDED MYSTEM OUTPUT
mytxt_data = mystem.analyze(mytxt)

for i in mytxt_data:
    print (i)


# In[4]:


# SET STOPSTRING
stopstring = " , . ; : - – х « » ( ) )\n  \n  "

# TAKE OUT STOPSTRING ENTRIES
words = []
for i, val in enumerate (mytxt_data):
    if val["text"] in stopstring:
        #print (i, val)
        mytxt_data.pop(i)

print (len(mytxt_data))


# In[5]:


# SET STOPWORDS
stopwords = [
    "владимир",
    "джо",
    "казахстан",
    "кремль",
    "россия" ,
    "сша" ,
    "сирия" ,
    "китай" ,
    "назарбаев" ,
    "москва" ,
    "оон" ,
    "евразия" ,
    "вашингтон" ,
    "франция" ,
    "великобритания" ,
    "нурсултан" ,
    "ольга" ,
    "оликер" ,
    "узбекистан" ,
    "азия" ,
    "астана" ,
    "ричард" ,
    "вайца" ,
    "хадсон" ,
    "афганистан" ,
    "иран" ,
    "эндрю" ,
    "качинс" ,
    "европа" ,
    "джорджтаунский" ,
    "боливия" ,
    "крым" ,
    "донбасс" ,
    "украина" ,
    "астанинский",
    "х",
    "польша",
    "германия",
    "берлин",
    "мариуш",
    "блащак",
    "владимир",
    "зеленский",
    "анджей",
    "киев",
    "алексей",
    "резников",
    "опубликовать",
    "великобритания",
    "балтия",
    "чехия",
    "бербка",
    "нато",
    "матеуш",
    "моравецкий",
    "фрг",
    "дмитрий",
    "кулеб",
    "солоха",
    "павел",
    "анналить",
    "всу",
    "мид",
    "минобороны",
    "дуда",
    "рф",
    "эммануэль",
    "макрон",
    "путин",
    "александр",
    "панкин",
    "риа",
    "владимир",
    "джо",
    "байден",
    "олаф",
    "шолец",
    "москва",
    "сергей",
    "лавров",
    "минский"
    
]

print(len(stopwords))

# TAKE OUT STOPWORDS
for i,val in enumerate (mytxt_data):
    if "analysis" in val and len(val["analysis"]) > 0 and val["analysis"][0]["lex"] in stopwords:
        mytxt_data.pop(i)
           
for i in mytxt_data:
    print (i)


# In[6]:


# LIST LEMMAS
mytxt_lemmas = []
for i in mytxt_data:
    if "analysis" in i and len(i["analysis"]) != 0:
        mytxt_lemmas.append (i["analysis"][0]['lex'])
        
# COUNT LEMMA OCCURENCES (where available)
fdist = FreqDist(mytxt_lemmas)
mytxt_lemmas = fdist.most_common()
# ('в', 37), ('и', 29), ('казахстан', 24), ....


print (len(mytxt_lemmas))


    
# ADD LEMMA FREQUENCY RANK
# Retrieve frequency list (Sharoff 2011)
frq_list = []
with open(data_folder / "2011-frequency-list-SORTED.txt", "r", encoding = "utf8") as file_name:
    file_read = csv.reader(file_name)
    frq_list = list(file_read)
    
print (len (frq_list))
for i in frq_list:
    print (i)


    
# Add frq. rank to entries
for i, val in enumerate (mytxt_lemmas):
    if any (val[0] in sl for sl in frq_list):
        rank = [val[0] in lem for lem in frq_list].index(True)
        entry = {"lemma": val[0], "occ": val[1], "rank": rank}
        mytxt_lemmas[i] = entry
    else:
        entry = {"lemma": val[0], "occ": val[1], "rank": "not listed"}
        mytxt_lemmas[i] = entry

print (len(mytxt_lemmas))       
        
sum_occ = 0
occ_list = []
for i in mytxt_lemmas:
    if "occ" in i:
        sum_occ += i["occ"]
        occ_list.append(i) 
        

print(sum_occ)


# In[7]:


# PAIR WORD AND LEMMA
mytxt_words = []
for i in mytxt_data:
    if "analysis" in i and "text" in i: 
        if len(i["analysis"]) != 0:
            mytxt_words.append({"word":i["text"], "lemma":i["analysis"][0]['lex']})
        else:
            mytxt_words.append({"word":i["text"], "lemma":""})

# ADD OCCURRENCES AND RANK
for i in mytxt_words:  
    for j in mytxt_lemmas:
        if i["lemma"] == j["lemma"]:
            i["occ"] = j["occ"]
            i["rank"] = j["rank"]

sum_occ = 0
for i in mytxt_words:
    if "occ" in i:
        #print (i["word"])
        sum_occ += i["occ"]

print(len(mytxt_words))


# In[8]:


sum_occ_int = 0
for i in mytxt_lemmas:
    if "occ" in i and "rank" in i and type(i["rank"])==int:
        #print (i, type(i["rank"]))
        sum_occ_int += i["occ"]
        


sum_occ_not_int = 0
for i in mytxt_lemmas:
    if "occ" in i and "rank" in i and type(i["rank"])!=int:
        print (i["lemma"], ",")
        sum_occ_not_int += i["occ"]

sum_occ_all = sum_occ_int + sum_occ_not_int        
        
print (sum_occ_int)       
print (sum_occ_not_int)
print (sum_occ_all)


# In[9]:


# Define frequency band limits and increment
bands_from = 0
bands_to = 53000
bands_step = 1000

# Create bands array
bands = []

# Set initial value
band_boundary = bands_from 


# Create bottom bracket for listed lemmas
while band_boundary <= bands_to - bands_step:
    bands.append({"listed": "yes", "from": band_boundary})
    band_boundary += bands_step

# Create top bracket for listed lemmas  
for i in bands:
    i["to"] = i["from"] + bands_step
    i["count"] = 0
    i["entries"] = []
    
# Populate bands with listed lemmas
for i in bands:
    for j in mytxt_lemmas:
        if type (j["rank"]) is int:
            if j["rank"] >= i["from"] and j["rank"] < i["to"]:
                i["entries"].append(j)
                #print (j["lemma"],j["occ"])


# Create a band for unlisted lemmas 
bands.append({"listed": "no", "count": 0, "entries": []})

# Populate the unlisted lemma band
for i in (bands):
    if i["listed"] == "no":
        for j in mytxt_lemmas:
            if j["rank"] == "not listed":
                i["entries"].append(j)  


# In[10]:


# SORT WORDS BY BAND

for i in bands:
    if i["listed"] == "yes":
        print (i["from"], i["to"]-1)
        for j in i["entries"]:
            print ("\t", j["lemma"], j["occ"])
    if i["listed"] == "no":
        print ("not listed")
        for j in i["entries"]:
            print ("\t", j["lemma"], j["occ"])


# In[12]:


# CALCULATE COVERAGE
sum_occ = 0
for i in bands:
    for j in i["entries"]:
        # print ("\t", j["lemma"],j["occ"])
        sum_occ += j["occ"]
    i["count"] = sum_occ
print (bands[-1]["count"])
    
for i in bands:
    if i["listed"] == "yes":    
        print ("from:", i["from"], 
               "to:", i["to"]-1, 
               #i["count"], 
               "coverage:", round(100*i["count"]/sum_occ_all,2), 
               "%")
    else:
        print ("not listed", 
               #i["count"],
               round(100*i["count"]/sum_occ_all,2), 
               "%"
              )
        


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




