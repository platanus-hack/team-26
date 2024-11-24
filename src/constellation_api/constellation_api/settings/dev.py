import os
from datetime import timedelta
from pathlib import Path

from constellation_api.utils import get_secret

# =============================================================================
# General Configuration
# =============================================================================


API_VERSION = "v1"
APPEND_SLASH = False

AUTH_USER_MODEL = "users.ConstellationUser"


# Environment mode: 'PRODUCTION' or 'DEVELOPMENT'
MODE = os.getenv("MODE", "DEVELOPMENT")

DEBUG = True

API_HOST = "http://tensor.zapto.org"
WEB_HOST = "https://constellation.tensor.bio"
ALLOWED_HOSTS = [
    "localhost",
    "100.102.49.5",
    "constellation.tensor.bio",
    "tensor.zapto.org",
]

# =============================================================================
# Get All Secrets
# =============================================================================

# Now we store all the api related secrets in one place
secret_name = "constellarion/api-secrets"
secrets = get_secret(secret_name, MODE=MODE)

SECRET_KEY = secrets["DJANGO_SECRET_KEY"]
OPEN_AI_API_KEY = secrets["OPEN_AI_API_KEY"]
# PINECONE_API_KEY = secrets["PINECONE_API_KEY"]
# PINECONE_ENVIRONMENT = secrets["PINECONE_ENVIRONMENT"]

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# =============================================================================
# Application Definition
# =============================================================================

INSTALLED_APPS = [
    # Django default apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party apps
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_filters",

    # Custom apps
    "users",
    "knowledge",
]

MIDDLEWARE = [
    # Security and session middleware
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    # CORS middleware
    "corsheaders.middleware.CorsMiddleware",
    # Common middleware
    "django.middleware.common.CommonMiddleware",
    # CSRF and authentication middleware
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    # Message and clickjacking protection middleware
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    # Custom middleware will be added here after renaming
]

ROOT_URLCONF = "constellation_api.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],  # Add template directories here
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                # Default context processors
                "django.template.context_processors.debug",
                "django.template.context_processors.request",  # Required by admin
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "constellation_api.wsgi.application"

# =============================================================================
# Database Configuration
# =============================================================================


RDS_NAME = "constellation_dev"
RDS_USER = "constellation"
RDS_PASSWORD = "constellation"

RDS_HOST = "localhost"
RDS_PORT =  5432

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": RDS_NAME,
        "USER": RDS_USER,
        "PASSWORD": RDS_PASSWORD,
        "HOST": RDS_HOST,
        "PORT": RDS_PORT,
    }
}

# =============================================================================
# Internationalization
# =============================================================================

LANGUAGE_CODE = "en-us"
TIME_ZONE = "America/Santiago"
USE_I18N = True
USE_L10N = True
USE_TZ = True

# =============================================================================
# Static and Media Files Configuration
# =============================================================================

STATIC_URL = 'static/'

# =============================================================================
# Django REST Framework
# =============================================================================

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_THROTTLE_CLASSES": [
        # Define custom throttling classes if needed
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": "1000/hour",
        "user": "1000/hour",
    },
}

# Simple JWT
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]
CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
]

CSRF_TRUSTED_ORIGINS = [
    "https://constellation.tensor.bio",
    "https://tensor.zapto.org",
]

# Celery Configuration


# =============================================================================
# End of File
# =============================================================================
