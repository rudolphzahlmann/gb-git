# encoding: utf-8

from django.contrib import admin
from portfolio.models import *

class ImageInline(admin.StackedInline):
	model = Image

class ProjectAdmin(admin.ModelAdmin):
	list_display = ('title', 'client')
	inlines = [
		ImageInline,
	]

admin.site.register(Project, ProjectAdmin)