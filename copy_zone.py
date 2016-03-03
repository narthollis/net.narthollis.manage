
from dns import models as dns

from django.db import transaction

@transaction.atomic
def copy_zone(zone_in, zone_out, fake=True, empty_out=False):
    zone_in  = dns.Zone.objects.get(zone=zone_in)
    zone_out = dns.Zone.objects.get(zone=zone_out)

    # Make a copy of the serial so that we can reset it at the end and not end up
    # with an excessivly large serial
    zone_out_serial = zone_out.serial

    if empty_out:
        for i in dns.Record.objects.filter(zone=zone_out):
            print('Delete', i)        
            if not fake:
                i.delete()

    for record in zone_in.record_set.all():
        record.pk = None
        record.zone = zone_out

        record.host = record.host.replace(zone_in.zone, zone_out.zone)
        record.data = record.data.replace(zone_in.zone, zone_out.zone)        

        print('Insert', record)

        if not fake:
            record.save()

    if not fake:
        zone_out.serial = zone_out_serial
        zone_out.increment_serial()
        zone_out.save()
 
