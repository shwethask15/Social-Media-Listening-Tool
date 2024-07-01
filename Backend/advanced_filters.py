from crud.crud_verbatims_list import Verbatims
from database.session import SessionLocal
from sqlalchemy.orm import Session
from models.verbatims_list import Verbatims_List

db= SessionLocal()
data = db.query(Verbatims_List).all()
db.close()
key_words = ["sentiment","virality","severity"]
key_words_values = ["low","high","medium","no_threat","positive","negative","neutral"]
# brand = []
# for i in data:
#     temp = i.__dict__
#     if temp["brand"] not in brand:
#         brand.append(temp["brand"])
# print(brand)

input_string = input()
input_string = input_string.lower()
input_string = input_string.split()
filters = {"virality":[],"sentiment":[],"severity":[] }
i = 0
while i<len(input_string):
    # print(input_string[i])
    if input_string[i] in key_words:
        print(i,input_string[i])
        temp = []
        temp.append(input_string[i])
        c = 0
        for j in range(i+1,len(input_string)):
            print(input_string[j])
            if input_string[j] in key_words_values:
                c+=1
                for k in temp:
                    filters[k].append(input_string[j])
            elif input_string[j] in key_words and c==0:
                temp.append(input_string[j])
            elif input_string[j] in key_words and c!=0:
                i = j-1
                break
            if len(input_string)-1 == j:
                i = j
            # print(temp,c,filters)
    elif input_string[i] in key_words_values:
        temp = []
        temp.append(input_string[i])
        print(temp)
        c = 0
        print(i,input_string[i])
        for j in range(i+1,len(input_string)):
            print(input_string[j],c,j)
            if input_string[j] in key_words:
                c+=1
                for k in temp:
                    filters[input_string[j]].append(k)
            elif input_string[j] in key_words_values and c==0:
                temp.append(input_string[j])
            elif input_string[j] in key_words_values and c!=0:
                i = j-1
                # print(i)
                break
            # print(j,temp,c,filters)
            if len(input_string)-1 == j:
                i = j
    i+=1
    print(filters,i)
    
print(filters)
r = data
for i in filters["virality"]:
    for j in r:
        temp = j.__dict__
        # print(j["virality"])
        if i != temp["virality"].lower():
            r.remove(j)
# print(len(r))
for i in filters["sentiment"]:
    for j in r:
        temp=j.__dict__
        # print(j)
        if i!=temp["sentiment"].lower():
            # print(j in r)
            r.remove(j)
for i in filters["severity"]:
    for j in r:
        temp=j.__dict__
        if i!=temp["severity"].lower():
            r.remove(j)
# for i in r:
#     print(i["virality"])

print(len(r))

