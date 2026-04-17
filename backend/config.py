import os
import tempfile
from datetime import timedelta

from dotenv import load_dotenv


load_dotenv()


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "bharatanatyam-secret-key")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "bharatanatyam-jwt-secret-key")
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "mysql+pymysql://root:password@localhost/tala_detector"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=int(os.getenv("JWT_EXPIRES_HOURS", "24")))
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", tempfile.gettempdir())
