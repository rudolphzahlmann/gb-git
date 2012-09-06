# coding: utf8
from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', 'portfolio.views.index', {}, 'portfolio.index'),

    (r'^admin/', include(admin.site.urls)),
)
