from sqlalchemy import Column,Integer,String,Boolean # type: ignore

from database.base import Base

class Verbatims_List(Base):
    mention_id = Column(String,primary_key=True,index=True)
    datasource = Column(String,nullable=False)
    language = Column(String, nullable=True)
    date = Column(String,nullable=False)
    translated_snippet = Column(String,nullable=False)
    snippet = Column(String,nullable=False)
    country = Column(String, nullable=True)
    originalURL = Column(String,nullable=False)
    virality = Column(String,nullable=False)
    severity = Column(String,nullable=False)
    sentiment = Column(String,nullable=False)
    source = Column(String,nullable=False)
    brand = Column(String,nullable=False)
    theme = Column(String,nullable=False)
    profanity_filter = Column(Boolean,nullable=False)
    impact_index = Column(String,nullable=True)
    relevancy_filter = Column(Boolean,nullable=False)
    full_text = Column(String,nullable=False)
    theme_altered = Column(Boolean,nullable=False)
    virality_altered = Column(Boolean,nullable=False)
    severity_altered = Column(Boolean,nullable=False)
    sentiment_altered = Column(Boolean,nullable=False)
    count = Column(Integer,nullable=False)


