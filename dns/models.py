from __future__ import unicode_literals
from django.db import models


class Zone(models.Model):
    id = models.AutoField(primary_key=True)
    zone = models.CharField(max_length=255, unique=True)
    primary_ns = models.CharField(max_length=255)
    contact = models.CharField(max_length=255)
    serial = models.BigIntegerField()
    refresh = models.IntegerField()
    retry = models.IntegerField()
    expire = models.IntegerField()
    minimum = models.IntegerField()
    ttl = models.IntegerField()

    def __str__(self):
        return self.zone

    class Meta:
        permissions = (
                ('view_records', 'Can only view zone records'),
                ('edit_soa', 'Can edit zone SOA'),
            )


class Record(models.Model):
    RECORD_TYPES = (
        ('A', 'A'),
        ('AAAA', 'AAAA'),
        ('AFSDB', 'AFSDB'),
        ('APL', 'APL'),
        ('CERT', 'CERT'),
        ('CNAME', 'CNAME'),
        ('DHCID', 'DHCID'),
        ('DLV', 'DLV'),
        ('DNAME', 'DNAME'),
        ('DNSKEY', 'DNSKEY'),
        ('DS', 'DS'),
        ('HIP', 'HIP'),
        ('IPSECKEY', 'IPSECKEY'),
        ('KEY', 'KEY'),
        ('KX', 'KX'),
        ('LOC', 'LOC'),
        ('MX', 'MX'),
        ('NAPTR', 'NAPTR'),
        ('NS', 'NS'),
        ('NSEC', 'NSEC'),
        ('NSEC3', 'NSEC3'),
        ('NSEC3PARAM', 'NSEC3PARAM'),
        ('PTR', 'PTR'),
        ('RRSIG', 'RRSIG'),
        ('RP', 'RP'),
        ('SIG', 'SIG'),
        ('SOA', 'SOA'),
        ('SPF', 'SPF'),
        ('SRV', 'SRV'),
        ('SSHFP', 'SSHFP'),
        ('TA', 'TA'),
        ('TKEY', 'TKEY'),
        ('TLSA', 'TLSA'),
        ('TSIG', 'TSIG'),
        ('TXT', 'TXT'),
    )

    id = models.AutoField(primary_key=True)
    zone = models.ForeignKey(Zone, help_text="Parent Zone", related_name="records")
    host = models.CharField(max_length=255, help_text="Host Name")
    ttl = models.IntegerField(help_text="Time to Live")
    rr_type = models.CharField(max_length=255, choices=RECORD_TYPES, help_text="Record Type")
    mx_priority = models.IntegerField(null=True, blank=True, help_text="MX priority")
    data = models.CharField(max_length=255, help_text="Entry Value")

    def get_rr_type_string(self):
        return self.rr_type
    rr_type_string = property(get_rr_type_string)

    def __str__(self):
        if self.mx_priority is not None:
            return '%s.%s IN %s %d %s' % (self.host, self.zone, self.type, self.mx_priority, self.data)
        else:
            return '%s.%s IN %s %s' % (self.host, self.zone, self.type, self.data)
