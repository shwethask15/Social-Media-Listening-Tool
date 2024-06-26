from pydantic_settings import BaseSettings
from functools import lru_cache

class settings(BaseSettings):
    SECRET_KEY:str = "0f887850b2898e971380ac9334d00c8b0314e7c19630c54ecc1181c89213a4e1"
    ALGORITHM:str = "HS256"
    ACCESS_TOKEN_EXPIRE_TIME:int = 45

@lru_cache
def get_settings():
    return settings()