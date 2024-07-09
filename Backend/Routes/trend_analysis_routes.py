from fastapi import APIRouter,Depends
from database.session import get_db
from user_auth.auth_bearer import JWTBearer
from sqlalchemy.orm import Session
from crud.crud_trend_analysis import verbatim_count,virality_count,sentiment_count,severity_count
from Services.trend_analysis_services import get_trend_analysis1
from schemas.trend_analysis_schema import virality_count_result,Verbatim_count_result,Sentiment_count_result,Severity_count_result
from typing import Union
router = APIRouter()

@router.get("/trend_analysis/",response_model=Union[Severity_count_result,virality_count_result,Verbatim_count_result,Sentiment_count_result])
async def get_trend_analysis(type : str,token : str = Depends(JWTBearer(action="action_view_trend_analysis")),db : Session = Depends(get_db)):
    try:
        return await get_trend_analysis1(type=type,db=db)
    except Exception as e:
        return str(e)
        


