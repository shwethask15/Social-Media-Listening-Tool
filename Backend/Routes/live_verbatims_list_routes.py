from fastapi import APIRouter,Depends, HTTPException # type: ignore
from sqlalchemy.orm import Session 
from Services.live_verbatims_list_service import get_data,get_graph_data
from schemas.verbatims_list_schema import verbatims_filters
from schemas.live_verbatims_list_schema import GraphItem,GraphItemResult,Live_Verbatims_List_Create
from typing import Dict,List,Union
from database.session import get_db

router = APIRouter()

# @router.get("/live_verbatims_list/")
# async def get_live_verbatims_list(db: Session = Depends(get_db)):
#     try:
#         return await get_data(db = db)
#     except Exception as e:
#         return str(e)

# @router.post("/verbatim_list/")
# async def get_data_with_filters(q : verbatims_filters = None):
#     try:
#         return await get_data_with_filters1(q=q)
#     except Exception as e:
#         return str(e)


# Define a function to get both verbatims and graph data
async def get_live_data(db: Session):#get the dependency function
    try:
        # Get verbatims data
      #  Live_verbatims = await crud.get_verbatims(db=db)
      Live_verbatims=await get_data(db = db)
      print(Live_verbatims[0].__dict__)

        # Get graph data
      graph = await get_graph_data(db=db)
      result= GraphItemResult(
            graph=graph,
            Live_Verbatims_List=Live_verbatims)
      return result
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# Define route to fetch both verbatims and graph data
@router.get("/Live_Verbatims_List/",response_model=GraphItemResult)
async def get_live_data_endpoint(db: Session = Depends(get_db)):
    return await get_live_data(db=db)
