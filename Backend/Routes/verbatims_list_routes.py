from fastapi import APIRouter
from Services.verbatim_list_service import get_data1,get_data_with_filters1
from schemas.verbatims_list_schema import verbatims_filters
from typing import Dict,List
router = APIRouter()

@router.get("/verbatim_list/")
async def get_data(q :str|None = None):
    try:
        return await get_data1()
    except Exception as e:
        return str(e)

@router.post("/verbatim_list/")
async def get_data_with_filters(q : verbatims_filters = None):
    try:
        return await get_data_with_filters1(q=q)
    except Exception as e:
        return str(e)

            