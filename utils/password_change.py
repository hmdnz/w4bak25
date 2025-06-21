from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import engine, SessionLocal, get_db
from models import User
from utils.hash_password import hash_password
from utils.reset_token import verify_reset_token
from auth.schema import PasswordResetConfirm
from sqlalchemy.exc import SQLAlchemyError


router = APIRouter()

@router.post("/password-reset-confirm")
async def password_reset_confirm(payload: PasswordResetConfirm, db: Session = Depends(get_db)):
    try:
        print("Received payload:", payload)
        payload_data = verify_reset_token(payload.token)
        print("Decoded payload data:", payload_data)

        if not payload_data or "sub" not in payload_data:
            print("Invalid token payload or 'sub' missing")
            raise HTTPException(status_code=400, detail="Invalid or expired token.")

        user_id = payload_data["sub"]
        print("User ID from token:", user_id)

        user = db.query(User).filter(User.user_id == user_id).first()
        if not user:
            print("User not found in DB")
            raise HTTPException(status_code=404, detail="User not found.")

        user.password = hash_password(payload.new_password)
        db.commit()
        print("Password updated successfully")

        return {"message": "Password has been successfully updated."}

    except HTTPException as http_err:
        print("HTTPException:", http_err.detail)
        raise
    except SQLAlchemyError as db_err:
        db.rollback()
        print("SQLAlchemyError:", db_err)
        raise HTTPException(status_code=500, detail="Database error.")
    except Exception as e:
        print("General Exception:", str(e))
        raise HTTPException(status_code=400, detail="Invalid or expired token.")
