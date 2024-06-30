from sqlalchemy.orm import Session # type: ignore
from crud import crud_verbatims_list,crud_live_verbatims_list
from models import verbatims_list,live_verbatims_list,trend_analysis
from schemas import verbatims_list_schema,live_verbatims_list_schema
from database.session import SessionLocal,engine
from database import base
import json
from models import users_data_model
from user_auth.security import get_password_hash
# verbatims_list.Base.metadata.create_all(bind=engine)
# live_verbatims_list.Base.metadata.create_all(bind=engine)
# alerts.Base.metadata.create_all(bind=engine)
db = SessionLocal()
# trend_analysis.Base.metadata.create_all(bind=engine)
# users_data_model.Base.metadata.create_all(bind=engine)

# roles = [
#     {"role" : "admin","get" : True,"post" : True,"put" : True,"patch" : True},
#     {"role" : "user","get" : True,"post" : True,"put" : False,"patch" : False}
# ]
# for i in roles:
#     data = users_data_model.Roles(**i)
#     db.add(data)
#     db.commit()
#     db.refresh(data)
# db.close()

# admin_data = [
#     {"user_name":"venkatesh@gmail.com","password":get_password_hash("abcdef@123"),"mobile_no":9988776655,"address":"bengaluru","role":"admin"},
#     {"user_name":"admin@gmail.com","password":get_password_hash("wuvxyz@123"),"mobile_no":9876543277,"address":"bengaluru","role":"admin"}
# ]
# for i in admin_data:
#     data = users_data_model.User_Data(**i)
#     db.add(data)
#     db.commit()
#     db.refresh(data)
# db.close()


# with open("C:/Users/VenkateshAdinani/OneDrive - TheMathCompany Private Limited/Desktop/capstone/verbatimList.json",'r') as jsonfile:
#     data = jsonfile.read()
#     for i in json.loads(data):
#         #print(type(i))
#         db_data = verbatims_list.Verbatims_List(**i)
#         crud =crud_verbatims_list.CRUDVerbatims_list(verbatims_list_schema.Verbatims_List_create) 
#         crud.create(db=db,obj_in=db_data)

# db.close()

# import random
# data = db.query(trend_analysis.Verbatim_Count).all()
# l = []
# for i in data:
#     # print(i.__dict__)
#     temp = i.__dict__
#     data_dict = {}
#     data_dict["date"] = temp["date"]
#     total_count = temp["count"]
#     high = random.randrange(0,total_count-50)
#     total_count -= high
#     medium = random.randrange(0,total_count)
#     low = total_count-medium
#     data_dict["positive"] = high
#     data_dict["negative"] = medium
#     data_dict["neutral"] = low
#     # data_dict["no_threat"] = no_threat
#     data_dict=trend_analysis.Sentiment_Count(**data_dict)    
#     # db.add(data_dict)
#     # db.commit()
#     # db.refresh(data_dict)
#     l.append(data_dict)
# for i in l:
#     db.add(i)
#     db.commit()
#     db.refresh(i)
# db.close_all()
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


# with open("C:/Users/VenkateshAdinani/OneDrive - TheMathCompany Private Limited/Desktop/capstone/Live_Verbatims_List.json",'r') as jsonfile:
#     data = jsonfile.read()
#     for i in json.loads(data):
#         db_data = live_verbatims_list.Live_Verbatims_List(**i)
#         crud =crud_live_verbatims_list.CRUDLive_Verbatims_list(live_verbatims_list_schema.Live_Verbatims_List_Create)
#         crud.create(db=db,obj_in=db_data)

# db.close()

crud = crud_verbatims_list.Verbatims

data = crud.get_all(db=db)

print(data)

db.close()



