from Crud.crud_verbatims_list import Verbatims
from Models import verbatims_list
from http.client import HTTPException
from Schemas.verbatims_list_schema import verbatims_filters,verbatims_list_update,Verbatims_List_create
from Database.session import SessionLocal,engine
from sqlalchemy.orm import Session
from Database.session import SessionLocal
from Models.verbatims_list import Verbatims_List


async def get_data1(db : Session):
    data = Verbatims.get_all(db=db)
    return data

async def get_data_with_filters1(q : verbatims_filters,db : Session):
    data = Verbatims.get_all(db=db)
    d = {"brand":[],"country":[],"source":[],"sentiment":[],"virality":[],"severity":[],"profanity":[]}
    q= dict(q)
    for i in q:
        if q[i]!= None and len(q[i])!=0:
            print(q[i])
            if q[i][0] != "string":
                d[i] = q[i]

    r = []
    for i in data:
        r.append(i.__dict__)
    if len(d["brand"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["brand"][1:] not in d["brand"]:
                for k in r:
                    if k["mention_id"] == temp["mention_id"]:
                        r.remove(k)
                        break
    data = []
    for i in r:
        data.append(Verbatims_List_create(**i))
    if len(d["country"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["country"] not in d["country"]:
                for k in r:
                    if k["mention_id"] == temp["mention_id"]:
                        r.remove(k)
                        break
    data = []
    for i in r:
        data.append(Verbatims_List_create(**i))
    if len(d["source"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["source"] not in d["source"]:
                for k in r:
                    if k["mention_id"] == temp["mention_id"]:
                        r.remove(k)
                        break
    data = []
    for i in r:
        data.append(Verbatims_List_create(**i))            
    if len(d["sentiment"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["sentiment"] not in d["sentiment"]:
                for k in r:
                    if k["mention_id"] == temp["mention_id"]:
                        r.remove(k)
                        break
    data = []
    for i in r:
        data.append(Verbatims_List_create(**i))
    if len(d["virality"]):
        for j in data:
            temp = j.__dict__
            if temp["virality"] not in d["virality"]:
                for k in r:
                    if k["mention_id"] == temp["mention_id"]:
                        r.remove(k)
                        break
    data = []
    for i in r:
        data.append(Verbatims_List_create(**i))
    if len(d["severity"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["severity"] not in d["severity"]:
                for k in r:
                    if k["mention_id"] == temp["mention_id"]:
                        r.remove(k)
                        break
    data = []
    for i in r:
        data.append(Verbatims_List_create(**i))
    if len(d["profanity"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["virality"] not in d["profanity"]:
                for k in r:
                    if k["mention_id"] == temp["mention_id"]:
                        r.remove(k)
                        break    
    return r
async def get_data_by_mention_id1(mention_id : str,update_body : verbatims_list_update,db : Session):
    data = Verbatims.get_By_Id(mention_id=mention_id,db=db)
    print(update_body)
    ref = {"virality" : "virality_altered","sentiment" : "sentiment_altered","severity":"severity_altered"}
    update_body = dict(update_body)
    temp = data
    temp = temp.__dict__
    for i in update_body:
        if update_body[i] != "" and temp[ref[i]] != True:
            if i == "virality":
                res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
                res.virality = update_body[i]
                # res.virality_altered = True
            elif i == "sentiment":
                res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
                res.sentiment = update_body[i]
                # res.sentiment_altered = True
            elif i == "severity":
                res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
                res.severity = update_body[i]
                # res.severity_altered = True
    db.commit()
    db.refresh(data)
    return data

async def advanced_filters_query(query : str,db : Session):
    data = Verbatims.get_all(db=db)
    countries =[]
    for i in data:
        if i.country.lower() not in countries:
            countries.append(i.country.lower())
    print(countries)
    key_words = ["sentiment","virality","severity"]
    key_words_values = ["low","high","medium","no_threat","positive","negative","neutral"]
    query = query.lower()
    query = query.split()
    filters = {"virality":[],"sentiment":[],"severity":[],"country":[] }
    l = len(query)
    for i in range(len(query)):
        if "united" in query[i]:
            query[i] = query[i]+" "+query[i+1]
    i = 0
    while i < l:
        if query[i] == "united":
            query[i] = query[i]+" "+query[i+1]
            query.remove(query[i+1])
            l-=1
            i-=1
        i+=1
    res = query
    query = []
    for i in res:
        if i[0] == ',':
            query.append(i[1:])
        elif i[-1] == ',':
            query.append(i[:len(i)-1])
        elif ',' in i:
            temp = i.split(',')
            query.extend(temp)
        else:
            query.append(i)
    print(query)
    i = 0
    while i<len(query):
        if query[i] in key_words:
            print(i,query[i])
            temp = []
            temp.append(query[i])
            c = 0
            for j in range(i+1,len(query)):
                print(query[j])
                if query[j] in key_words_values:
                    c+=1
                    for k in temp:
                        filters[k].append(query[j])
                elif query[j] in key_words and c==0:
                    temp.append(query[j])
                elif query[j] in key_words and c!=0:
                    i = j-1
                    break
                if len(query)-1 == j:
                    i = j
        elif query[i] in key_words_values:
            temp = []
            temp.append(query[i])
            c = 0
            print(i,query[i])
            for j in range(i+1,len(query)):
                print(query[j],c,j)
                if query[j] in key_words:
                    c+=1
                    for k in temp:
                        filters[query[j]].append(k)
                elif query[j] in key_words_values and c==0:
                    temp.append(query[j])
                elif query[j] in key_words_values or c!=0:
                    print(query[j])
                    i = j-1
                    break
                if len(query)-1 == j:
                    i = j
        elif query[i] in countries:
            filters["country"].append(query[i])
        i+=1
    
    print(filters)
    r1 = []
    for j in data:
        r1.append(j.__dict__)
    if len(filters["virality"])!=0:
        for j in data:
            temp = j.__dict__
            c+=1
            if temp["virality"].lower() not in filters["virality"]:
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
    data = []
    for i in r1:
        data.append(Verbatims_List_create(**i))
    if len(filters["sentiment"]):
        for j in data:
            temp=j.__dict__
            if temp["sentiment"].lower() not in filters["sentiment"]:
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
    data = []
    for i in r1:
        data.append(Verbatims_List_create(**i))
    if len(filters["severity"])!=0:
        for j in data:
            temp=j.__dict__
            if temp["severity"].lower() not in filters["severity"]:
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
    data = []
    for i in r1:
        data.append(Verbatims_List_create(**i))
    if len(filters["country"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["country"].lower() not in filters["country"]:
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
    return r1
