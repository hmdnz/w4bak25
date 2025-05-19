from typing import Optional
from pydantic import BaseModel, Field
import uuid

class CarSchema(BaseModel):
    model: str = Field(..., example="Sedan")
    brand: str = Field(..., example="Toyota")
    color: str = Field(..., example="Red")
    c_type: str = Field(..., example="SUV")
    c_license: str = Field(..., example="ABC-123-XYZ")
    user_id: Optional[uuid.UUID] = Field(None, example="your-user-uuid-here")

    model_config = {
        "json_schema_extra": {
            "example": {
                "model": "Sedan",
                "brand": "Toyota",
                "color": "Red",
                "c_type": "SUV",
                "c_license": "ABC-123-XYZ",
                # "user_id": "your-user-uuid-here"
            }
        }
    }

class CarCreateSchema(CarSchema):
    pass

class Car(CarSchema):
    id: int

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
                # "user_id": "your-user-uuid-here"
            }
        }
    }

class CarResponseSchema(CarSchema):
    model: str = Field(..., example="Sedan")
    brand: str = Field(..., example="Toyota")
    color: str = Field(..., example="Red")
    c_type: str = Field(..., example="SUV")
    c_license: str = Field(..., example="ABC-123-XYZ")

    model_config = {
        "from_attributes": True,
        "json_schema_extra": {
            "example": {
                "id": 1,
                "model": "Sedan",
                "brand": "Toyota",
                "color": "Red",
                "c_type": "SUV",
                "c_license": "ABC-123-XYZ"
            }
        }
    }   

    