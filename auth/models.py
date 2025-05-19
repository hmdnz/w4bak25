from database import Base
from sqlalchemy import Column, Integer, String, Boolean, text, TIMESTAMP, func, DateTime
from sqlalchemy import Date
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"  # for cloud db

    user_id = Column(UUID(as_uuid=True), primary_key=True,
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

    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    updated_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default=text('now()'))
    cars = relationship("CarModel", back_populates="owner")  # This line needs to be present

    # drivers = relationship("Driver", back_populates="user")
    
    
    
    model_config = {
        "json_schema_extra": {
            "example": {
                "name": "test user",
                "email": "testuser@example.com",
                "phone": "23480904578",
                "nin": "300828566",
                "password": "auth1234",
            }
        },
        "arbitrary_types_allowed": True,
    }