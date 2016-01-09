from django.utils import timezone
from postcard.models import *
from django.db.models import Avg


def registerBadge(userinfo):
    return (timezone.now()-userinfo.registration_data).days >= 1

def createdPostCard1(userinfo):
    return PostCard.objects.filter(user=userinfo.user).count()>=1


def createdPostCard10(userinfo):
    return PostCard.objects.filter(user=userinfo.user).count()>=10


def top_user(userinfo):
    return PostCard.objects.filter(user=userinfo.user).count()>=5 and PostCard.objects.filter(user=userinfo.user).aggregate(Avg('rating'))['rating__avg']>4.5

def mark_user(userinfo):
     return PostCardRating.objects.filter(user=userinfo.user).count()>=10