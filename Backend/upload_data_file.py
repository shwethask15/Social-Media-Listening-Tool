from sqlalchemy.orm import Session # type: ignore
from crud import crud_verbatims_list,crud_live_verbatims_list,crud_alerts
from models import verbatims_list,live_verbatims_list,alerts,trend_analysis
from schemas import verbatims_list_schema,live_verbatims_list_schema,alerts_schema
from database.session import SessionLocal,engine
from database import base
import json

# verbatims_list.Base.metadata.create_all(bind=engine)
# live_verbatims_list.Base.metadata.create_all(bind=engine)
# alerts.Base.metadata.create_all(bind=engine)
db = SessionLocal()
trend_analysis.Base.metadata.create_all(bind=engine)


# with open("C:/Users/VenkateshAdinani/OneDrive - TheMathCompany Private Limited/Desktop/capstone/verbatimList.json",'r') as jsonfile:
#     data = jsonfile.read()
#     for i in json.loads(data):
#         #print(type(i))
#         db_data = verbatims_list.Verbatims_List(**i)
#         crud =crud_verbatims_list.CRUDVerbatims_list(verbatims_list_schema.Verbatims_List_create) 
#         crud.create(db=db,obj_in=db_data)

# db.close()

import random
data = db.query(trend_analysis.Verbatim_Count).all()
l = []
for i in data:
    # print(i.__dict__)
    temp = i.__dict__
    data_dict = {}
    data_dict["date"] = temp["date"]
    total_count = temp["count"]
    high = random.randrange(0,total_count-120)
    total_count -= high
    medium = random.randrange(0,total_count)
    total_count -= medium
    low = random.randrange(0,total_count)
    no_threat = total_count-low
    data_dict["high"] = high
    data_dict["medium"] = medium
    data_dict["low"] = low
    data_dict["no_threat"] = no_threat
    data_dict=trend_analysis.Severity_Count(**data_dict)    
    # db.add(data_dict)
    # db.commit()
    # db.refresh(data_dict)
    l.append(data_dict)
for i in l:
    db.add(i)
    db.commit()
    db.refresh(i)
db.close_all()
# high = random.randrange(0,200)
# medium = random.randrange(0,200)
# low = random.randrange(0,200)
# print(high,low,medium)
# date,month = random.randrange(1,21) , 4
# for i in range(3):
#     temp = date
#     for j in range(10):
#         dict = {}
#         high = random.randrange(150,300)
#         # medium = random.randrange(0,200)
#         # low = random.randrange(0,200)
#         if temp<10:
#             date1 = "24-0"+str(month)+"-0"+str(temp)
#         else:
#             date1 = "24-0"+str(month)+"-"+str(temp)
#         dict["date"] = date1
#         dict["count"] = high
#         # dict["negative"] = medium
#         # dict["neutral"] = low
#         data_upload = trend_analysis.Verbatim_Count(**dict)
#         db.add(data_upload)
#         db.commit()
#         db.refresh(data_upload)
#         temp+=1
#     month+=1


# with open("C:/Users/GaganaR/OneDrive - TheMathCompany Private Limited/Desktop/Live_Verbatims_List.json",'r') as jsonfile:
#     data = jsonfile.read()
#     for i in json.loads(data):
#         db_data = live_verbatims_list.Live_Verbatims_List(**i)
#         crud =crud_live_verbatims_list.CRUDLive_Verbatims_list(live_verbatims_list_schema.Live_Verbatims_List_Create)
#         crud.create(db=db,obj_in=db_data)

# db.close()



