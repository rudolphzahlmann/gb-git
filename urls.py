# coding: utf8
from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'portfolio.views.index'),

	# JSON REQUESTS
	(r'^portfolio/(?P<project>.+)', 'portfolio.views.project'),

	# MEDIA
    (r'^media/(?P<path>.*)$',
     'django.views.static.serve',
     {'document_root': settings.MEDIA_ROOT,
      'show_indexes': True}),

    # ADMIN AND DOCUMENTATION
    url(r'^admin/', include(admin.site.urls)),
	url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
)