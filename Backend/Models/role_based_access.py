from Database.base import Base
from sqlalchemy import Integer,String,ForeignKey,Column,Table
from sqlalchemy.orm import relationship

role_action_association = Table(
    "role_action_association",
    Base.metadata,
    Column("role_id", Integer, ForeignKey("role.id")),
    Column("action_id", Integer, ForeignKey("action.id")),
)

class Action(Base):
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,index=True,unique=True)

class Role(Base):
    id = Column(Integer,primary_key=True,index=True)
    name = Column(String,index=True,unique=True)
    action = relationship("Action",secondary=role_action_association,back_populates="role")

Action.role = relationship("Role",secondary=role_action_association,back_populates="action")