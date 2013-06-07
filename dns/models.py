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

    def __unicode__(self):
        return self.zone

    class Meta:
        permissions = (
                ('view_records', 'Can only view zone records'),
                ('edit_soa', 'Can edit zone SOA'),
            )


record_types = (
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

class Record(models.Model):
    id = models.AutoField(primary_key=True)
    zone = models.ForeignKey(Zone)
    host = models.CharField(max_length=255)
    ttl = models.IntegerField()
    type = models.CharField(max_length=255, choices=record_types)
    mx_priority = models.IntegerField(null=True, blank=True)
    data = models.CharField(max_length=255)

    def __unicode__(self):
        if self.mx_priority != None:
            return '%s.%s IN %s %d %s' % (self.host, self.zone, self.type, self.mx_priority, self.data)
        else:
            return '%s.%s IN %s %s' % (self.host, self.zone, self.type, self.data)

