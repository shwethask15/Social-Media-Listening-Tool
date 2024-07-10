from Crud.base import CRUDBase
from Models.live_verbatims_list import Live_Verbatims_List
from Schemas.live_verbatims_list_schema import Live_Verbatims_List_Create

class CRUDLive_Verbatims_list(CRUDBase[Live_Verbatims_List,Live_Verbatims_List_Create]):
    ...

Live_Verbatims = CRUDLive_Verbatims_list(Live_Verbatims_List)