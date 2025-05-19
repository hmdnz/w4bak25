# # -*- coding: utf-8 -*-
# import uuid
# from sqlalchemy.dialects.postgresql import UUID
# from sqlalchemy import Column, String, Boolean, Float, ForeignKey, Integer, TIMESTAMP, text
# from sqlalchemy.orm import relationship
# from database import Base
# # ---------- Ride Model ----------
# class Ride(Base):
#     __tablename__ = "rides"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     driver_id = Column(UUID(as_uuid=True), ForeignKey("drivers.id"), nullable=False)
#     car_id = Column(Integer, ForeignKey("cars.id"), nullable=False)

#     origin = Column(String, nullable=False)
#     destination = Column(String, nullable=False)
#     departure_time = Column(TIMESTAMP(timezone=True), nullable=False)
#     available_seats = Column(Integer, nullable=False)
#     price = Column(Float, nullable=False)
#     is_active = Column(Boolean, default=True)

#     # Relationships
#     driver = relationship("Driver", back_populates="rides")
#     car = relationship("CarModel")
#     passengers = relationship("RidePassenger", back_populates="ride", cascade="all, delete-orphan")


# # ---------- RidePassenger Model (Junction Table) ----------
# class RidePassenger(Base):
#     __tablename__ = "ride_passengers"

#     id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
#     ride_id = Column(UUID(as_uuid=True), ForeignKey("rides.id"))
#     passenger_id = Column(UUID(as_uuid=True), ForeignKey("users.user_id"))
#     booked_at = Column(TIMESTAMP(timezone=True), server_default=text("now()"))

#     # Relationships
#     ride = relationship("Ride", back_populates="passengers")
#     passenger = relationship("User", back_populates="ride_passengers")
