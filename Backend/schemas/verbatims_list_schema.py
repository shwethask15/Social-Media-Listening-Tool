from pydantic import BaseModel # type: ignore
from typing import List

class Verbatims_List_create(BaseModel):
    mention_id : str
    datasource : str
    language : str
    date : str
    translated_snippet : str
    snippet : str
    country : str
    originalURL : str
    virality : str
    severity : str
    sentiment : str
    source : str
    brand : str
    theme : str
    profanity_filter : bool
    impact_index : str
    relevancy_filter : bool
    full_text : str
    theme_altered : bool
    virality_altered : bool
    severity_altered : bool
    sentiment_altered : bool
    count : int

class verbatims_filters(BaseModel):
    brand : List | None = None
    datasource : List | None = None
    country : List | None = None
    theme : List | None =None
    source : List | None = None
    sentiment : List | None = None
    virality : List | None = None
    severity : List | None = None
    profanity : List | None = None
    # relevancy_filter : bool | None = None
class verbatims_list_update(BaseModel):
    virality : str | None = None
    sentiment : str | None = None
    severity : str | None = None
    theme : str | None = None