# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-13 01:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('dns', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='record',
            old_name='type',
            new_name='rr_type',
        ),
    ]
