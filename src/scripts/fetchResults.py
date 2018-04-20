import csv
import os

print ("\n" * 100)
#Colum of relevant data
COL_OF_HAVE_WORKED_LANGUAGE = 89
s=""
i = 0
strippedList = []
possibleAnswers = []
strippedListList = []
colonListList = []
relevantList = []

#read survery results csv
with open('results_myOwn.csv') as csvFile:
    reader = csv.reader(csvFile, delimiter=',')
    for row in reader:
        #String with all answers
        s += str(row[COL_OF_HAVE_WORKED_LANGUAGE] + ',')

#list of only languages
l = s.split(sep=",")
for string in l:
    strippedList.append(string.strip())

#remove all NA answers
numberOfNA = strippedList.count("NA")
for x in range(numberOfNA):
    strippedList.remove("NA")
strippedList.remove('')

#Make each answer a list inside the list
i=0
for element in strippedList:
    strippedListList.append(element.split())

for element in strippedListList:
    templist = []
    for el in element:
        templist.append(el.replace(';',''))
    colonListList.append(templist)

#Filter all answers not containing JavaScript
for answerList in colonListList:
    if answerList.count( 'JavaScript' ) == 1:
        relevantList.append(answerList)

#Possible answers
for answer in relevantList:
    for language in answer:
        if possibleAnswers.count(language) == 0:
            possibleAnswers.append(language)

f = open("languages-javascript.txt", "w")
for element in possibleAnswers:
    counter = 0
    for languageList in relevantList:
        for el in languageList:
            if el == element:
                counter = counter + 1
    f.write("{}: {}\n".format(element, counter))    

f.close()




