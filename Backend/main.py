from fastapi import FastAPI
from Routes.verbatims_list_routes import router

app = FastAPI()

app.include_router(router,prefix="")