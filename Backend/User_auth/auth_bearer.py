import jwt
from fastapi import FastAPI, Depends, HTTPException,status
from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from Models.users_data_model import Token_Data
from Database.session import SessionLocal
from Models.users_data_model import Token_Data,Roles
from sqlalchemy.orm import Session
from Config.settings import get_settings
from User_auth.public_and_private_key_services import load_public_key
from Models.role_based_access import Role,Action

settings = get_settings()

ALGORITHM = "RS256"
PUBLIC_KEY = load_public_key()

def decodeJWT(jwtoken: str):
    try:
        payload = jwt.decode(jwtoken,PUBLIC_KEY , ALGORITHM)
        return payload
    except Exception as e:
        return None


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True,action : str | None = None):
        self.action = action
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials:
            if not credentials.scheme == "Bearer":
                raise HTTPException(status_code=403, detail="Invalid authentication scheme.")
            if not await self.verify_jwt(credentials.credentials):
                raise HTTPException(status_code=403, detail="Invalid token or expired token.")
            if not await self.check_permissions(action = self.action,jwttoken=credentials.credentials):
                raise HTTPException(status_code=405, detail="No Access to do this operation")
            return credentials.credentials
        else:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

    async def verify_jwt(self, jwtoken: str) -> bool:
        isTokenValid: bool = False
        db = SessionLocal()
        get_token_data = db.query(Token_Data).filter_by(access_token=jwtoken).first()
        db.close()
        if get_token_data and get_token_data.status == False:
            return None
        try:
            payload = decodeJWT(jwtoken=jwtoken)
        except:
            payload = None
        if payload:
            isTokenValid = True
        return isTokenValid
    async def check_permissions(self,action: str,jwttoken : str):
        db = SessionLocal()
        # print(action)
        data = decodeJWT(jwtoken=jwttoken)
        action_obj = db.query(Action).filter(Action.name == action).first()
        if not action_obj:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="Action not found"
            )
        role_obj = db.query(Role).filter(Role.name == data["role"]).first()
        if role_obj and action_obj in role_obj.action:
            return True
        db.close()
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have permission to perform this action",
        )

jwt_bearer = JWTBearer()