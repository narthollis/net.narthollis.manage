
import django.http
import django.shortcuts
import django.contrib.auth.decorators
from django.core import serializers

from guardian.shortcuts import get_objects_for_user
from guardian.decorators import permission_required_or_403

from dns import models as dns

@django.contrib.auth.decorators.login_required
def index(request):
    return django.shortcuts.render(request, 'dns/index.html')

@django.contrib.auth.decorators.login_required
def zone_list(request):
    zones = get_objects_for_user(request.user, 'dns.view_records')

    response = django.http.HttpResponse()

    json_serializer = serializers.get_serializer("json")()
    json_serializer.serialize(zones, ensure_ascii=False, stream=response, fields=('zone',))

    return response

@django.contrib.auth.decorators.login_required
@django.contrib.auth.decorators.permission_required('dns.add_zone')
def zone_add(request):
    pass

@django.contrib.auth.decorators.login_required
def zone_delete(request, zone):
    pass

@django.contrib.auth.decorators.login_required
@permission_required_or_403('dns.view_records', (dns.Zone, 'pk', 'zone'))
def zone_get(request, zone):
    zone = dns.Zone.objects.get(pk=zone)

    json_serializer = serializers.get_serializer("json")()
    data = json_serializer.serialize([zone], ensure_ascii=False)
    data = data[1:]
    data = data[:-1]

    return django.http.HttpResponse(data)

@django.contrib.auth.decorators.login_required
@permission_required_or_403('dns.view_records', (dns.Zone, 'pk', 'zone'))
def record_list(request, zone):
    records = dns.Record.objects.filter(zone=zone)

    response = django.http.HttpResponse()

    json_serializer = serializers.get_serializer("json")()
    json_serializer.serialize(records, ensure_ascii=False, stream=response)

    return response

@django.contrib.auth.decorators.login_required
def record_add(request, zone):
    pass

@django.contrib.auth.decorators.login_required
@permission_required_or_403('dns.view_records', (dns.Zone, 'pk', 'zone'))
def record_get(request, zone, record):
    record = dns.Record.objects.filter(zone=zone, pk=record)

    json_serializer = serializers.get_serializer("json")()
    data = json_serializer.serialize([record[0]], ensure_ascii=False)
    data = data[1:]
    data = data[:-1]
    
    return django.http.HttpResponse(data)

@django.contrib.auth.decorators.login_required
def record_edit(request, zone, pk):
    pass

@django.contrib.auth.decorators.login_required
def record_delete(request, zone, pk):
    pass

