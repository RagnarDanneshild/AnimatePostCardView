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
from PostCard.check_badges import *
import json
from tagging.models import TaggedItem
# Create your views here. f

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
        {"form": form,
            'userInfo':userProfile
        }
          )
    )

class edit(TemplateView):
   template_name='edit.html'


def save(request):
    if request.is_ajax():
        post_card = PostCard(user=request.user, canvas=request.POST['json'], picture_url=request.POST['url'],name=request.POST['name'], tags=request.POST.get('tags'))

        if PostCard.objects.filter(name=request.POST['name']).exists():
            oldpost_card = PostCard.objects.get(name=request.POST['name'])
            oldpost_card.canvas = request.POST['json']
            oldpost_card.picture_url = request.POST['url']
            oldpost_card.tags=request.POST.get('tags')
            oldpost_card.save()
        else:
            post_card.save()
    return HttpResponse('it s ok')

def edit(request,templnum = '',id = 0):

    if templnum != '' :
        if request.is_ajax():
            s=serializers.serialize('json',[PostCard.objects.get(picture_url=templnum)])
            return HttpResponse(s, content_type='application/json')
        else:
            return render(request,'edit.html')
    elif templnum == '' and id != 0:
        if request.is_ajax():
            s=serializers.serialize('json',[PostCard.objects.get(id=id)])
            return HttpResponse(s, content_type='application/json')
        else:
            return render(request,'edit.html')

def save_post_card(request):
    if request.is_ajax():
        post_card = PostCard(user=request.user,canvas=request.POST['json'],picture_url=request.POST['url'])
        post_card.save()

    return HttpResponse('it s ok')

def getList(request,num=4):
    slist = PostCard.objects.all().order_by('-creation_date')
    mass = []
    for item in slist:
        if 'template' not in item.picture_url:
            mass.append(item)
    if request.is_ajax():
        if(request.GET.get('user')==None):
            data = serializers.serialize("json", mass[int(num): int(num)+2])

        else:
            data=serializers.serialize("json",PostCard.objects.filter(user=request.user))
    return HttpResponse(data, content_type='application/json')

def showPostCard(request,id=1):
    if request.is_ajax():
        s=serializers.serialize('json',[PostCard.objects.get(id=id)])
        return HttpResponse(s, content_type='application/json')
    else:
        return render(request,'PostCardView.html')


def rate(request):
    data={}
    if request.is_ajax():
        user=request.user
        if(request.POST):
            rating =int(request.POST['value'])

            postcard=PostCard.objects.get(id=int(request.POST['id']))
            obj,create=PostCardRating.objects.update_or_create(user=user,post_card=postcard,defaults={'rate':rating})
            if(create):
                postcard.update_rating(rating,create)
            else:
                postcard.update_rating(rating-obj.prev_rate,create)

            data['rating']=postcard.rating
            data['vote_num']=postcard.like_num


        if request.GET:
            postcard=PostCard.objects.get(id=int(request.GET.get('id')))
            obj=PostCardRating.objects.filter(user=user,post_card=postcard)
            data['rating']=postcard.rating
            data['vote_num'] = postcard.like_num
            if obj.exists():
                data['user_rate']=obj[0].rate
            else:
                data['user_rate']=0

    return HttpResponse(json.dumps(data), content_type = "application/json")


def checkbudges(request):
    user=UserInfo.objects.get(user=request.user)
    data={}
    data['1']=registerBadge(user)
    data['2']=createdPostCard1(user)
    data['3']=createdPostCard10(user)
    data['4']=top_user(user)
    data['5']=mark_user(user)
    return HttpResponse(json.dumps(data), content_type = "application/json")


def tag_view(request,tag):
    data=serializers.serialize('json',TaggedItem.objects.get_by_model(PostCard,tag))