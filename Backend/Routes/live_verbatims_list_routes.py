from fastapi import APIRouter # type: ignore
from Services.live_verbatims_list_service import get_data
from schemas.verbatims_list_schema import verbatims_filters
from typing import Dict,List
router = APIRouter()

@router.get("/live_verbatims_list/")
async def get_live_verbatims_list():
    try:
        return await get_data()
    except Exception as e:
        return str(e)

# @router.post("/verbatim_list/")
# async def get_data_with_filters(q : verbatims_filters = None):
#     try:
#         return await get_data_with_filters1(q=q)
#     except Exception as e:
#         return str(e)

            