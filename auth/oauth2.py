from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from auth.schema import TokenData
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

# Define a timezone for GMT+1
GMT_PLUS_1 = timezone(timedelta(hours=1))


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Replace with your actual secret key
SECRET_KEY = "$2b$12$aOh6qwsifiUP77n149GgxuegmY0Ehj7eBERojefZQlKJIUqoXNFTK"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 75  # Token expiration time in minutes


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


def verify_access_token(token: str, credentials_exception):
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


def get_current_user(token: str = Depends(oauth2_scheme)):
    """
    Get the current user from the token.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_access_token(token, credentials_exception)
