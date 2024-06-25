from pydantic import BaseModel
import datetime

class User_data_create(BaseModel):
    user_name : str
    password : str
    mobile_no : int
    address : str

class Get_user_data(BaseModel):
    user_name : str
    mobile_no : str
    address : str
    class Config:
        orm_mode = True

class Token_Create(BaseModel):
    user_name : str
    access_token : str
    # refresh_token : str
    status : bool
    created_date : datetime.datetime

class Login_data(BaseModel):
    user_name : str
    password : str