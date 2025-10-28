import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
# Ensure you are importing from jose
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from auth.schema import TokenData
from database import get_db
from auth.models import User

# Load from .env
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY", "defaultsecret")
ALGORITHM = (os.getenv("ALGORITHM") or "HS256").strip()
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES") or 30)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
GMT_PLUS_1 = timezone(timedelta(hours=1))

def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Create a JWT access token.
    """
    to_encode = data.copy()
    local_time = datetime.now(GMT_PLUS_1)

    if expires_delta:
        expire = (local_time + expires_delta).astimezone(timezone.utc)
    else:
        expire = (local_time + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
                     ).astimezone(timezone.utc)

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# -------------------------------------------------------------------------
# ✅ CRITICAL FIX: Ensure 'algorithms=[ALGORITHM]' is present in jwt.decode
# -------------------------------------------------------------------------
def decode_token_payload(token: str):
    """
    Decodes the JWT and returns the payload dictionary. Raises HTTPException on failure.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        # NOTE: This is the critical line. It MUST include algorithms=[ALGORITHM]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload

    except JWTError:
        # Catches signature mismatch, expiry, and other JOSE errors
        raise credentials_exception

# -------------------------------------------------------------------------

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Dependency function to get the currently authenticated User object.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    payload = decode_token_payload(token)

    user_id: str = payload.get("sub")
    if user_id is None:
        raise credentials_exception

    user = db.query(User).filter(User.user_id == user_id).first()
    if user is None:
        raise credentials_exception
    return user
