from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import sessionmaker

# Ec2 # db connection string
SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:postgres@13.247.159.250/wenyfourdb"

# Neon db # connection string
# SQLALCHEMY_DATABASE_URL = 'postgresql://w4db_owner:npg_xWoI9kDuBU5G@ep-muddy-heart-abkolm3g-pooler.eu-west-2.aws.neon.tech/w4db?sslmode=require'

# Local db connection string

# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/fastapi"

# Azure db connection string
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


# while True:
#     try:
#         conn = psycopg2.connect(
#             host='localhost',
#             database='fastapi',
#             user='postgres',
#             password='postgres',
#             cursor_factory=RealDictCursor
#         )

#         cursor = conn.cursor(cursor_factory=RealDictCursor)
#         print("Database connection was successful")
#         break
#     except Exception as error:
#         print("Database connection was not successful")
#         print("Error: ", error)
#     time.sleep(2)
