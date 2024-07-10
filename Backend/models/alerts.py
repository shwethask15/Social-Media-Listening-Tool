from sqlalchemy import Column,Integer,String,Boolean, TIMESTAMP, func
from database.base import Base

class verbatims_list_audit(Base):
    __tablename__="verbatims_list_audit"
    audit_id=Column(Integer,primary_key=True,index=True)
    mention_id = Column(String,primary_key=True,index=True)
    datasource = Column(String,nullable=False)
    language = Column(String, nullable=True)
    updated_at = Column(String,nullable=False)
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
    modified_at=Column(TIMESTAMP, server_default=func.now(), onupdate=func.current_timestamp())
    

    def serialize(self):
        return {
            'audit_id': self.audit_id,
            'mention_id': self.mention_id,
            'datasource': self.datasource,
            'language': self.language,
            'updated_at': self.updated_at,
            'translated_snippet': self.translated_snippet,
            'snippet': self.snippet,
            'country': self.country,
            'originalURL': self.originalURL,
            'virality': self.virality,
            'severity': self.severity,
            'sentiment': self.sentiment,
            'source': self.source,
            'brand': self.brand,
            'theme': self.theme,
            'profanity_filter': self.profanity_filter,
            'impact_index': self.impact_index,
            'relevancy_filter': self.relevancy_filter,
            'full_text': self.full_text,
            'theme_altered': self.theme_altered,
            'virality_altered': self.virality_altered,
            'severity_altered': self.severity_altered,
            'sentiment_altered': self.sentiment_altered,
            'count': self.count,
            'modified_at': self.modified_at.isoformat()  # Example serialization of timestamp
        }