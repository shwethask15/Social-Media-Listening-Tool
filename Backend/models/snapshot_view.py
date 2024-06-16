from sqlalchemy import Column,Integer,String,Boolean
from typing import Optional # type: ignore
from pydantic import BaseModel
from database.base import Base

class Snapshot_View(BaseModel):
    country: Optional[str]
    virality: Optional[str]
    severity: Optional[str]
    sentiment: Optional[str]