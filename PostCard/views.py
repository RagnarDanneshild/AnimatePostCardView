from django.shortcuts import render
from django.http import HttpRequest,HttpResponse
from django.template import RequestContext
from tagging.models import TaggedItem
from postcard.forms import UserProfileForm
from django.views.generic import TemplateView
from django.core import serializers
from postcard.check_badges import *
import json
from django.db.models import Avg
from haystack.query import SearchQuerySet


def search(request):
    if request.is_ajax():
        searchobjects = [item.object for item in SearchQuerySet().filter(content=request.POST.get('searching_data'))]
        jsonsearchresult = serializers.serialize('json', searchobjects)
        return HttpResponse(jsonsearchresult, content_type='application/json')


class Home(TemplateView):
   template_name = 'index.html'


def profile(request):
    userProfile = UserInfo.objects.get(user=request.user)
    form = UserProfileForm
    form.instance = userProfile
    return render(
        request,
        'profile.html',
        context_instance=RequestContext(request,
        {"form": form,
            'userInfo': userProfile
        }
        )
    )


def save(request):
    if request.is_ajax():
        post_card = PostCard(user=request.user, canvas_url=request.POST['curl'], picture_url=request.POST['purl'], name=request.POST['name'], tags=request.POST.get('tags'))
        if PostCard.objects.filter(name=request.POST['name']).exists():
            oldpost_card = PostCard.objects.get(name=request.POST['name'])
            oldpost_card.canvas_url = request.POST['curl']
            oldpost_card.picture_url = request.POST['purl']
            oldpost_card.tags = request.POST.get('tags')
            oldpost_card.save()
        else:
            post_card.save()
    return HttpResponse('it s ok')


def deletepostcard(request, id):
    if PostCard.objects.filter(id=id).exists():
        postcardfordelete = PostCard.objects.get(id=id)
        if request.user == postcardfordelete.user:
            postcardfordelete.delete()
        return render(request, 'profile.html')



def savetemplate(request):
    if request.is_ajax():
        template = Template(canvas_url=request.POST['curl'], template_url=request.POST['purl'], name=request.POST['name'])
        template.save()
    return HttpResponse('it s ok')


def edit(request, templnum='', id=0):
    if templnum != '':
        if request.is_ajax():
            s = serializers.serialize('json', [Template.objects.get(name=templnum)])
            return HttpResponse(s, content_type='application/json')
        else:
            return render(request,'edit.html')
    elif templnum == '' and id != 0:
        if request.is_ajax():
            s = serializers.serialize('json', [PostCard.objects.get(id=id)])
            return HttpResponse(s, content_type='application/json')
        else:
            return render(request, 'edit.html')


def getlist(request, num=-1):
    if request.is_ajax():
        if num == -1:
            tlist = Template.objects.all()
            data = serializers.serialize("json", tlist)
        else:
            slist = PostCard.objects.all()
            if request.GET.get('user')==None:
                data = serializers.serialize("json", slist[int(num): int(num)+2])
            else:
                data = serializers.serialize("json",PostCard.objects.filter(user=request.user))
    return HttpResponse(data, content_type='application/json')


def showPostCard(request, id=1):
    if request.is_ajax():
        s=serializers.serialize('json',[PostCard.objects.get(id=id)])
        return HttpResponse(s, content_type='application/json')
    else:
        return render(request, 'PostCardView.html')


def rate(request):
    data = {}
    if request.is_ajax():
        user = request.user
        if request.POST:
            rating = int(request.POST['value'])
            postcard = PostCard.objects.get(id=int(request.POST['id']))
            obj,create = PostCardRating.objects.update_or_create(user=user,post_card=postcard,defaults={'rate':rating})
            if create:
                postcard.update_rating(rating,create)
            else:
                postcard.update_rating(rating-obj.prev_rate,create)

            data['rating']=postcard.rating
            data['vote_num']=postcard.like_num

        if request.GET:
            postcard = PostCard.objects.get(id=int(request.GET.get('id')))
            obj = PostCardRating.objects.filter(user=user, post_card=postcard)
            data['rating'] = postcard.rating
            data['vote_num'] = postcard.like_num
            if obj.exists():
                data['user_rate'] = obj[0].rate
            else:
                data['user_rate'] = 0

    return HttpResponse(json.dumps(data), content_type="application/json")


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
    if request.is_ajax():
        data=serializers.serialize('json',TaggedItem.objects.get_by_model(PostCard,tag))
        return HttpResponse(data, content_type="application/json")
    else:
        return render(request, 'tag_view.html')



def user_rating(request):
    data={}
    if request.is_ajax():
        data['number']=PostCard.objects.filter(user=request.user).count()
        data['rating']=PostCard.objects.filter(user=request.user).aggregate(Avg('rating'))['rating__avg']
    return HttpResponse(json.dumps(data), content_type="application/json")


def update_user_profile(request, field):
    user = UserInfo.objects.get(user=request.user)
    update_data = request.POST['data']
    if field == 'firstname':
        user.first_name = update_data
    elif field == 'lastName':
        user.last_name = update_data
    elif field == 'telephone':
        user.last_name = int(update_data)
    elif field == 'description':
        user.description = update_data
    user.save()
    return HttpResponse('it s great deal')


def get_user_info(request):
    if request.is_ajax():
        data=r=serializers.serialize('json',[UserInfo.objects.get(user=request.user)])
    return HttpResponse(data, content_type="application/json")