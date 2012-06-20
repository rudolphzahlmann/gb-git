# coding: utf8
from django.conf import settings

def debug_context_preprocessor(request):
    return {'DEBUG': getattr(settings, 'DEBUG', False)}
