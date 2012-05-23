# coding: utf8
from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    (r'^$', 'portfolio.views.index', {}, 'portfolio.index'),
    (r'^getbox/(?P<box>.+)/$', 'portfolio.views.get_box', {},
     'portfolio.get_box'),
    (r'^portfolio/(?P<project_slug>.+)/$', 'portfolio.views.project', {},
     'portfolio.project'),

    (r'^admin/', include(admin.site.urls)),
)
