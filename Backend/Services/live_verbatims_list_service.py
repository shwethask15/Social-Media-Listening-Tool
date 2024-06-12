from crud.crud_live_verbatims_list import Live_Verbatims
from models import live_verbatims_list
from http.client import HTTPException
from schemas.verbatims_list_schema import verbatims_filters
from schemas.live_verbatims_list_schema import GraphItem
from database.session import SessionLocal,engine
from sqlalchemy.orm import Session


async def get_data(db:Session):
    data = Live_Verbatims.get_all(db=db)
    return data

async def get_graph_data(db:Session) -> GraphItem:
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
        # graph_data = GraphItem
        # graph_data.two_digit_country_code = two_digit_country_code[c]
        # graph_data.country_name = i
        # graph_data.post_count = ref[i]
        graph_data = {}
        graph_data["two_digit_country_code"] = two_digit_country_code[c]
        graph_data["country_name"] = i
        graph_data["post_count"] = ref[i]
        res.append(graph_data)
        c+=1
    #print(res)
    # for i in res:
    #     print(dict(i))
    return res
# async def get_data_with_filters1(q : verbatims_filters):
#     db = SessionLocal()
#     data = Verbatims.get_all(db=db)
#     db.close()
#     d = {}
#     q= dict(q)
#     for i in q:
#         if q[i] != "string":
#             d[i] = q[i]
#     r = []
#     for i in data:
#         f = []
#         t = i.__dict__
#         for j in d:
#             if len(d[j])!= len(t[j]):
#                 t[j] = t[j][1:]
#             if d[j] == t[j]:
#                 f.append(True)
#             else:
#                 f.append(False)
#         if False not in f:
#             r.append(i)
#     return r
