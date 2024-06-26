from sqlalchemy import Column,Integer,String,Boolean,DateTime,BigInteger
import datetime
from database.base import Base

class User_Data(Base):
    user_name = Column(String,primary_key=True)
    password = Column(String,nullable=False)
    mobile_no = Column(BigInteger,nullable=False)
    address = Column(String,nullable=False)
    role = Column(String,nullable=False,default="user")

class Token_Data(Base):
    user_name = Column(String)
    access_token = Column(String,primary_key=True)
    # refresh_token = Column(String,nullable=False)
    status = Column(Boolean)
    created_date = Column(DateTime, default=datetime.datetime.now)

class Roles(Base):
    role = Column(String,primary_key=True)
    get = Column(Boolean)
    post = Column(Boolean)
    put = Column(Boolean)
    patch = Column(Boolean)