from fastapi import APIRouter,Depends
from Services.verbatim_list_service import get_data1,get_data_with_filters1,get_data_by_mention_id1
from schemas.verbatims_list_schema import verbatims_filters,verbatims_list_update
from typing import Dict,List
from database.session import get_db
from sqlalchemy.orm import Session
router = APIRouter()



@router.get("/verbatim_list/")
async def get_data(q :str|None = None):
    try:
        return await get_data1()
    except Exception as e:
        return str(e)

@router.post("/verbatim_list/")
async def get_data_with_filters(q : verbatims_filters = None, db : Session = Depends(get_db)):
    try:
        return await get_data_with_filters1(q=q,db=db)
    except Exception as e:
        return str(e)

            