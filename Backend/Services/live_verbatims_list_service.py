from Crud.crud_live_verbatims_list import Live_Verbatims
from Models import live_verbatims_list
from http.client import HTTPException
from Schemas.verbatims_list_schema import verbatims_filters
from Schemas.live_verbatims_list_schema import GraphItem,Live_Verbatims_List_Create
from Database.session import SessionLocal,engine
from sqlalchemy.sql import select
from sqlalchemy.orm import Session
import asyncio
from typing import List


async def get_data(db:Session)-> Live_Verbatims_List_Create:
    data = Live_Verbatims.get_all(db=db)
    return  [Live_Verbatims_List_Create(**item.__dict__) for item in data]

async def get_graph_data(db:Session) -> List[GraphItem]:
    data = Live_Verbatims.get_all(db=db)
    ref = {}
    two_digit_country_code=[]
    for i in data:
        i = i.__dict__
        if i["country_name"] not in ref:
            ref[i["country_name"]] = 1
            two_digit_country_code.append(i["two_digit_country_code"])
        else:
            ref[i["country_name"]] += 1
    res =[]
    c = 0
    for i in ref:
        graph_data = {}
        graph_data["two_digit_country_code"] = two_digit_country_code[c]
        graph_data["country_name"] = i
        graph_data["post_count"] = ref[i]
        res.append(graph_data)
        c+=1
    return res
