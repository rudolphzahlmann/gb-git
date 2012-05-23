# coding: utf8

from portfolio.models import Project
from django.http import HttpResponse
from django.shortcuts import render, get_object_or_404

def index(request):
    projects = Project.objects.all()
    return render(request, 'index.html', {'projects':projects, })


def get_box(request, box):
    pass
	
def project(request, project_slug):
    project = get_object_or_404(Project, slug=project_slug)
    return HttpResponse(project.get_images(), mimetype='application/json')

  
def is_iphone(request):
    browser = request.META.get('HTTP_USER_AGENT', '')
    if browser.find('iPhone') > 0:
        return True

    
def is_ipad(request):
    browser = request.META.get('HTTP_USER_AGENT', '')
    if browser.find('iPad') > 0:
        return True
