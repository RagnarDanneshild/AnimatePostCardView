from django.db import models
from django.contrib.auth.models import User
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

    user = models.ForeignKey(UserInfo,on_delete=models.CASCADE)
    picture_url = models.URLField()
    like_num = models.IntegerField(default=0)
    tag_field = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    template = models.ForeignKey(Template,on_delete=models.CASCADE)


class PostcardComments(models.Model):

    post_card = models.ForeignKey(PostCard,on_delete=models.CASCADE)
    body = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    like_count = models.IntegerField(default=0)
    creation_date = models.DateTimeField(auto_now_add=True)


class UserAchievement(models.Model):

    user = models.ForeignKey(UserInfo,on_delete=models.CASCADE)
    name = models.CharField(max_length=15)
    description = models.TextField()
    badge_url = models.URLField()


