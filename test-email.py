# test_email.py

import os
from dotenv import load_dotenv
import asyncio
from utils.email import send_reset_email

# ✅ Load environment variables from .env file
load_dotenv()

# Sample test values
to_email = "wenyfour@gmail.com"  # Replace with a real email
token = "test-reset-token-12345"
name = "Test User"

async def main():
    try:
        await send_reset_email(to_email, token, name)
        print("✅ Email sent successfully!")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")

if __name__ == "__main__":
    asyncio.run(main())
