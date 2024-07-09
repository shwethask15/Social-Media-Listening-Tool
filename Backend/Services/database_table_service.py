from fastapi import Depends
from database.session import SessionLocal,engine
from models.role_based_access import Role,Action,Base
from sqlalchemy.orm import Session

def init_db_with_data():
    db = SessionLocal()
    Base.metadata.create_all(bind=engine)
    role_admin = Role(name = "admin")
    role_user = Role(name = "user")
    db.add_all([role_admin,role_user])
    db.commit()

    action_view_live_verbatims = Action(name = "action_view_live_verbatims")
    action_view_trend_analysis = Action(name = "action_view_trend_analysis")
    action_view_snapshot = Action(name = "action_view_snapshot")
    action_view_verbatims_list = Action(name = "action_view_verbatims_list")
    action_update_verbatims_list = Action(name = "action_update_verbatims_list")

    db.add_all([action_update_verbatims_list,action_view_verbatims_list,action_view_snapshot,action_view_trend_analysis,action_view_live_verbatims])
    db.commit()

    role_admin.action.extend([action_update_verbatims_list,action_view_verbatims_list,action_view_snapshot,action_view_trend_analysis,action_view_live_verbatims])
    role_user.action.extend([action_view_verbatims_list,action_view_snapshot,action_view_trend_analysis,action_view_live_verbatims])
    db.commit()
    db.close()


    