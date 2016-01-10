# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import tagging.fields
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('postcard', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PostCardRating',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, verbose_name='ID', auto_created=True)),
                ('rate', models.IntegerField(default=0)),
                ('prev_rate', models.IntegerField(default=0)),
            ],
        ),
        migrations.RemoveField(
            model_name='postcardcomments',
            name='post_card',
        ),
        migrations.RemoveField(
            model_name='postcardcomments',
            name='user',
        ),
        migrations.RemoveField(
            model_name='postcard',
            name='tag_field',
        ),
        migrations.RemoveField(
            model_name='postcard',
            name='template',
        ),
        migrations.RemoveField(
            model_name='template',
            name='descripton',
        ),
        migrations.AddField(
            model_name='postcard',
            name='canvas_url',
            field=models.CharField(default='', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='postcard',
            name='name',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='postcard',
            name='rating',
            field=models.FloatField(default=0),
        ),
        migrations.AddField(
            model_name='postcard',
            name='tags',
            field=tagging.fields.TagField(max_length=255, blank=True),
        ),
        migrations.AddField(
            model_name='template',
            name='canvas_url',
            field=models.CharField(default='', max_length=40),
        ),
        migrations.AlterField(
            model_name='postcard',
            name='creation_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='postcard',
            name='like_num',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='postcard',
            name='picture_url',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='postcard',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='template',
            name='name',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='template',
            name='template_url',
            field=models.CharField(max_length=40),
        ),
        migrations.AlterField(
            model_name='userachievement',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='rate',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='registration_data',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.DeleteModel(
            name='PostcardComments',
        ),
        migrations.AddField(
            model_name='postcardrating',
            name='post_card',
            field=models.ForeignKey(to='postcard.PostCard'),
        ),
        migrations.AddField(
            model_name='postcardrating',
            name='user',
            field=models.ForeignKey(to=settings.AUTH_USER_MODEL),
        ),
    ]
