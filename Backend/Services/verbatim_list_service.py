from crud.crud_verbatims_list import Verbatims
from models import verbatims_list
from http.client import HTTPException
from schemas.verbatims_list_schema import verbatims_filters,verbatims_list_update
from database.session import SessionLocal,engine
from sqlalchemy.orm import Session


async def get_data1(db : Session):
    data = Verbatims.get_all(db=db)
    return data

async def get_data_with_filters1(q : verbatims_filters,db : Session):
    data = Verbatims.get_all(db=db)
    d = {}
    q= dict(q)
    for i in q:
        if q[i] != "string":
            d[i] = q[i]
    r = []
    print(d)
    for i in d["brand"]:
        for j in data:
            j = j.__dict__
            if i == j["brand"][1:]:
                r.append(j)
    print(len(d["datasource"]))
    for i in d["datasource"]:
        for j in r:
            if i != j["datasource"]:
                r.remove(j)
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
        print(i)
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
        if update_body[i] != "":
            print(i,update_body[i])
            print(temp[ref[i]])
    return data
