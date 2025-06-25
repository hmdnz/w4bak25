# from fastapi import Depends, HTTPException, status
# from fastapi.security import OAuth2PasswordBearer
# from jose import jwt, JWTError
# import jwt  # ✅ This is from PyJWT

# from .models import User
# from database import get_db
# from sqlalchemy.orm import Session
# from datetime import datetime, timedelta, timezone
# from auth.schema import TokenData

# # Define a timezone for GMT+1
# GMT_PLUS_1 = timezone(timedelta(hours=1))


# oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# # Replace with your actual secret key
# SECRET_KEY = "my_super_secret_key_123"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 100 # Token expiration time in minutes

import os
from dotenv import load_dotenv
from datetime import datetime, timedelta, timezone
from jose import JWTError, jwt  # Or: from jwt import encode, decode if you're using PyJWT
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from auth.schema import TokenData
from database import get_db
from auth.models import User

# Load from .env
load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM").strip()
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

GMT_PLUS_1 = timezone(timedelta(hours=1))


def create_access_token(data: dict, expires_delta: timedelta = None):
    """
    Create a JWT access token.
    """
    print("UTC now:", datetime.now(timezone.utc))
    print("GMT+1 now:", datetime.now(timezone(timedelta(hours=1))))

    to_encode = data.copy()

    # Use GMT+1 as the base time
    local_time = datetime.now(GMT_PLUS_1)
    print("Local time (GMT+1):", local_time)
    # Calculate expiration from local time, then convert to UTC
    if expires_delta:
        expire = (local_time + expires_delta).astimezone(timezone.utc)
    else:
        expire = (local_time + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
                  ).astimezone(timezone.utc)

    # Update the payload with UTC-based expiration
    to_encode.update({"exp": expire})

    # Create the JWT
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    print("expire", expire)
    return encoded_jwt


# def verify_access_token(token: str, credentials_exception):
    """
    Verify the JWT token and return the payload.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        id: str = payload.get("user_id")
        if id is None:
            raise credentials_exception
        token_data = TokenData(id=id)
    except JWTError:
        raise credentials_exception
    return token_data

def verify_access_token(token: str, credentials_exception, db: Session) -> User:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        identifier: str = payload.get("sub")

        if identifier is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    # Query user from DB
    user = db.query(User).filter((User.email == identifier) | (User.nin == identifier)).first()
    if user is None:
        raise credentials_exception

    return user

# def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Get the current user from the token.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_access_token(token, credentials_exception)


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")  # ⬅️ this must match 'sub' from login
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = db.query(User).filter(User.user_id == user_id).first()
    if user is None:
        raise credentials_exception
    return user
