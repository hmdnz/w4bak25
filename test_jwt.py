# test_jwt.py
import os
from dotenv import load_dotenv
import jwt
from datetime import datetime, timedelta

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
print("Loaded SECRET_KEY:", repr(SECRET_KEY))

# Create token
payload = {
    "sub": "user_id_123",
    "exp": datetime.utcnow() + timedelta(minutes=30)
}
token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
print("Token:", token)

# Decode token
decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
print("Decoded:", decoded)
