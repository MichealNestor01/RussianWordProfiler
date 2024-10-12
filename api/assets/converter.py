import csv

words = set()
data = []
rank = 0
with open("./ssharoffFrequencyList2014.csv", 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    for row in reader:
        word, cefr = row[0], row[1]
        if word not in words and len(word.split(" ")) == 1:
            data.append([rank, word, cefr])
            words.add(word)
            rank += 1

with open("./modifiedSsharoffFrequencyList2014.csv", 'w', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerows(data)
