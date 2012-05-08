# coding: utf8

from portfolio.models import *
from django.http import HttpResponse
from django.shortcuts import render_to_response, get_object_or_404

def index(request):
  projects = Project.objects.all()
  if is_iphone(request):
    return render_to_response('index_iphone.html', {})
  return render_to_response('index.html', {'projects':projects, })
	
def project(request, project):
  project = Project.objects.get(pk=project)
  return HttpResponse(project.get_images(), mimetype='application/json')
  
def is_iphone(request):
  browser = request.META.get('HTTP_USER_AGENT', '')
  if browser.find('iPhone') > 0:
    return True
    
def is_ipad(request):
  browser = request.META.get('HTTP_USER_AGENT', '')
  if browser.find('iPad') > 0:
    return True