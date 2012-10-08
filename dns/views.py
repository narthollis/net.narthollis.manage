
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
def list_zones(request):
    zones = get_objects_for_user(request.user, 'dns.view_records')

    response = django.http.HttpResponse()

    json_serializer = serializers.get_serializer("json")()
    json_serializer.serialize(zones, ensure_ascii=False, stream=response)

    return response

@django.contrib.auth.decorators.login_required
@django.contrib.auth.decorators.permission_required('dns.add_zone')
def add_zone(request):
    pass

@django.contrib.auth.decorators.login_required
def delete_zone(request, zone):
    pass

@django.contrib.auth.decorators.login_required
@permission_required_or_403('dns.view_records', (dns.Zone, 'pk', 'zone'))
def zone(request, zone):
    records = dns.Record.objects.filter(zone=zone)

    response = django.http.HttpResponse()

    json_serializer = serializers.get_serializer("json")()
    json_serializer.serialize(records, ensure_ascii=False, stream=response)

    return response

@django.contrib.auth.decorators.login_required
def add_record(request, zone):
    pass

@django.contrib.auth.decorators.login_required
def edit_record(request, zone, pk):
    pass

@django.contrib.auth.decorators.login_required
def delete_record(request, zone, pk):
    pass

