# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-04 10:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('host', models.CharField(max_length=255)),
                ('ttl', models.IntegerField()),
                ('type', models.CharField(choices=[('A', 'A'), ('AAAA', 'AAAA'), ('AFSDB', 'AFSDB'), ('APL', 'APL'), ('CERT', 'CERT'), ('CNAME', 'CNAME'), ('DHCID', 'DHCID'), ('DLV', 'DLV'), ('DNAME', 'DNAME'), ('DNSKEY', 'DNSKEY'), ('DS', 'DS'), ('HIP', 'HIP'), ('IPSECKEY', 'IPSECKEY'), ('KEY', 'KEY'), ('KX', 'KX'), ('LOC', 'LOC'), ('MX', 'MX'), ('NAPTR', 'NAPTR'), ('NS', 'NS'), ('NSEC', 'NSEC'), ('NSEC3', 'NSEC3'), ('NSEC3PARAM', 'NSEC3PARAM'), ('PTR', 'PTR'), ('RRSIG', 'RRSIG'), ('RP', 'RP'), ('SIG', 'SIG'), ('SOA', 'SOA'), ('SPF', 'SPF'), ('SRV', 'SRV'), ('SSHFP', 'SSHFP'), ('TA', 'TA'), ('TKEY', 'TKEY'), ('TLSA', 'TLSA'), ('TSIG', 'TSIG'), ('TXT', 'TXT')], max_length=255)),
                ('mx_priority', models.IntegerField(blank=True, null=True)),
                ('data', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Zone',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('zone', models.CharField(max_length=255, unique=True)),
                ('primary_ns', models.CharField(max_length=255)),
                ('contact', models.CharField(max_length=255)),
                ('serial', models.BigIntegerField()),
                ('refresh', models.IntegerField()),
                ('retry', models.IntegerField()),
                ('expire', models.IntegerField()),
                ('minimum', models.IntegerField()),
                ('ttl', models.IntegerField()),
            ],
            options={
                'permissions': (('view_records', 'Can only view zone records'), ('edit_soa', 'Can edit zone SOA')),
            },
        ),
        migrations.AddField(
            model_name='record',
            name='zone',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dns.Zone'),
        ),
    ]
