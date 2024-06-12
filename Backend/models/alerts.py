from sqlalchemy import Column,Integer,String,Float,Boolean # type: ignore

from database.base import Base


class Alert(Base):
    __tablename__ = "alerts"
    id = Column(Integer, primary_key=True, index=True)
    date = Column(String, nullable=False)
    originalUrl = Column(String, nullable=False)
    mention = Column(String, nullable=False)
    theme = Column(String, nullable=False)