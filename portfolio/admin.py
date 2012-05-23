# encoding: utf-8

from django.contrib import admin
from portfolio.models import Image, Project

class ImageInline(admin.StackedInline):
    model = Image


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ImageInline]


admin.site.register(Project, ProjectAdmin)
