from crud.base import CRUDBase
from models.verbatims_list import Verbatims_List
from schemas.verbatims_list_schema import Verbatims_List_create

class CRUDVerbatims_list(CRUDBase[Verbatims_List,Verbatims_List_create]):
    ...

Verbatims = CRUDVerbatims_list(Verbatims_List)