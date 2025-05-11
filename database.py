from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker


SQLALCHEMY_DATABASE_URL = 'postgresql://w4db_owner:npg_xWoI9kDuBU5G@ep-muddy-heart-abkolm3g-pooler.eu-west-2.aws.neon.tech/w4db?sslmode=require'

# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/fastapi"
# SQLALCHEMY_DATABASE_URL ="postgresql://weny4db_owner:npg_SpcX1bAQNh8z@ep-falling-scene-a9t9i586-pooler.gwc.azure.neon.tech/weny4db?sslmode=require"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine) 



Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()