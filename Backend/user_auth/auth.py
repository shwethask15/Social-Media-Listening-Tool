from typing import Optional,MutableMapping,List,Union
from datetime import datetime,timedelta

from user_auth.auth_bearer import JWTBearer
from sqlalchemy.orm.session import Session
import jwt

from models.users_data_model import User_Data
from user_auth.security import verify_password

SECRET_KEY = "0f887850b2898e971380ac9334d00c8b0314e7c19630c54ecc1181c89213a4e1"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_TIME = 45
def authenticate(*,user_name: str,password : str,db : Session)->Optional[User_Data]:
    user = db.query(User_Data).filter(User_Data.user_name == user_name).first()
    user = user.__dict__
    # print(user.password)
    if not user:
        return None
    if not verify_password(password,user["password"]):
        return None
    return user

def create_token(data : dict,expires_delta : timedelta = None):
    data_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_TIME)
    data_encode.update({"exp":expire})
    encoded_token = jwt.encode(data_encode,SECRET_KEY,algorithm = ALGORITHM)
    return encoded_token
