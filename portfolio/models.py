# coding: utf8
from django.db import models
from django.utils import simplejson

from taggit.managers import TaggableManager
from taggit.models import TaggedItemBase


class TaggedYears(TaggedItemBase):
    content_object = models.ForeignKey('Project')

class TaggedTags(TaggedItemBase):
    content_object = models.ForeignKey('Project')

class Project(models.Model):
    title = models.CharField(max_length=50, verbose_name='Titel')
    slug = models.SlugField(unique=True)
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

    @models.permalink
    def get_absolute_url(self):
        return ('portfolio.views.project', [self.slug])

    def images_json(self):
        return simplejson.dumps(
            [{'id': i.id, 'title': i.title, 'url': i.image.url}
             for i in self.images.all()]
        )


class Image(models.Model):
    title = models.CharField(max_length=100, verbose_name='Titel')
    image = models.ImageField(upload_to='images', verbose_name='Datei')
    sort_key = models.PositiveSmallIntegerField(u'Sortierung', default=0)
    project = models.ForeignKey(Project, verbose_name='Projekt',
        related_name='images'
    )

    class Meta:
        ordering = ['sort_key']

    def __unicode__(self):
        return self.title
