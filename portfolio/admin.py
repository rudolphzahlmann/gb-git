# encoding: utf-8

from django.contrib import admin
from portfolio.models import Image, Project

class ImageInline(admin.TabularInline):
    model = Image


class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'pub_date']
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ImageInline]
    date_hierarchy = 'pub_date'


admin.site.register(Project, ProjectAdmin)
