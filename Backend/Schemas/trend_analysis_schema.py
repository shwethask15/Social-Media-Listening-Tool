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

class virality_count_result(BaseModel):
    april : List[Virality_Count_Create]
    may : List[Virality_Count_Create]
    june : List[Virality_Count_Create]

class Verbatim_count_result(BaseModel):
    april : List[Verbatim_Count_Create]
    may : List[Verbatim_Count_Create]
    june : List[Verbatim_Count_Create]

class Severity_count_result(BaseModel):
    april : List[Severity_Count_Create]
    may : List[Severity_Count_Create]
    june : List[Severity_Count_Create]

class Sentiment_count_result(BaseModel):
    april : List[Sentiment_Count_Create]
    may : List[Sentiment_Count_Create]
    june : List[Sentiment_Count_Create]