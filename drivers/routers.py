# from fastapi import APIRouter, Depends, HTTPException, status
# from sqlalchemy.orm import Session
# from database import get_db
# from uuid import uuid4

# from drivers import models, schemas  # Adjust import paths as needed

# router = APIRouter(prefix="/drivers", tags=["Drivers"])


# # ---------- Create Driver ----------
# @router.post("/", response_model=schemas.DriverResponse, status_code=status.HTTP_201_CREATED)
# def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
#     new_driver = models.Driver(
#         id=str(uuid4()),
#         nin=str(driver.nin),
#         driver_license=str(driver.driver_license),
#         is_verified=driver.is_verified,
#         user_id=driver.user_id
#     )
#     db.add(new_driver)
#     db.commit()
#     db.refresh(new_driver)
#     return new_driver


# # ---------- Get All Drivers ----------
# @router.get("/", response_model=list[schemas.DriverResponse])
# def get_all_drivers(db: Session = Depends(get_db)):
#     return db.query(models.Driver).all()


# # ---------- Get Driver by ID ----------
# @router.get("/{driver_id}", response_model=schemas.DriverResponse)
# def get_driver(driver_id: str, db: Session = Depends(get_db)):
#     driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
#     if not driver:
#         raise HTTPException(status_code=404, detail="Driver not found")
#     return driver


# # ---------- Add Rating ----------
# @router.post("/{driver_id}/ratings", response_model=schemas.RatingResponse, status_code=201)
# def add_rating(driver_id: str, rating: schemas.RatingCreate, db: Session = Depends(get_db)):
#     if driver_id != rating.driver_id:
#         raise HTTPException(status_code=400, detail="Driver ID mismatch")

#     db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
#     if not db_driver:
#         raise HTTPException(status_code=404, detail="Driver not found")

#     new_rating = models.Rating(id=str(uuid4()), **rating.dict())
#     db.add(new_rating)
#     db.commit()
#     db.refresh(new_rating)
#     return new_rating


# # ---------- Add Review ----------
# @router.post("/{driver_id}/reviews", response_model=schemas.ReviewResponse, status_code=201)
# def add_review(driver_id: str, review: schemas.ReviewCreate, db: Session = Depends(get_db)):
#     if driver_id != review.driver_id:
#         raise HTTPException(status_code=400, detail="Driver ID mismatch")

#     db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
#     if not db_driver:
#         raise HTTPException(status_code=404, detail="Driver not found")

#     new_review = models.Review(id=str(uuid4()), **review.dict())
#     db.add(new_review)
#     db.commit()
#     db.refresh(new_review)
#     return new_review


# # ---------- Add Report ----------
# @router.post("/{driver_id}/reports", response_model=schemas.ReportResponse, status_code=201)
# def add_report(driver_id: str, report: schemas.ReportCreate, db: Session = Depends(get_db)):
#     if driver_id != report.driver_id:
#         raise HTTPException(status_code=400, detail="Driver ID mismatch")

#     db_driver = db.query(models.Driver).filter(models.Driver.id == driver_id).first()
#     if not db_driver:
#         raise HTTPException(status_code=404, detail="Driver not found")

#     new_report = models.Report(id=str(uuid4()), **report.dict())
#     db.add(new_report)
#     db.commit()
#     db.refresh(new_report)
#     return new_report
