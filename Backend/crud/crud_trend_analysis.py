from crud.base import CRUDBase
from models.trend_analysis import Virality_Count,Sentiment_Count,Verbatim_Count,Severity_Count
from schemas.trend_analysis_schema import Virality_Count_Create,Verbatim_Count_Create,Sentiment_Count_Create,Severity_Count_Create

class CRUDVirality_Count(CRUDBase[Virality_Count,Virality_Count_Create]):
    ...

virality_count = CRUDVirality_Count(Virality_Count)

class CRUDVerbatim_Count(CRUDBase[Verbatim_Count,Verbatim_Count_Create]):
    ...
verbatim_count = CRUDVirality_Count(Verbatim_Count)

class CRUDSentiment_Count(CRUDBase[Sentiment_Count,Sentiment_Count_Create]):
    ...
sentiment_count = CRUDSentiment_Count(Sentiment_Count)

class CRUDSeverity_Count(CRUDBase[Severity_Count,Severity_Count_Create]):
    ...
severity_count = CRUDSeverity_Count(Severity_Count)
