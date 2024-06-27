from fastapi import APIRouter,Depends
from database.session import get_db
from user_auth.auth_bearer import JWTBearer
from sqlalchemy.orm import Session
from crud.crud_trend_analysis import verbatim_count,virality_count,sentiment_count,severity_count
from Services.trend_analysis_services import get_trend_analysis1
router = APIRouter()

@router.get("/trend_analysis/")
async def get_trend_analysis(type : str,token : str = Depends(JWTBearer()),db : Session = Depends(get_db)):
    return await get_trend_analysis1(type=type,db=db)
        


