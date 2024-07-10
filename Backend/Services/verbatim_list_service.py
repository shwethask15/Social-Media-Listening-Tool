from crud.crud_verbatims_list import Verbatims
from models import verbatims_list
from http.client import HTTPException
from schemas.verbatims_list_schema import verbatims_filters,verbatims_list_update,Verbatims_List_create
from database.session import SessionLocal,engine
from sqlalchemy.orm import Session
from database.session import SessionLocal
from models.verbatims_list import Verbatims_List


async def get_data1(db : Session):
    # print("hi")
    # da = SessionLocal()
    data = Verbatims.get_all(db=db)
    # data = da.query(verbatims_list.Verbatims_List).all()
    # da.close()
    # print(data)
    return data

async def get_data_with_filters1(q : verbatims_filters,db : Session):
    data = Verbatims.get_all(db=db)
    d = {"brand":[],"country":[],"source":[],"sentiment":[],"virality":[],"severity":[],"profanity":[]}
    q= dict(q)
    for i in q:
        if q[i]!= None and len(q[i])!=0:
            print(q[i])
            if q[i][0] != "string":
                # print(q[i])
                d[i] = q[i]
                #print([ord[i] for i in q[i]])
                # print(d[i])

    # print(d)
    r = []
    for i in data:
        r.append(i.__dict__)
    # print(d)
    # print(r)
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
    # print(r)
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
            # else:
            #     res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
            #     res.theme = update_body[i]
                # res.theme_altered = True
    db.commit()
    # for i in ref:
    #     if i == "virality":
    #         data.virality = temp[i]
    #         data.virality_altered = temp[ref[i]]
    #     elif i == "sentiment":
    #         data.sentiment = temp[i]
    #         data.sentiment_altered = temp[ref[i]]
    #     elif i == "severity":
    #         data.severity = temp[i]
    #         data.severity_altered = temp[ref[i]]
    #     else:
    #         data.theme = temp[i]
    #         data.theme_altered = temp[ref[i]]
    # new_data = Verbatims_List()
    # new_data.brand = data.brand
    # new_data.datasource = data.datasource
    # new_data.count = data.count
    # new_data.country = data.country
    # new_data.date = data.date
    # new_data.full_text = data.full_text
    # new_data.id = data.id

    # print(data.virality_altered)
    # db.add(data)
    # db.commit()
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
            # print(query)
            query[i] = query[i]+" "+query[i+1]
            # query.remove(query[i+1])
    i = 0
    while i < l:
        if query[i] == "united":
            query[i] = query[i]+" "+query[i+1]
            query.remove(query[i+1])
            l-=1
            i-=1
        i+=1
    print(query)
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
    # print(input_string[i])
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
            # print(temp,c,filters)
        elif query[i] in key_words_values:
            temp = []
            temp.append(query[i])
            print(temp)
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
                    # print(i)
                    break
            # print(j,temp,c,filters)
                if len(query)-1 == j:
                    i = j
        elif query[i] in countries:
            filters["country"].append(query[i])
        i+=1
    # print(filters,i)
    
    print(filters)
    r1 = []
    # print(len(data))
    # for j in range(len(data)):
    #     print(j)
    for j in data:
        r1.append(j.__dict__)
    # r = []
    # print(len(r))
    if len(filters["virality"])!=0:
        for j in data:
            temp = j.__dict__
            c+=1
            # print(j["virality"])
            # print(i,temp["virality"].lower(),c)
            if temp["virality"].lower() not in filters["virality"]:
                # r.append(j)
                # r1.remove(temp)
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
    data = []
    # print(len(r))
    for i in r1:
        data.append(Verbatims_List_create(**i))
    # r1 =[]
    print(len(data))
    if len(filters["sentiment"]):
        for j in data:
            temp=j.__dict__
            # print(j)
            if temp["sentiment"].lower() not in filters["sentiment"]:
                # print(j in r)
                # r1.append
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
    # print(len(r))
    data = []
    # print(len(r))
    for i in r1:
        data.append(Verbatims_List_create(**i))
    print(len(data))
    # print(i)
    if len(filters["severity"])!=0:
        for j in data:
            temp=j.__dict__
            if temp["severity"].lower() not in filters["severity"]:
                # r1.remove(temp)
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
            # print(len(r),temp["severity"])
        # else:
        #     print(temp["severity"])
    data = []
    # print(len(r))
    for i in r1:
        data.append(Verbatims_List_create(**i))
    print(len(data))
    if len(filters["country"])!=0:
        for j in data:
            temp = j.__dict__
            if temp["country"].lower() not in filters["country"]:
                for k in r1:
                    if k["mention_id"] == temp["mention_id"]:
                        r1.remove(k)
                        break
# print(len(r))
# for i in r:
#     print(i.severity)
# for i in r:
#     print(i["virality"])

    # print(len(r))
    print(len(r1))
    
    return r1
