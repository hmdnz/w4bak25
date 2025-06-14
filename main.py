from fastapi import FastAPI, HTTPException, Response, status, Depends, APIRouter
from fastapi.params import Body
from datetime import date
import psycopg2
from psycopg2.extras import RealDictCursor
# from database import get_db

from pydantic import BaseModel
from typing import Optional, List

# from fastapi.middleware.cors import CORSMiddleware
import time
from sqlalchemy.orm import Session
from auth import  models , schema, oauth2, utils
# from auth.models import User  # Import the User model from models.py
from auth.schema import UserCreate  # Assuming you have a UserCreate Pydantic schema
# from auth.auth import router as auth_router
# from cars import routers as car
# from auth.utils import hash_password, send_email

from database import engine, SessionLocal, get_db, Base


from auth.auth import router as auth_router
from cars.routers import router as car_router   # Ensure you are using the correct import for the router
# from drivers.routers import router as driver_router

from sqlalchemy.exc import IntegrityError

from cars.models import *
from auth.models import *
# from drivers.models import *

# from models import User, Driver

print("🔌 SQLAlchemy connected to:", engine.url)

models.Base.metadata.create_all(bind=engine)

router= APIRouter()

app = FastAPI()

app.include_router(auth_router, tags=["Authentication"])
app.include_router(car_router, tags=["Cars"])
# app.include_router(driver_router, tags=["Drivers"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()




@app.get("/")
def root():
    return {"message": "Helllo friend, the API is running!"}


# @app.get("/posts")
# async def get_all_post(db: Session = Depends(get_db)):

#     posts = db.query(models.Post).all()

#     return posts


# @app.post("/createpost", status_code=status.HTTP_201_CREATED, response_model=schema.Post)
# def create_post(post: schema.PostBase, db: Session = Depends(get_db)):

#     new_post = models.Post(**post.model_dump())

#     db.add(new_post)
#     db.commit()
#     db.refresh(new_post)

#     return new_post


# @app.get("/posts/{id}")
# def get_post_by_id(id: int, db: Session = Depends(get_db), get_current_user:int = Depends(oauth2.get_current_user)):

#     post = db.query(models.Post).filter(models.Post.id == id).first()

#     if not post:

#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
#                             detail=f"Post with id {id} not found")

#     return {"post_detail": post}


# @app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
# def delete_post(id: int, db: Session = Depends(get_db), get_current_user:int = Depends(oauth2.get_current_user)):
#     """
#     Deletes a post by its ID.
#     Returns 204 if successful, 404 if not found.
#     """
#     post = db.query(models.Post).filter(models.Post.id == id).first()

#     if post is None:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Post with ID {id} does not exist"
#         )

#     db.delete(post)
#     db.commit()

#     return Response(status_code=status.HTTP_204_NO_CONTENT)


# @app.put("/posts/{id}")
# # Change UpdatePost to Updatepost here
# def update_post(id: int, post_data: schema.Post, db: Session = Depends(get_db), get_current_user:int = Depends(oauth2.get_current_user)):
#     """
#     Updates a post by its ID.
#     Returns 200 if successful, 404 if not found.
#     """

#     post_query = db.query(models.Post).filter(models.Post.id == id)
#     existing_post = post_query.first()
#     if not existing_post:
#         raise HTTPException(
#             status_code=status.HTTP_404_NOT_FOUND,
#             detail=f"Post with ID {id} does not exist"
#         )

#     post_query.update(post_data.model_dump(), synchronize_session=False)
#     db.commit()
#     # Return the updated post details
#     return {"data": post_query.first()}


# @app.post("/users", status_code=status.HTTP_201_CREATED,
#           response_model=schema.UserResponse)
# def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):

#     new_user = models.User(**user.model_dump())

#     db.add(new_user)
#     db.commit()
#     db.refresh(new_user)

#     return new_user

# @app.post("/users", status_code=status.HTTP_201_CREATED,
#           response_model=schema.UserResponse)
# def create_user(user: schema.UserCreate, db: Session = Depends(get_db)):
#     hashed_pw = hash_password(user.password)
    
#     print("Hashed password:", hashed_pw)  # For debugging
    
#     user_data = user.model_dump()
#     user_data['password']= hashed_pw
    
#     new_user = models.User(**user_data)
#     db.add(new_user)
#     try:
#         db.commit()
#         db.refresh(new_user)

#         # 📤 Send welcome email after registration
#         send_email(
#             to_email=new_user.email,
#             subject="Registration Successful",
#             body=f"Dear {new_user.name},\n\nThank you for registering with us!"
#         )

#         return new_user
    
#     except IntegrityError as e:
#         db.rollback()
#         if "users_email_key" in str(e.orig):
#             raise HTTPException(status_code=status.HTTP_409_CONFLICT,
#                                 detail="User with this email already exists")
#         elif "users_phone_key" in str(e.orig):
#             raise HTTPException(status_code=status.HTTP_409_CONFLICT,
#                                 detail="User with this phone number already exists")
#         elif "users_nin_key" in str(e.orig):
#             raise HTTPException(status_code=status.HTTP_409_CONFLICT,
#                                 detail="User with this NIN already exists")
#         else:
#             raise HTTPException(
#                 status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Could not create user")

# @app.get("/users", response_model=List[schema.UserResponse])
# async def get_all_users(db: Session = Depends(get_db)):
#     users = db.query(models.User).all()
#     return users