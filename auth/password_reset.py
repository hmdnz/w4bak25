# routes/password_reset.py
from fastapi import APIRouter, HTTPException, Depends, status
from sqlalchemy.orm import Session
from .schema import PasswordResetRequest, PasswordResetConfirm
from .models import User 
from utils.reset_token import create_reset_token, verify_reset_token
from auth.utils import hash_password
from database import get_db


