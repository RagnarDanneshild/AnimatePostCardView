from django.shortcuts import render
from django.http import HttpRequest,HttpResponse
from django.template import RequestContext
from PostCard.models import *
from PostCard.forms import UserProfileForm
from django.forms import modelformset_factory
from django.shortcuts import render_to_response
from PostCard.models import *
from django.views.generic import TemplateView
from django.core import serializers
# Create your views here.

class Home(TemplateView):
   template_name='index.html'


def profile(request):
    userProfile=UserInfo.objects.get(user=request.user)
    form=UserProfileForm
    form.instance=userProfile
    return render(
        request,
        'profile.html',
        context_instance = RequestContext(request,
        {   "form": form,
            'userInfo':userProfile
        }
          )
    )

class edit(TemplateView):
   template_name='edit.html'


def save_post_card(request):
    if request.is_ajax():
        post_card=PostCard(user=request.user,canvas=request.POST['json'],picture_url=request.POST['url'])
        post_card.save()

    return HttpResponse('it s ok')

def getList(request):
    if request.is_ajax():
        data = serializers.serialize("json", PostCard.objects.all())
    return HttpResponse(data, content_type='application/json')

