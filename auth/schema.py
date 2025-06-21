from typing import Optional, Union

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

class UpdateUserModel(BaseModel):
    name: Union[str, None]  = Field(None)
    email: Union[EmailStr, None]  = Field(None)
    phone: Union[str, None]  = Field(None)
    date_of_birth: date = Field(None)
    about: str = Field(default="")
    updated_at: datetime = Field(None)

    class Config:
        arbitrary_types_allowed = True
        json_schema_extra = {
            "example": {
                "name": "updatedtest user",
                "email": "updatedtestuser@example.com",
                "phone": "23480904578",
                "date_of_birth": "2000-08-17 00:00",
                "about": "i am a wenyfour driver"
            }
        }

class ContactUs(BaseModel):
    id: str = Field(None)
    fullname: str = Field(...)
    phone: str = Field(...)
    email: EmailStr = Field(...)
    message: str = Field(...)

    class Config:
        arbitrary_types_allowed = True
        json_schema_extra = {
            "example": {
                "fullname":  "oliver yop",
                "email": "oliver@yopmail.com",
                "phone": "907766999000",
                "message": "A test message"
            }
        }


class Support(BaseModel):
    id: str = Field(None)
    email: EmailStr = Field(...)
    subject: str = Field(...)
    body: str = Field(...)

    class Config:
        arbitrary_types_allowed = True
        json_schema_extra = {
            "example": {
                "email": "oliver@yopmail.com",
                "subject": "A test subject",
                "body": "A test body"
            }
        }

class AddEmailModel(BaseModel):
    email: EmailStr = Field(...)


class PasswordResetModel(BaseModel):
    password: str = Field(...)
    new_password: str = Field(...)

class ForgotPasswordResetModel(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)

class UserLoginModel(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(...)


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    email: Union[EmailStr, None] = None


class PasswordResetRequest(BaseModel):
    email: EmailStr

class PasswordResetConfirm(BaseModel):
    token: str
    new_password: str
 
