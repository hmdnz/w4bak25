from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime
import uuid 

# Base Schema (Contains core car attributes and examples)
class CarBase(BaseModel):
    model: str = Field(..., example="Sedan")
    brand: str = Field(..., example="Toyota")
    color: str = Field(..., example="Red")
    c_type: str = Field(..., example="SUV")
    c_license: str = Field(..., example="ABC-123-XYZ")
    
    # Common example configuration for all children
    model_config = {
        "json_schema_extra": {
            "example": {
                "model": "Sedan",
                "brand": "Toyota",
                "color": "Red",
                "c_type": "SUV",
                "c_license": "ABC-123-XYZ",
            }
        }
    }

# Creation Schema (used in POST requests)
class CarCreateSchema(CarBase):
    # This inherits all fields from CarBase
    pass

# Update Schema (used in PUT/PATCH requests)
class CarSchema(CarBase):
    # This inherits all fields from CarBase
    pass

# Response Schema (used to display data, including ORM fields)
class CarResponseSchema(CarBase):
    # ✅ CRITICAL ADDITION: Include the primary key 'id'
    id: int = Field(..., example=1) 
    
    # ✅ FIX: Change type to uuid.UUID to match the ORM model output.
    # Pydantic will automatically serialize this to a string in the JSON response.
    user_id: uuid.UUID = Field(..., example="6b5de1b5-b380-40e7-af87-d93879e168ab") 

    # Configuration for ORM compatibility and full example
    model_config = {
        "from_attributes": True, # For SQLAlchemy ORM compatibility
        "json_schema_extra": {
            "example": {
                "id": 1,
                "model": "Sedan",
                "brand": "Toyota",
                "color": "Red",
                "c_type": "SUV",
                "c_license": "ABC-123-XYZ",
                "user_id": "6b5de1b5-b380-40e7-af87-d93879e168ab"
            }
        }
    }
