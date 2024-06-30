from typing import Optional,MutableMapping,List,Union
from datetime import datetime,timedelta

from user_auth.auth_bearer import JWTBearer
from sqlalchemy.orm.session import Session
import jwt
from user_auth.public_and_private_key_services import load_private_key
from models.users_data_model import User_Data
from user_auth.security import verify_password
from config.settings import get_settings

settings = get_settings()
PRIVATE_KEY = load_private_key()
# PUBLIC_KEY = PRIVATE_KEY.public_key
# SECRET_KEY = "0f887850b2898e971380ac9334d00c8b0314e7c19630c54ecc1181c89213a4e1"
ALGORITHM = "RS256"
# ACCESS_TOKEN_EXPIRE_TIME = 45
def authenticate(*,user_name: str,password : str,db : Session)->Optional[User_Data]:
    user = db.query(User_Data).filter(User_Data.user_name == user_name).first()
    user = user.__dict__
    print(user)
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
        expire = datetime.utcnow() + timedelta(days=settings.ACCESS_TOKEN_EXPIRE_TIME)
    data_encode.update({"exp":expire})
    encoded_token = jwt.encode(data_encode,PRIVATE_KEY,algorithm = ALGORITHM)
    return encoded_token
