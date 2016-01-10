# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('postcard', '0002_auto_20160110_1948'),
    ]

    operations = [
        migrations.RenameField(
            model_name='template',
            old_name='template_url',
            new_name='picture_url',
        ),
        migrations.AlterField(
            model_name='template',
            name='canvas_url',
            field=models.CharField(max_length=40),
        ),
    ]
