# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('postcard', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='postcardcomments',
            name='like_name',
        ),
        migrations.AddField(
            model_name='postcardcomments',
            name='like_count',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='postcard',
            name='like_num',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='rate',
            field=models.IntegerField(default=0),
        ),
    ]
