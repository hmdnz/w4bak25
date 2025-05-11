from database import Base
from sqlalchemy import Column, Integer, String, Boolean, text, TIMESTAMP, func
from sqlalchemy import Date
from sqlalchemy.dialects.postgresql import UUID


class User(Base):
    __tablename__ = "users_orm"  # Choose a suitable table name

    id = Column(UUID(as_uuid=True), primary_key=True, default=func.gen_random_uuid())
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=False)
    nin = Column(String, unique=True, nullable=False)
    date_of_birth = Column(Date, nullable=True)
    about = Column(String, default="")
    picture = Column(String, nullable=True)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
