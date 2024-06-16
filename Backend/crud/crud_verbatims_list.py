from crud.base import CRUDBase
from models.verbatims_list import Verbatims_List
from schemas.verbatims_list_schema import Verbatims_List_create
from sqlalchemy.orm import Session

class CRUDVerbatims_list(CRUDBase[Verbatims_List,Verbatims_List_create]):
    def get_By_Id(self,db : Session,*,mention_id)->Verbatims_List:
        return db.query(Verbatims_List).filter(Verbatims_List.mention_id == mention_id).first()

Verbatims = CRUDVerbatims_list(Verbatims_List)