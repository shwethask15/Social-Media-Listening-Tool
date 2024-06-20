from crud.crud_verbatims_list import Verbatims
from models import verbatims_list
from http.client import HTTPException
from schemas.verbatims_list_schema import verbatims_filters,verbatims_list_update,Verbatims_List_create
from database.session import SessionLocal,engine
from sqlalchemy.orm import Session
from models.verbatims_list import Verbatims_List


async def get_data1(db : Session):
    data = Verbatims.get_all(db=db)
    return data

async def get_data_with_filters1(q : verbatims_filters,db : Session):
    data = Verbatims.get_all(db=db)
    d = {}
    q= dict(q)
    for i in q:
        if q[i][0] != "string":
            # print(q[i])
            d[i] = q[i]
            #print([ord[i] for i in q[i]])
            # print(d[i])
        else:
            d[i] = []
    r = []
    # print(d)
    for i in d["brand"]:
        for j in data:
            j = j.__dict__
            if i == j["brand"][1:]:
                r.append(j)
    for i in d["datasource"]:
        for j in r:
            if i != j["datasource"]:
                r.remove(j)
    print(r)
    for i in d["country"]:
        for j in r:
            if i != j["country"]:
                r.remove(j)
    for i in d["theme"]:
        for j in r:
            if i != j["theme"]:
                r.remove(j)
    for i in d["source"]:
        for j in r:
            if i != j["source"]:
                r.remove(j)
    for i in d["sentiment"]:
        for j in r:
            if i != j["sentiment"]:
                r.remove(j)
    for i in d["virality"]:
        for j in r:
            if i != j["virality"]:
                r.remove(j)
    for i in d["severity"]:
        for j in r:
            if i != j["severity"]:
                r.remove(j)
    for i in d["profanity"]:
        # print(i)
        for j in r:
            # print(type(i),type(j["profanity_filter"]))
            if i != j["profanity_filter"]:
                r.remove(j)    
    return r
async def get_data_by_mention_id1(mention_id : str,update_body : verbatims_list_update,db : Session):
    data = Verbatims.get_By_Id(mention_id=mention_id,db=db)
    ref = {"virality" : "virality_altered","sentiment" : "sentiment_altered","severity":"severity_altered","theme":"theme_altered" }
    update_body = dict(update_body)
    temp = data
    temp = temp.__dict__
    for i in update_body:
        if update_body[i] != "" and temp[ref[i]] != True:
            if i == "virality":
                res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
                res.virality = update_body[i]
                res.virality_altered = True
            elif i == "sentiment":
                res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
                res.sentiment = update_body[i]
                res.sentiment_altered = True
            elif i == "severity":
                res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
                res.severity = update_body[i]
                res.severity_altered = True
            else:
                res = db.query(Verbatims_List).filter_by(mention_id = mention_id).first()
                res.theme = update_body[i]
                res.theme_altered = True
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
