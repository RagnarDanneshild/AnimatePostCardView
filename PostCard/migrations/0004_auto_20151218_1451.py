# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('PostCard', '0003_auto_20151218_1446'),
    ]

    operations = [
        migrations.AddField(
            model_name='postcardcomments',
            name='creation_date',
            field=models.DateTimeField(default=datetime.datetime(2015, 12, 18, 11, 51, 44, 644119, tzinfo=utc), auto_now_add=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='postcard',
            name='creation_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='userinfo',
            name='registration_data',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
