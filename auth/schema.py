from typing import Optional

from datetime import date, datetime

from pydantic import BaseModel, Field, EmailStr, AnyUrl

import uuid  # Import the uuid module




class UserCreate(BaseModel):
    name: str = Field(..., example="test user")
    email: EmailStr = Field(..., example="testuser@example.com")
    phone: str = Field(..., example="23480904578")
    nin: str = Field(..., example="300828566")
    date_of_birth: Optional[date] = Field(None, example="2000-01-01")
    about: Optional[str] = Field(
        "", example="A brief description about the user.")
    # picture: Optional[AnyUrl] = Field(
        # None, example="https://example.com/image.jpg")
    password: str = Field(..., min_length=8, example="securepassword")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "test user",
                "email": "testuser@example.com",
                "phone": "23480904578",
                "nin": "300828566",
                "date_of_birth": "2000-01-01",
                "about": "A brief description about the user.",
                "picture": "https://example.com/image.jpg",
                "password": "securepassword",
            }
        }


class UserResponse(UserCreate):
    user_id: uuid.UUID  # Explicitly define the type of id
    name: str = Field(..., example="test user")
    email: EmailStr = Field(..., example="testuser@example.com")
    phone: str = Field(..., example="23480904578")
    nin: str = Field(..., example="300828566")

    picture: Optional[AnyUrl] = Field(
        None, example="https://example.com/image.jpg")

    class Config:
        json_schema_extra = {
            "example": {
                "name": "test user",
                "email": "testuser@example.com",
                "phone": "23480904578",
                "nin": "300828566",
                "picture": "https://example.com/image.jpg",

            }
        }

class UserLogin(BaseModel):
    identifier: str = Field(..., example="testuser@example.com or 23480904578")
    password: str = Field(..., min_length=8, example="securepassword")

class Config:
        json_schema_extra = {
            "example": {
                "identifier": "john or 09012345678",
                "email": "johnnygo@example.com"
                
            }
        }
        
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None    