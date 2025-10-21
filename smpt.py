import asyncio
from email.message import EmailMessage
import aiosmtplib
import os
from dotenv import load_dotenv

load_dotenv()

email = os.getenv("ZOHO_EMAIL")
password = os.getenv("ZOHO_PASSWORD")

message = EmailMessage()
message["From"] = email
message["To"] = email
message["Subject"] = "Test Email"
message.set_content("This is a test email from FastAPI.")

async def send_email():
    try:
        await aiosmtplib.send(
            message,
            # hostname="smtp.zoho.com", old server before new subscription
            hostname="smtppro.zoho.com",
            port=587,
            start_tls=True,
            username=email,
            password=password
        )
        print("✅ Email sent successfully.")
    except Exception as e:
        print("❌ Failed to send email:", e)

asyncio.run(send_email())
