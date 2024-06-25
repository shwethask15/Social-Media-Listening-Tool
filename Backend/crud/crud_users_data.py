from crud.base import CRUDBase
from models.users_data_model import User_Data
from schemas.user_data_schema import User_data_create
from sqlalchemy.orm import Session

class CRUDUsers(CRUDBase[User_Data,User_data_create]):
    ...

Users = CRUDUsers(User_Data)