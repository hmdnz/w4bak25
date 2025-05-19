from pydantic import BaseModel, Field, AnyUrl
from typing import List, Optional


class RatingBase(BaseModel):
    rating: float
    rater: str

class RatingCreate(RatingBase):
    driver_id: str

class RatingResponse(RatingBase):
    id: str
    driver_id: str

    class Config:
        from_attributes = True


class ReviewBase(BaseModel):
    review: str
    reviewer: str

class ReviewCreate(ReviewBase):
    driver_id: str

class ReviewResponse(ReviewBase):
    id: str
    driver_id: str

    class Config:
        from_attributes = True


class ReportBase(BaseModel):
    report: str
    reporter: str

class ReportCreate(ReportBase):
    driver_id: str

class ReportResponse(ReportBase):
    id: str
    driver_id: str

    class Config:
        from_attributes = True


class DriverBase(BaseModel):
    nin: AnyUrl
    driver_license: AnyUrl
    is_verified: bool = False
    user_id: Optional[str] = None

class DriverCreate(DriverBase):
    pass

class DriverResponse(DriverBase):
    id: str
    ratings: List[RatingResponse] = []
    reviews: List[ReviewResponse] = []
    reports: List[ReportResponse] = []

    class Config:
        from_attributes = True
