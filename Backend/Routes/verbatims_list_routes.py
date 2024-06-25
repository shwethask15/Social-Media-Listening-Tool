from fastapi import APIRouter,Depends
from Services.verbatim_list_service import get_data1,get_data_with_filters1,get_data_by_mention_id1
from schemas.verbatims_list_schema import verbatims_filters,verbatims_list_update,Verbatims_List_create
from typing import Dict,List
from database.session import get_db
from user_auth.auth_bearer import JWTBearer
from sqlalchemy.orm import Session
router = APIRouter()

@router.get("/verbatim_list/",response_model=List[Verbatims_List_create])
async def get_data(token : str = Depends(JWTBearer()),db : Session = Depends(get_db)):
    try:
        return await get_data1(db=db)
    except Exception as e:
        return str(e)

@router.post("/verbatim_list/",response_model=List[Verbatims_List_create])
async def get_data_with_filters(token : str = Depends(JWTBearer()),q : verbatims_filters = None, db : Session = Depends(get_db)):
    try:
        return await get_data_with_filters1(q=q,db=db)
    except Exception as e:
        return str(e)
    
@router.post("/verbatim_list/{mention_id}")
async def update_data(mention_id : str, update_body : verbatims_list_update,token : str = Depends(JWTBearer()), db: Session = Depends(get_db)):
    try:
        return await get_data_by_mention_id1(mention_id=mention_id,update_body=update_body,db=db)
    except Exception as e:
        return str(e)

