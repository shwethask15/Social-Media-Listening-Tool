from fastapi import FastAPI # type: ignore
from Routes.verbatims_list_routes import router as verbatims_list_router
from Routes.live_verbatims_list_routes import router as live_verbatims_list_router

app = FastAPI()

app.include_router(verbatims_list_router,prefix="")
app.include_router(live_verbatims_list_router,prefix="")