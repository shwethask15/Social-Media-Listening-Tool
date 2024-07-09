from fastapi import APIRouter,Depends # type: ignore
from Services.verbatim_list_service import get_data1,get_data_with_filters1,get_data_by_mention_id1,advanced_filters_query
from schemas.verbatims_list_schema import verbatims_filters,verbatims_list_update,Verbatims_List_create
from typing import Dict,List
from database.session import get_db
from sqlalchemy.orm import Session # type: ignore
from user_auth.auth_bearer import JWTBearer
from datetime import datetime
from Services.websocket_service import manager
import asyncio
from sqlalchemy.orm import class_mapper

def model_to_dict(instance):
    return {c.key: getattr(instance, c.key) for c in class_mapper(instance.__class__).mapped_table.c}

router = APIRouter()

@router.get("/verbatims_list/",response_model=List[Verbatims_List_create])
async def get_data(query : str | None = None,token: str = Depends(JWTBearer(action="action_view_verbatims_list")),db : Session = Depends(get_db)):
    try:
        if query == None:
            return await get_data1(db=db)
        else:
            return await advanced_filters_query(query=query,db=db)
    except Exception as e:
        return str(e)

@router.post("/verbatims_list/",response_model=List[Verbatims_List_create])
async def get_data_with_filters(q : verbatims_filters = None,token: str = Depends(JWTBearer(action="action_view_verbatims_list")), db : Session = Depends(get_db)):
    try:
        return await get_data_with_filters1(q=q,db=db)
    except Exception as e:
        return str(e)
    
@router.put("/verbatims_list/{mention_id}",response_model=Verbatims_List_create)
async def update_data(mention_id: str, update_body: verbatims_list_update, token: str = Depends(JWTBearer(action="action_update_verbatims_list")), db: Session = Depends(get_db)):
    try:
        # data = 
        # temp = model_to_dict(data)
        # temp["updated_at"] = datetime.now().isoformat()
        # temp["url"] = temp["originalURL"]
        # notification_message = {"type": "notification", "data": [temp]}
        # for connection in manager.connections:
        #     await connection.send_json(notification_message)
        return await get_data_by_mention_id1(mention_id=mention_id, update_body=update_body, db=db)
    except Exception as e:
        print(e)
        return str(e)

