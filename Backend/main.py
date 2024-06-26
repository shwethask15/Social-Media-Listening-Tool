from fastapi import FastAPI # type: ignore
from Routes.verbatims_list_routes import router as verbatims_list_router
from Routes.live_verbatims_list_routes import router as live_verbatims_list_router
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from Routes.snapshot_view_routes import router as snapshot_router
from Routes.user_auth_routes import router as user_auth_router
from models import users_data_model
from models.users_data_model import Roles
from database.session import engine,SessionLocal
from user_auth.security import get_password_hash

# users_data_model.Base.metadata.create_all(bind = engine)
# db = SessionLocal()
# roles = [
#     {"role" : "admin","get" : True,"post" : True,"put" : True,"patch" : True},
#     {"role" : "user","get" : True,"post" : True,"put" : False,"patch" : False}
# ]
# for i in roles:
#     data = Roles(**i)
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
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this list as necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verbatims_list_router,tags=["verbatims_list"],prefix="")
app.include_router(live_verbatims_list_router,tags=["live_verbatims_list_apis"],prefix="")
app.include_router(snapshot_router,tags=["snapshot_apis"],prefix="")
app.include_router(user_auth_router,tags=["user_auth"],prefix="")

"""
user_data ={
  "user_name": "abcdef@gmail.com",
  "password": "abcdefg@123"
}
"""