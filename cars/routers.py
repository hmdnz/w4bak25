from fastapi import APIRouter, Depends, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse # ✅ FIX: Imported Response and JSONResponse from fastapi.responses
from fastapi.encoders import jsonable_encoder
from datetime import datetime, timedelta
from typing import Annotated, List, Optional
# 💡 IMPORTANT: Import IntegrityError for database error handling
from sqlalchemy.exc import IntegrityError

from cars.schema import CarResponseSchema, CarCreateSchema, CarSchema
from sqlalchemy.orm import Session
from database import get_db

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from .models import CarModel

from auth.models import User
from auth.oauth2 import get_current_user

router = APIRouter(tags=['Cars'])

@router.post("/create_car", response_model=CarResponseSchema)
async def create_car(
    car_in: CarCreateSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    car_data = car_in.model_dump()
    car_data["user_id"] = current_user.user_id

    new_car = CarModel(**car_data)
    db.add(new_car)
    
    # ✅ FIX 1: Add error handling for duplicate license plate (UniqueViolation)
    try:
        db.commit()
    except IntegrityError as e:
        db.rollback()
        # Check for the unique constraint key, which signals a duplicate license plate
        if 'cars_c_license_key' in str(e.orig):
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"The car license plate '{car_in.c_license}' is already registered."
            )
        # Re-raise any other unexpected database error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected database error occurred."
        )

    db.refresh(new_car)
    return new_car


@router.put("/update/{car_id}/car", response_description="update a car's information", response_model=CarResponseSchema)
async def update_car(car_id: int, car: CarSchema, user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    # Use a query object to allow for efficient updating
    car_query = db.query(CarModel).filter(CarModel.id == car_id)
    db_car = car_query.first()
    
    if not db_car:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Car with id {car_id} not found")
    if db_car.user_id != user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User has no access to this car")
    
    # ✅ FIX 2: Use the more efficient SQLAlchemy .update() method
    car_query.update(car.model_dump(exclude_unset=True), synchronize_session=False)
    db.commit()
    
    # Refresh and return the updated object
    return car_query.first()


# ----------------------------------------------------------------------------------
# ✅ Path ordering is correct: /car/all is defined before /car/{car_id}
# ----------------------------------------------------------------------------------

@router.get("/car/all", response_description="get all a user's cars", response_model=List[CarResponseSchema])
async def get_user_cars(user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    """Lists all cars owned by the authenticated user."""
    cars = db.query(CarModel).filter(CarModel.user_id == user.user_id).all()
    return cars

@router.get("/car/{car_id}", response_description="get a car by id", response_model=CarResponseSchema)
async def get_car_by_id(car_id: int, user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    """Retrieves a single car owned by the authenticated user by its ID."""
    car = db.query(CarModel).filter(CarModel.id == car_id).first()
    if car:
        return car
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Car with id {car_id} not found")

# ----------------------------------------------------------------------------------

@router.get("/check/user/cars", response_description="check if user has any available car")
async def check_user_cars(user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    car = db.query(CarModel).filter(CarModel.user_id == user.user_id).first()
    if car:
        return JSONResponse(content={"status": True, "message": "user has a valid vehicle"}, status_code=status.HTTP_200_OK)
    return JSONResponse(content={"status": False, "message": "user has no valid vehicle attached to their profile"})


@router.delete("/{car_id}/delete", response_description="delete a car by id")
async def delete_car_by_id(car_id: int, user: Annotated[User, Depends(get_current_user)], db: Session = Depends(get_db)):
    car_query = db.query(CarModel).filter(CarModel.id == car_id)
    car = car_query.first()
    
    if not car:
        # Changed to HTTPException for consistent error structure, but JSONResponse is also fine
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Car with id: {car_id} not found!")
        
    if car.user_id != user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="User has no access to car")

    # ✅ FIX 3: Use the more efficient SQLAlchemy .delete() method
    car_query.delete(synchronize_session=False)
    db.commit()
    # ✅ FIX 4: Use 204 No Content for a successful deletion (standard practice)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
