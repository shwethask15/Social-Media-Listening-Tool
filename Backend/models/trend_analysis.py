from sqlalchemy import Column,Integer,String,Boolean

from database.base import Base

class Verbatim_Count(Base):
    date = Column(String,primary_key=True)
    count = Column(Integer,nullable=False)

class Sentiment_Count(Base):
    date = Column(String,primary_key=True)
    positive = Column(Integer,nullable=False)
    negative = Column(Integer,nullable=False)
    neutral = Column(Integer,nullable=False)

class Severity_Count(Base):
    date = Column(String,primary_key=True)
    high = Column(Integer,nullable=False)
    medium = Column(Integer,nullable=False)
    low = Column(Integer,nullable=False)
    no_threat = Column(Integer,nullable=False)

class Virality_Count(Base):
    date = Column(String,primary_key=True)
    high = Column(Integer,nullable=False)
    medium = Column(Integer,nullable=False)
    low = Column(Integer,nullable=False)