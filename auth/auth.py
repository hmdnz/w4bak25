from fastapi import APIRouter, Depends, status, HTTPException, Response, Form
from sqlalchemy.orm import Session
from .schema import UserLogin
from .utils import verify_password, hash_password, send_email
from .models import User
from database import get_db
from auth import oauth2, schema, models
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from auth.oauth2 import create_access_token
from datetime import timedelta
from typing import Optional, List
from sqlalchemy.exc import IntegrityError


router = APIRouter(tags=['Authentication'])


@router.post('/login', status_code=status.HTTP_200_OK)
async def login(user_cred: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    
    identifier = user_cred.username
    password = user_cred.password
    
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
    access_token = oauth2.create_access_token(data={"user_id": str(user.user_id)})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post('/forgot-password', status_code=status.HTTP_200_OK)
async def forgot_password(email: str = Form(...), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == email).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User with this email not found")

    # Generate a unique token and associate it with the user (you might need a new model for this)
    reset_token = oauth2.create_access_token(data={"sub": user.email, "reset": True}, expires_delta=timedelta(minutes=60))
    # You would typically save this reset_token and user ID in your database

    # Construct the reset link
    reset_link = f"http://your-frontend-url/reset-password?token={reset_token}&user_id={str(user.id)}" # Replace with your actual frontend URL

    # Send the reset email
    # You'll need to adapt SendPasswordResetMail or create a new function
    # that uses the reset_link directly.
    # Example (you might need to adjust arguments):
    # send_reset_email(user.email, user.name, reset_link)
    print(f"Reset link sent to {user.email}: {reset_link}") # Replace with actual email sending

    return {"message": "Password reset link sent to your email"}

@router.get('/reset-password', status_code=status.HTTP_200_OK)
async def show_reset_password_form(token: str, user_id: str):
    # In a real application, you would verify the token and user_id here
    # (check if the token is valid, not expired, and associated with the user_id)
    # If valid, you would serve an HTML form for the user to enter a new password.
    return {"message": "Please enter your new password", "token": token, "user_id": user_id}

@router.post('/reset-password', status_code=status.HTTP_200_OK)
async def reset_password(token: str = Form(...), user_id: str = Form(...), new_password: str = Form(...), db: Session = Depends(get_db)):
    # Verify the token and user_id again
    # Retrieve the user from the database using the user_id
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Invalid user ID")

    # Here you would also check if the token is valid and hasn't expired
    # (This might involve querying a temporary token storage in your database)

    hashed_password = hash_password(new_password)
    user.password = hashed_password
    db.commit()
    return {"message": "Password reset successfully"}

# You would need to implement the 'send_reset_email' function or adapt
# 'SendPasswordResetMail' if you want to use the generated token directly
# in the frontend URL instead of the backend verifying it.

# Also, you'll need to decide how you want to handle token storage and verification.
# The above example provides a basic structure.

@router.post("/users", status_code=status.HTTP_201_CREATED,
          response_model=schema.UserResponse)
def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    hashed_pw = hash_password(user.password)
    
    print("Hashed password:", hashed_pw)  # For debugging
    
    user_data = user.model_dump()
    user_data['password']= hashed_pw
    
    new_user = models.User(**user_data)
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)

         # 🔐 Generate token
        access_token = create_access_token(data={"sub": str(new_user.user_id)})
        print("Bearer Token:", access_token)

        # 📤 Send welcome email after registration
        send_email(
            to_email=new_user.email,
            subject="Registration Successful",
            body=f"Dear {new_user.name},\n\nThank you for registering with us!"
        )

        return new_user
    
    except IntegrityError as e:
        db.rollback()
        if "users_email_key" in str(e.orig):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="User with this email already exists")
        elif "users_phone_key" in str(e.orig):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="User with this phone number already exists")
        elif "users_nin_key" in str(e.orig):
            raise HTTPException(status_code=status.HTTP_409_CONFLICT,
                                detail="User with this NIN already exists")
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not create user")

@router.get("/users", response_model=List[schema.UserResponse])
async def get_all_users(db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users