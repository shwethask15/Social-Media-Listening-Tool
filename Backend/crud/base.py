from typing import Any,Dict,Generic,List,Optional,Type,TypeVar,Union
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.base import Base

ModelType = TypeVar("ModelType",bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType",bound=BaseModel)


class CRUDBase(Generic[ModelType,CreateSchemaType]):
    def __init__(self,model:Type[ModelType]):
        self.model = model

    def create(self,db:Session,*,obj_in:CreateSchemaType)->ModelType:
        db.add(obj_in)
        db.commit()
        db.refresh(obj_in)
        return obj_in
    def get_all(self,db : Session,*,skip:int = 0, limit:int = 100)->List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()
    
    