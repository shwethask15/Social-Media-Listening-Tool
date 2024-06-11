from pydantic import BaseModel

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
    brand : str | None = None
    datasource : str | None = None
    country : str | None = None
    theme : str | None =None
    source : str | None = None
    sentiment : str | None = None
    virality : str | None = None
    severity : str | None = None
    profanity : str | None = None
    # relevancy_filter : bool | None = None
