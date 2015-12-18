# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PostCard', '0002_auto_20151218_1428'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postcard',
            name='template',
            field=models.ForeignKey(to='PostCard.Template'),
        ),
    ]
