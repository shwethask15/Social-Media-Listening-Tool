from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional,Union
from database.session import get_db
from schemas.snapshot_view_schema import AggregatedResponse, FilteredResponse
from Services.snapshot_view_service import  VerbatimService
from user_auth.auth_bearer import JWTBearer
router = APIRouter()

    
@router.get("/analytics/snapshot_view/{filter_name}", response_model=Union[AggregatedResponse, FilteredResponse])
async def get_aggregated_verbatims(filter_name: str,token : str = Depends(JWTBearer()), db: Session = Depends(get_db)):
    """
    Endpoint to retrieve aggregated counts of all, virality, severity, and sentiment for each country.
    """
    valid_filters = ["all","virality","severity","sentiment"]
    if filter_name.lower() not in valid_filters:
        raise HTTPException(status_code=400, detail="Invalid filter name")
    
    verbatim_service = VerbatimService(db)
    data = verbatim_service.get_filtered_data(filter_name)
    if filter_name.lower()!="all":
         aggregated_data = verbatim_service.aggregate_counts(data, filter_by=filter_name)
         return aggregated_data
    else:
        aggregated_data = verbatim_service.aggregate_all_counts(data)
        return aggregated_data 