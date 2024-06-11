from sqlalchemy.orm import Session
from crud import crud_verbatims_list
from models import verbatims_list
from schemas import verbatims_list_schema
from database.session import SessionLocal,engine
from database import base
import json

verbatims_list.Base.metadata.create_all(bind=engine)
db = SessionLocal()


with open("C:/Users/VenkateshAdinani/OneDrive - TheMathCompany Private Limited/Desktop/capstone/verbatimList.json",'r') as jsonfile:
    data = jsonfile.read()
    for i in json.loads(data):
        #print(type(i))
        db_data = verbatims_list.Verbatims_List(**i)
        crud =crud_verbatims_list.CRUDVerbatims_list(verbatims_list_schema.Verbatims_List_create) 
        crud.create(db=db,obj_in=db_data)

db.close()
