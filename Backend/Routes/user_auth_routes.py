from models.users_data_model import User_Data,Token_Data
from fastapi import APIRouter,Depends,HTTPException,status
from user_auth.security import get_password_hash
from schemas.user_data_schema import User_data_create,Token_Create,Login_data
from crud.crud_users_data import Users
from database.session import get_db,engine
import jwt
from sqlalchemy.orm import Session
from jwt.exceptions import InvalidTokenError
from user_auth.auth_bearer import JWTBearer
from user_auth.auth import create_token,authenticate
from datetime import datetime
from config.settings import get_settings

settings = get_settings()

router = APIRouter()

def get_user(username : str,db : Session):
    data = Users.get_all(db=db)
    print(data)
    for i in data:
        temp = i.__dict__
        if username == temp["user_name"]:
            return temp


@router.post("/signup/")
async def signup(user : User_data_create,db : Session = Depends(get_db)):
    user_exist = db.query(User_Data).filter_by(user_name = user.user_name).first()
    if user_exist:
        raise HTTPException(status_code=400,detail="user name already registered")
    user = dict(user)
    user["password"] = get_password_hash(user["password"])
    db_data = User_Data(**user)
    Users.create(db=db,obj_in=db_data)

@router.post("/login/")
async def login(data : Login_data,db : Session = Depends(get_db)):
    user = authenticate(user_name=data.user_name,password=data.password,db=db)
    # print(user)
    if not user:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate":"Bearer"}
        )
    access_token = create_token(data={"user_data":user["user_name"],"role":user["role"]})
    get_token_data = db.query(Token_Data).filter_by(access_token=access_token).first()
    if not get_token_data:
        token_db = Token_Data(user_name=user["user_name"],access_token=access_token,status=True)
        db.add(token_db)
        db.commit()
        db.refresh(token_db)
    else:
        get_token_data.status = True
        db.add(get_token_data)
        db.commit()
        db.refresh(token_db)
    return {"access_token":access_token,"token_type":"Bearer"}

@router.get("/users/me")
async def get(token : str = Depends(JWTBearer()),db : Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        data = jwt.decode(token,settings.SECRET_KEY,algorithms=[settings.ALGORITHM])
        user_name : str = data.get("user_data")
        if user_name is None:
            raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    user = get_user(user_name,db=db)
    if user is None:
        raise credentials_exception
    return user

@router.post('/logout')
def logout(dependencies=Depends(JWTBearer()), db: Session = Depends(get_db)):
    token=dependencies
    payload = jwt.decode(token, settings.SECRET_KEY, settings.ALGORITHM)
    user_id = payload['user_data']
    token_record = db.query(Token_Data).all()
    info=[]
    # print(token_record[0].__dict__)
    for record in token_record :
        print("record",record)
        if (datetime.now() - record.created_date).days >1:
            info.append(record.use)
    if info:
        existing_token = db.query(Token_Data).where(Token_Data.user_name.in_(info)).delete()
        db.commit()
        
    existing_token = db.query(Token_Data).filter(Token_Data.user_name == user_id, Token_Data.access_token==token).first()
    if existing_token:
        existing_token.status=False
        db.add(existing_token)
        db.commit()
        db.refresh(existing_token)
    return {"message":"Logout Successfully"}