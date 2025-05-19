# # -*- coding: utf-8 -*-
# import uuid
# from sqlalchemy.dialects.postgresql import UUID
# from sqlalchemy import Column, String, Boolean, Float, ForeignKey
# from sqlalchemy.orm import relationship
# from database import Base

# class Driver(Base):
#     __tablename__ = "drivers"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     nin = Column(String, nullable=False)
#     driver_license = Column(String, nullable=False)
#     is_verified = Column(Boolean, default=False)
#     user_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=True)

#  # Relationships
#     owner = relationship("User", back_populates="drivers")
#     ratings = relationship("Rating", back_populates="driver", cascade="all, delete-orphan")
#     reviews = relationship("Review", back_populates="driver", cascade="all, delete-orphan")
#     reports = relationship("Report", back_populates="driver", cascade="all, delete-orphan")
#     rides = relationship("Ride", back_populates="driver", cascade="all, delete-orphan")
#     cars = relationship("CarModel", back_populates="driver", cascade="all, delete-orphan")
#     user=relationship("User", back_populates="drivers")

# class Rating(Base):
#     __tablename__ = "ratings"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     rating = Column(Float, nullable=False)
#     rater = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
#     driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False)

#     driver = relationship("Driver", back_populates="ratings")

# class Review(Base):
#     __tablename__ = "reviews"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     review = Column(String, nullable=False)
#     reviewer = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
#     driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False)

#     driver = relationship("Driver", back_populates="reviews")

# class Report(Base):
#     __tablename__ = "reports"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     report = Column(String, nullable=False)
#     reporter = Column(UUID(as_uuid=True), ForeignKey("users.user_id"), nullable=False)
#     driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False)

#     driver = relationship("Driver", back_populates="reports")
