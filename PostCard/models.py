from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from jsonfield import JSONField
# Create your models here.


class UserInfo(models.Model):

    user = models.OneToOneField(User,primary_key=True)
    avatar = models.URLField()
    description = models.TextField()
    e_mail = models.EmailField()
    telephone = models.CharField(max_length=15)
    first_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    registration_data = models.DateTimeField(auto_now_add=True)
    rate = models.IntegerField(default=0)




class Template(models.Model):
    name = models.CharField(max_length=15)
    descripton = models.TextField()
    template_url = models.URLField()


class PostCard(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    picture_url = models.CharField(max_length=40)
    canvas=JSONField()
    name = models.CharField(max_length=20,default='noname')
    like_num = models.IntegerField(default=0)
    tag_field = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)



class PostcardComments(models.Model):

    post_card = models.ForeignKey(PostCard,on_delete=models.CASCADE)
    body = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    like_count = models.IntegerField(default=0)
    creation_date = models.DateTimeField(auto_now_add=True)


class UserAchievement(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=15)
    description = models.TextField()
    badge_url = models.URLField()


def create_user_profile(sender, instance, created, **kwargs):
        if created:
            profile=UserInfo(user=instance)
            profile.save()
post_save.connect(create_user_profile, sender=User)
