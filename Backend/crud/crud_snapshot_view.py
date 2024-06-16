# from crud.base import CRUDBase
# from models.snapshot_view import Snapshot_View
# from schemas.snapshot_view_schema import all,Sentiment

# class CRUDAll_views(CRUDBase[Snapshot_View,all]):
#     ...

# all_views = CRUDAll_views(Snapshot_View)



# class CRUDSentiment_views(CRUDBase[Snapshot_View,Sentiment]):
#     ...

# sentiment_views = CRUDSentiment_views(Snapshot_View)

from sqlalchemy.orm import Session
from models.verbatims_list import Verbatims_List  # Assuming you have a model named VerbatimsList

class CRUDSnapshotView:
    def get_all(self, db: Session):
        return db.query(Verbatims_List).all()

all_views = CRUDSnapshotView()