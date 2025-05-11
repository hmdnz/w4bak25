from typing import Optional

from datetime import date, datetime

from pydantic import BaseModel, Field, EmailStr, AnyUrl


class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True
    rating: Optional[int] = None

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "title": "Sample Title",
                "content": "Sample content for the post.",
                "published": True,
                "rating": 5,
            }
        }


class Post(PostBase):
    id: int

    class Config:
        orm_mode = True
        schema_extra = {
            "example": {
                "id": 1,
                "title": "Sample Title",
                "content": "Sample content for the post.",
                "published": True,
                "created_at": "2023-10-01T12:00:00Z",
            }
        }


class UserCreate(BaseModel):
    name: str = Field(..., example="test user")
    email: EmailStr = Field(..., example="testuser@example.com")
    phone: str = Field(..., example="23480904578")
    nin: str = Field(..., example="300828566")
    date_of_birth: Optional[date] = Field(None, example="2000-01-01")
    about: Optional[str] = Field(
        "", example="A brief description about the user.")
    picture: Optional[AnyUrl] = Field(
        None, example="https://example.com/image.jpg")
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
