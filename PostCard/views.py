from django.shortcuts import render
from django.http import HttpRequest,HttpResponse
from django.template import RequestContext
from PostCard.models import *
from PostCard.forms import UserProfileForm
from django.forms import modelformset_factory
from django.shortcuts import render_to_response
from PostCard.models import *
from django.views.generic import TemplateView
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

class FirstTemplate(TemplateView):
   template_name='firstTemplate.html'

