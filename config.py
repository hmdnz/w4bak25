from dotenv import load_dotenv
import os

loaded = load_dotenv()
print("Did dotenv load:", loaded)

ZOHO_EMAIL = os.getenv("ZOHO_EMAIL")
ZOHO_PASSWORD = os.getenv("ZOHO_PASSWORD")
ZOHO_SMTP_SERVER = os.getenv("ZOHO_SMTP_SERVER")
ZOHO_SMTP_PORT = int(os.getenv("ZOHO_SMTP_PORT", 587))


