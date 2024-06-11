from pydantic import BaseModel # type: ignore

class Alert_Create(BaseModel):
    date: str
    originalUrl: str
    mention: str
    theme: str