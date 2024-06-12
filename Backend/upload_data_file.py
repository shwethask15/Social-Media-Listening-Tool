from sqlalchemy.orm import Session # type: ignore
from crud import crud_verbatims_list,crud_live_verbatims_list,crud_alerts
from models import verbatims_list,live_verbatims_list,alerts
from schemas import verbatims_list_schema,live_verbatims_list_schema,alerts_schema
from database.session import SessionLocal,engine
from database import base
import json

verbatims_list.Base.metadata.create_all(bind=engine)
live_verbatims_list.Base.metadata.create_all(bind=engine)
alerts.Base.metadata.create_all(bind=engine)
db = SessionLocal()


# with open("C:/Users/VenkateshAdinani/OneDrive - TheMathCompany Private Limited/Desktop/capstone/verbatimList.json",'r') as jsonfile:
#     data = jsonfile.read()
#     for i in json.loads(data):
#         #print(type(i))
#         db_data = verbatims_list.Verbatims_List(**i)
#         crud =crud_verbatims_list.CRUDVerbatims_list(verbatims_list_schema.Verbatims_List_create) 
#         crud.create(db=db,obj_in=db_data)

# db.close()

with open("C:/Users/GaganaR/OneDrive - TheMathCompany Private Limited/Desktop/Live_Verbatims_List.json",'r') as jsonfile:
    data = jsonfile.read()
    for i in json.loads(data):
        db_data = live_verbatims_list.Live_Verbatims_List(**i)
        crud =crud_live_verbatims_list.CRUDLive_Verbatims_list(live_verbatims_list_schema.Live_Verbatims_List_Create)
        crud.create(db=db,obj_in=db_data)

db.close()



