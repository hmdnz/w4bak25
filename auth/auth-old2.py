from fastapi import APIRouter, BackgroundTasks, Depends, status, HTTPException, Form
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import timedelta
from typing import Optional, List

from fastapi.security import OAuth2PasswordRequestForm
from auth import oauth2, schema, models
from auth.oauth2 import create_access_token

from database import get_db
from .models import User # Required for login (if User is in .models)

# Utility functions
from .utils import verify_password
from auth.utils import hash_password 
from utils.email import send_email 

# Schemas
from .schema import PasswordResetRequest, PasswordResetConfirm 

# --- CRITICAL FIX: Define the missing constant ---
# ⚠️ IMPORTANT: REPLACE THIS WITH YOUR ACTUAL FRONTEND URL
FRONTEND_BASE_URL = "http://localhost:3000" 

router = APIRouter()


@router.post('/login', status_code=status.HTTP_200_OK)
async def login(user_cred: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    
    # Assuming 'User' is imported from '.models' or available via 'models.User'
    user = db.query(models.User).filter(
        (models.User.email == user_cred.username) | (models.User.phone == user_cred.username)
    ).first()

    if not user or not verify_password(user_cred.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"}
        )
    
    access_token = oauth2.create_access_token(data={"sub": str(user.user_id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/register_users", status_code=status.HTTP_201_CREATED,
             response_model=schema.UserResponse)
def create_user(
    background_tasks: BackgroundTasks, 
    user: schema.UserCreate,
    db: Session = Depends(get_db)
):
    hashed_pw = hash_password(user.password)
    user_data = user.model_dump()
    user_data['password'] = hashed_pw

    new_user = models.User(**user_data)
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)

        access_token = create_access_token(data={"user_id": str(new_user.user_id)})
        print("Bearer Token:", access_token)

        # 📤 Send email using HTML template
        background_tasks.add_task(
            send_email,
            to_email=new_user.email,
            subject="Welcome to Weny4!",
            template_name="ConfirmEmailTemplate.html",
            context={"name": new_user.name}
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

@router.post('/forgot-password', status_code=status.HTTP_200_OK)
async def forgot_password(
    background_tasks: BackgroundTasks, 
    email: str = Form(..., description="Email address for password reset"), 
    db: Session = Depends(get_db)
):
    """
    Initiates the password reset process by sending an email with a reset token.
    """
    user = db.query(models.User).filter(models.User.email == email).first()
    
    # 1. User check
    if not user:
        # Security practice: return a generic success message
        return {"message": "If an account with that email exists, a password reset link has been sent."}

    # 2. Generate Reset Token (JWT)
    reset_token = oauth2.create_access_token(
        data={"sub": str(user.user_id), "reset": True}, 
        expires_delta=timedelta(minutes=15) # Token will expire after 15 minutes
    )

    # 3. Construct the Reset Link
    # This line now works because FRONTEND_BASE_URL is defined above.
    reset_link = f"{FRONTEND_BASE_URL}/reset-password?token={reset_token}" 

    # 4. Send Email asynchronously
    background_tasks.add_task(
        send_email,
        to_email=user.email,
        subject="Password Reset Request",
        # Use the HTML template from your templates folder
        template_name="ForgotPasswordTemplate.html", 
        context={
            "name": user.name, 
            "reset_link": reset_link
        }
    )

    return {"message": "If an account with that email exists, a password reset link has been sent."}
