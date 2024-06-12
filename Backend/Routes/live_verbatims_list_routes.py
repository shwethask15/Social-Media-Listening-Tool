from fastapi import APIRouter,Depends # type: ignore
from sqlalchemy.orm import Session
from Services.live_verbatims_list_service import get_data
from schemas.verbatims_list_schema import verbatims_filters
from typing import Dict,List
from .verbatims_list_routes import get_db
router = APIRouter()

@router.get("/live_verbatims_list/")
async def get_live_verbatims_list(db: Session = Depends(get_db)):
    try:
        return await get_data(db = db)
    except Exception as e:
        return str(e)

# @router.post("/verbatim_list/")
# async def get_data_with_filters(q : verbatims_filters = None):
#     try:
#         return await get_data_with_filters1(q=q)
#     except Exception as e:
#         return str(e)

            