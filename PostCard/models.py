from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save, pre_save
from jsonfield import JSONField
from tagging.fields import TagField
from tagging.models import Tag

# Create your models here.ага


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
    name = models.CharField(max_length=20)
    canvas = JSONField()
    template_url = models.CharField(max_length=40)


class PostCard(models.Model):

    user = models.ForeignKey(User,on_delete=models.CASCADE)
    picture_url = models.CharField(max_length=40)
    canvas = JSONField()
    name = models.CharField(max_length=20)
    rating = models.FloatField(default=0)
    like_num = models.IntegerField(default=0)
    tags = TagField()
    creation_date = models.DateTimeField(auto_now_add=True)

    def update_rating(self, new_one, status):
        if (status):
            self.rating = (self.rating*self.like_num+new_one)/(self.like_num+1)
            self.like_num += 1
        else:
            self.rating =(self.rating*self.like_num+new_one)/self.like_num
        self.save()


class PostcardComments(models.Model):

    post_card = models.ForeignKey(PostCard,on_delete=models.CASCADE)
    body = models.TextField()
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    like_count = models.IntegerField(default=0)
    creation_date = models.DateTimeField(auto_now_add=True)


class PostCardRating(models.Model):
    post_card = models.ForeignKey(PostCard,on_delete=models.CASCADE)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
    prev_rate = models.IntegerField(default=0)


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

def get_old_rating(sender, instance, **kwargs):
            if instance.id:
                old_data = PostCardRating.objects.get(pk=instance.id)

                instance.prev_rate=old_data.rate

pre_save.connect(get_old_rating,sender=PostCardRating)