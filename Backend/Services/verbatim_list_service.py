from crud.crud_verbatims_list import Verbatims
from models import verbatims_list
from http.client import HTTPException
from schemas.verbatims_list_schema import verbatims_filters
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
