from pydantic import BaseModel
from typing import List

class Verbatim_Count_Create(BaseModel):
    date : str
    count : int

class Sentiment_Count_Create(BaseModel):
    date : str
    positive : int
    negative : int
    neutral : int

class Severity_Count_Create(BaseModel):
    date : str
    high : int
    medium : int
    low : int
    no_threat : int

class Virality_Count_Create(BaseModel):
    date : str
    high : int
    medium : int
    low : int