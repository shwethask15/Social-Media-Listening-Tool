import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import FastAPI, Depends, HTTPException,status
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from models.users_data_model import Token_Data
from database.session import SessionLocal
from models.users_data_model import Token_Data,Roles
from sqlalchemy.orm import Session
# from user_auth.auth import ACCESS_TOKEN_EXPIRE_TIME,ALGORITHM,SECRET_KEY
from config.settings import get_settings

settings = get_settings()

# SECRET_KEY = "0f887850b2898e971380ac9334d00c8b0314e7c19630c54ecc1181c89213a4e1"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_TIME = 45

def decodeJWT(jwtoken: str):
    try:
        # Decode and verify the token
        payload = jwt.decode(jwtoken, settings.SECRET_KEY, settings.ALGORITHM)
        return payload
    except InvalidTokenError:
        return None


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        # print(request.method.lower())
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not await self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            if not await self.has_access(request=request,jwtoken=credentials.credentials):
                raise HTTPException(status_code=405, detail="No Access to do this operation")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    async def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        db = SessionLocal()
        get_token_data = db.query(Token_Data).filter_by(access_token=jwtoken).first()
        db.close()
        # print(get_token_data.__dict__)
        if get_token_data.status == False:
            return None
        try:
            payload = decodeJWT(jwtoken=jwtoken)
            # print(payload)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid
    async def has_access(self,request : Request,jwtoken : str):
        method = request.method.lower()
        data = decodeJWT(jwtoken=jwtoken)
        db = SessionLocal()
        role_data = db.query(Roles).filter_by(role=data['role']).first()
        db.close()
        # print(role_data.__dict__)
        role_data = role_data.__dict__
        # print(role_data[method]==True)
        hasAccess = False
        if role_data[method] == True:
            hasAccess = True
        return hasAccess

jwt_bearer = JWTBearer()