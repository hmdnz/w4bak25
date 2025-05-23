from database import Base
from sqlalchemy import Column, Integer, String, Boolean, text, TIMESTAMP, func, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy import Date
from sqlalchemy.dialects.postgresql import UUID



class CarModel(Base):
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    # driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"))  # <-- Add this line
    model = Column(String, nullable=False)
    brand = Column(String, nullable=False)
    color = Column(String, nullable=False)
    c_type = Column(String, nullable=False)
    c_license = Column(String, unique=True, nullable=False)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"))

    owner = relationship("User", back_populates="cars")  # This line is crucial

    # driver = relationship("Driver", back_populates="cars")  # This line is crucial

model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "id": 1,
                "model": "Sedan",
                "brand": "Toyota",
                "color": "Red",
                "c_type": "SUV",
                "c_license": "ABC-123-XYZ",
                "user_id": "your-user-uuid-here"
            }
        }
    }

