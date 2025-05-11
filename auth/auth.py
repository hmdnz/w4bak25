from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from .schema import UserLogin, PostBase
from .utils import verify_password
from .models import User
from database import get_db
from auth import oauth2, schema, models
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
# from oauth2 import get_current_user

router = APIRouter(tags=['Authentication'])


@router.post('/login', status_code=status.HTTP_200_OK)
async def login(user_cred: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(User).filter(
        (User.email == user_cred.username) | (User.phone == user_cred.username)
    ).first()

    if not user or not verify_password(user_cred.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    # ✅ Return JWT with user_id in payload
    access_token = oauth2.create_access_token(data={"user_id": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/", status_code=status.HTTP_201_CREATED, response_model= schema.PostBase)
def test_auth(post:schema.PostBase, db: Session = Depends(get_db), get_current_user:int = Depends(oauth2.get_current_user)):
    
    
    new_post=models.Post(**post.model_dump())
    