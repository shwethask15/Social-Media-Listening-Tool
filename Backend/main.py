from fastapi import FastAPI # type: ignore
from Routes.verbatims_list_routes import router as verbatims_list_router
from Routes.live_verbatims_list_routes import router as live_verbatims_list_router
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from Routes.snapshot_view_routes import router as snapshot_router
from Routes.user_auth_routes import router as user_auth_router
from models import users_data_model
from database.session import engine

# users_data_model.Base.metadata.create_all(bind = engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this list as necessary
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(verbatims_list_router,tags=["verbatims_list"],prefix="")
app.include_router(live_verbatims_list_router,tags=["live_verbatims_list_apis"],prefix="")
app.include_router(snapshot_router,tags=["snapshot_apis"],prefix="")
app.include_router(user_auth_router,tags=["user_auth"],prefix="")