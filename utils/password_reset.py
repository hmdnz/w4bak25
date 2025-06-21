# routes/password_reset.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import User
from utils.reset_token import create_reset_token
from utils.email import send_reset_email
from auth.schema import PasswordResetRequest
from database import get_db

router = APIRouter()

@router.post("/password-reset-request")
async def password_reset_request(payload: PasswordResetRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == payload.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User with this email does not exist.")

    token = create_reset_token({"sub":str( user.user_id)})
    await send_reset_email(user.email, token, user.name)
    return {"message": "Password reset email sent."}
