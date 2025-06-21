# utils/email.py
import aiosmtplib
from email.mime.text import MIMEText
from jinja2 import Environment, FileSystemLoader
from config import ZOHO_EMAIL, ZOHO_PASSWORD, ZOHO_SMTP_SERVER, ZOHO_SMTP_PORT

# Jinja2 environment to load from root/templates
env = Environment(loader=FileSystemLoader("templates"))

async def send_reset_email(to_email: str, token: str, name: str):
    # Build the password reset link
    reset_link = f"https://weny4frontend.com/reset-password?token={token}"

    # Load and render the HTML template
    template = env.get_template("forgotpasswordtemplate.html")
    html_content = template.render(name=name, link=reset_link)

    # Prepare MIME message
    message = MIMEText(html_content, "html")
    message["From"] = ZOHO_EMAIL
    message["To"] = to_email
    message["Subject"] = "Reset your password"

    # Send email
    await aiosmtplib.send(
        message,
        hostname=ZOHO_SMTP_SERVER,
        port=ZOHO_SMTP_PORT,
        username=ZOHO_EMAIL,
        password=ZOHO_PASSWORD,
        start_tls=True,
    )
