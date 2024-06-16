from fastapi import FastAPI # type: ignore
from Routes.verbatims_list_routes import router as verbatims_list_router
from Routes.live_verbatims_list_routes import router as live_verbatims_list_router
from fastapi.middleware.cors import CORSMiddleware # type: ignore
from Routes.snapshot_view_routes import router as snapshot_router

app = FastAPI()

app.add_middleware(CORSMiddleware,allow_origins=['*'])

app.include_router(verbatims_list_router,prefix="")
app.include_router(live_verbatims_list_router,prefix="")
app.include_router(snapshot_router,prefix="")