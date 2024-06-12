from crud.crud_live_verbatims_list import Live_Verbatims
from models import live_verbatims_list
from http.client import HTTPException
from schemas.verbatims_list_schema import verbatims_filters
from database.session import SessionLocal,engine


async def get_data():
    db = SessionLocal()
    data = Live_Verbatims.get_all(db=db)
    db.close()
    return data


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
