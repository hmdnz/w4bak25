from database import Base
from sqlalchemy import Column, Integer, String, Boolean, text, TIMESTAMP, func, DateTime
from sqlalchemy import Date
from sqlalchemy.dialects.postgresql import UUID


class Post(Base):
    __tablename__ = "posts_orm"

    id = Column(Integer, primary_key=True, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    published = Column(Boolean, server_default='TRUE', nullable=True)
    rating = Column(Integer, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))


class User(Base):
    __tablename__ = "users_orm"  # Choose a suitable table name

    id = Column(UUID(as_uuid=True), primary_key=True,
                default=func.gen_random_uuid())
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, unique=True, nullable=False)
    nin = Column(String, unique=True, nullable=False)
    date_of_birth = Column(Date, nullable=True)
    about = Column(String, default="")
    # picture = Column(String, nullable=True)  # Changed to String
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=False)

    # ✅ Explicitly named email verification token fields:
    # email_verification_token = Column(String, nullable=True, unique=True)
    # email_verification_token_generated_at = Column(DateTime(timezone=True), default=func.now())

    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))

# from datetime import datetime, date
# from typing import Union, Optional
# from pydantic import BaseModel, Field, EmailStr, AnyUrl

# class UserModel(BaseModel):
#     id: str = Field(None)
#     name: str = Field(...)
#     email: EmailStr = Field(...)
#     phone: str = Field(...)
#     nin: str = Field(...)
#     date_of_birth: Optional[date] = Field(None)
#     about: Optional[str] = Field(default="")
#     picture: Optional[AnyUrl] = Field(None)
#     password: str = Field(...)
#     is_active: bool = False
#     created_at: datetime = Field(None)
#     updated_at: datetime = Field(None)

#     class Config:
#         arbitrary_types_allowed = True
#         json_schema_extra = {
#             "example": {
#                 "name": "test user",
#                 "email": "testuser@example.com",
#                 "phone": "23480904578",
#                 "nin": "300828566",
#                 "password": "auth1234",
#             }
#         }


# class UpdateUserModel(BaseModel):
#     name: Union[str, None]  = Field(None)
#     email: Union[EmailStr, None]  = Field(None)
#     phone: Union[str, None]  = Field(None)
#     date_of_birth: date = Field(None)
#     about: str = Field(default="")
#     updated_at: datetime = Field(None)

#     class Config:
#         arbitrary_types_allowed = True
#         json_schema_extra = {
#             "example": {
#                 "name": "updatedtest user",
#                 "email": "updatedtestuser@example.com",
#                 "phone": "23480904578",
#                 "date_of_birth": "2000-08-17 00:00",
#                 "about": "i am a wenyfour driver"
#             }
#         }

# class ContactUs(BaseModel):
#     id: str = Field(None)
#     fullname: str = Field(...)
#     phone: str = Field(...)
#     email: EmailStr = Field(...)
#     message: str = Field(...)

#     class Config:
#         arbitrary_types_allowed = True
#         json_schema_extra = {
#             "example": {
#                 "fullname":  "oliver yop",
#                 "email": "oliver@yopmail.com",
#                 "phone": "907766999000",
#                 "message": "A test message"
#             }
#         }


# class Support(BaseModel):
#     id: str = Field(None)
#     email: EmailStr = Field(...)
#     subject: str = Field(...)
#     body: str = Field(...)

#     class Config:
#         arbitrary_types_allowed = True
#         json_schema_extra = {
#             "example": {
#                 "email": "oliver@yopmail.com",
#                 "subject": "A test subject",
#                 "body": "A test body"
#             }
#         }

# class AddEmailModel(BaseModel):
#     email: EmailStr = Field(...)


# class PasswordResetModel(BaseModel):
#     password: str = Field(...)
#     new_password: str = Field(...)

# class ForgotPasswordResetModel(BaseModel):
#     email: EmailStr = Field(...)
#     password: str = Field(...)

# class UserLoginModel(BaseModel):
#     email: EmailStr = Field(...)
#     password: str = Field(...)


# class Token(BaseModel):
#     access_token: str
#     token_type: str


# class TokenData(BaseModel):
#     email: Union[EmailStr, None] = None
