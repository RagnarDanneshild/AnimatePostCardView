# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='postcard',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('picture_url', models.URLField()),
                ('like_num', models.IntegerField()),
                ('tag_field', models.TextField()),
                ('creation_date', models.DateField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='PostcardComments',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('body', models.TextField()),
                ('like_name', models.IntegerField()),
                ('post_card', models.ForeignKey(to='postcard.PostCard')),
            ],
        ),
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=15)),
                ('descripton', models.TextField()),
                ('template_url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='UserAchievement',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=15)),
                ('description', models.TextField()),
                ('badge_url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('user', models.OneToOneField(serialize=False, to=settings.AUTH_USER_MODEL, primary_key=True)),
                ('avatar', models.URLField()),
                ('description', models.TextField()),
                ('e_mail', models.EmailField(max_length=254)),
                ('telephone', models.CharField(max_length=15)),
                ('first_name', models.CharField(max_length=15)),
                ('last_name', models.CharField(max_length=15)),
                ('registration_data', models.DateField(auto_now_add=True)),
                ('rate', models.IntegerField()),
            ],
        ),
        migrations.AddField(
            model_name='userachievement',
            name='user',
            field=models.ForeignKey(to='postcard.UserInfo'),
        ),
        migrations.AddField(
            model_name='postcardcomments',
            name='user',
            field=models.OneToOneField(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='postcard',
            name='template',
            field=models.OneToOneField(to='postcard.Template'),
        ),
        migrations.AddField(
            model_name='postcard',
            name='user',
            field=models.ForeignKey(to='postcard.UserInfo'),
        ),
    ]
