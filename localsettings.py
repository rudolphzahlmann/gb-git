# Django settings for GB.
import os.path
BASE_PATH = os.path.dirname(__file__)

DEBUG = True
TEMPLATE_DEBUG = DEBUG

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'gb',
    }
}

EMAIL_HOST = 'mail.wservices.ch'
EMAIL_HOST_PASSWORD = 'kirv0u4s'
EMAIL_HOST_USER = 'cg@grabowski-boell.de'