from pydantic import BaseModel
from typing import List


class GraphItem(BaseModel):
    two_digit_country_code:str
    country_name:str
    post_count: int

class Live_Verbatims_List_Create(BaseModel):
    mention_id: str 
    virality:str
    severity:str
    snippet:str
    impact_index:str
    all_combined_wt:float
    mention_updated_date:str
    sentiment:str
    brand:str
    three_digit_country_code:str
    country_name:str
    two_digit_country_code:str
    theme:str
    source:str
    originalURL:str
    url:str

class GraphItemResult(BaseModel):
    graph : List[GraphItem]
    Live_Verbatims_List : List[Live_Verbatims_List_Create]