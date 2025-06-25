# # utils/email.py
# from dotenv import load_dotenv
# load_dotenv()
# from fastapi import HTTPException, status
# from sqlalchemy.orm import Session
# import aiosmtplib
# from email.mime.text import MIMEText
# from jinja2 import Environment, FileSystemLoader
# from config import ZOHO_EMAIL, ZOHO_PASSWORD, ZOHO_SMTP_SERVER, ZOHO_SMTP_PORT

# # Jinja2 environment to load from root/templates
# env = Environment(loader=FileSystemLoader("templates"))

# async def send_reset_email(to_email: str, token: str, name: str):
#     # Build the password reset link
#     reset_link = f"https://weny4frontend.com/reset-password?token={token}"

#     # Load and render the HTML template
#     template = env.get_template("ForgotPasswordTemplate.html")
#     html_content = template.render(name=name, link=reset_link)

#     # Prepare MIME message
#     message = MIMEText(html_content, "html")
#     message["From"] = ZOHO_EMAIL
#     message["To"] = to_email
#     message["Subject"] = "Reset your password"

#     # Send email
#     await aiosmtplib.send(
#         message,
#         hostname=ZOHO_SMTP_SERVER,
#         port=ZOHO_SMTP_PORT,
#         username=ZOHO_EMAIL,
#         password=ZOHO_PASSWORD,
#         start_tls=True,
#     )



from dotenv import load_dotenv
load_dotenv()

import aiosmtplib
from email.mime.text import MIMEText
from jinja2 import Environment, FileSystemLoader
from config import ZOHO_EMAIL, ZOHO_PASSWORD, ZOHO_SMTP_SERVER, ZOHO_SMTP_PORT

# Jinja2 environment to load from root/templates
env = Environment(loader=FileSystemLoader("templates"))

# ✅ Reusable email sending function
async def send_email(to_email: str, subject: str, template_name: str, context: dict):
    try:
        # Load and render the template with context (e.g., name, link, etc.)
        template = env.get_template(template_name)
        html_content = template.render(**context)

        # Prepare the email message
        message = MIMEText(html_content, "html")
        message["From"] = ZOHO_EMAIL
        message["To"] = to_email
        message["Subject"] = subject

        # Send it via Zoho SMTP
        await aiosmtplib.send(
            message,
            hostname=ZOHO_SMTP_SERVER,
            port=ZOHO_SMTP_PORT,
            username=ZOHO_EMAIL,
            password=ZOHO_PASSWORD,
            start_tls=True,
        )
        print(f"✅ Email sent to {to_email}")
    except Exception as e:
        print(f"❌ Failed to send email: {e}")