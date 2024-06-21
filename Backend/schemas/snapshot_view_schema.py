from pydantic import BaseModel # type: ignore
from typing import Dict, List,Optional

class Counts(BaseModel):
    High: int
    Medium: int
    Low: int

class SentimentCounts(BaseModel):
    Positive: int
    Negative: int
    Neutral:int


class CountryData(BaseModel):
    country: str
    virality_counts: Optional[Counts] = None
    severity_counts: Optional[Counts] = None
    sentiment_counts: Optional[SentimentCounts] = None


class CountryAggregatedData(BaseModel):
    country: str
    High: int
    Medium: int
    Low: int

class AggregatedResponse(BaseModel):
    all:List[CountryAggregatedData]

class FilteredResponse(BaseModel):
    virality: Optional[List[CountryData]] = None
    severity: Optional[List[CountryData]] = None
    sentiment: Optional[List[CountryData]] = None


