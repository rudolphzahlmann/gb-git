# coding: utf8
import datetime
import os

from django.contrib import admin
from django.db import models
from django.utils import simplejson

from sorl.thumbnail import get_thumbnail
from taggit.managers import TaggableManager
from taggit.models import TaggedItemBase


class TaggedYears(TaggedItemBase):
	content_object = models.ForeignKey('Project')

	
class TaggedTags(TaggedItemBase):
	content_object = models.ForeignKey('Project')


class Project(models.Model):
	title = models.CharField(max_length=50, verbose_name='Titel')
	client = models.CharField(max_length=50, verbose_name='Kunde', blank=True)
	pub_date = models.DateTimeField('timestamp', auto_now_add=True)
	years = TaggableManager(through=TaggedYears, verbose_name='Jahre',
        help_text=u'Jahre, in denen an diesem Projekt gearbeitet wurde. Durch '
                  u'Kommas getrennt.'
    )
	years.rel.related_name = 'years'
	tags = TaggableManager(through=TaggedTags, verbose_name='Tags',
        help_text='Tags, durch Kommas getrennt.', blank=True
    )
	tags.rel.related_name = 'tags'
	subtitle = models.CharField(max_length=100, verbose_name='Unterzeile',
        blank=True
    )
	description = models.TextField(verbose_name='Beschreibung')
	url = models.URLField(blank=True, verbose_name='URL')
	collaboration = models.CharField(blank=True, max_length=100,
        verbose_name='zusammen mit'
    )
	notes = models.CharField(blank=True, verbose_name='Notizen', max_length=100)
	
	def __unicode__(self):
		return self.title
		
	def get_images(self):
	  images = []
	  titles = []
	  for i in self.images.all():
	    images.append(i.file.url)
	    titles.append(i.title)
	  return simplejson.dumps({'images':images, 'titles':titles, })

		
class Image(models.Model):
	title = models.CharField(max_length=100, verbose_name='Titel')
	file = models.ImageField(upload_to='images', verbose_name='Datei')
	project = models.ForeignKey(Project, verbose_name='Projekt',
        related_name='images'
    )
	
	def __unicode__(self):
		return self.title
