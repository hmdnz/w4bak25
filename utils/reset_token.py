from datetime import datetime, timedelta
from jose import jwt, JWTError

RESET_SECRET_KEY = "#&$09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
RESET_TOKEN_EXPIRE_MINUTES = 30


def create_reset_token(data: dict):
    """
    Generate a time-limited password reset token with user's email.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=RESET_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, RESET_SECRET_KEY, algorithm=ALGORITHM)


def verify_reset_token(token: str):
    """
    Validate a reset token and return the email if valid.
    """
    try:
        payload = jwt.decode(token, RESET_SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None