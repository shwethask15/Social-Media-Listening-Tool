from fastapi import FastAPI # type: ignore
from Routes.verbatims_list_routes import router
from Routes.live_verbatims_list_routes import router

app = FastAPI()

app.include_router(router,prefix="")