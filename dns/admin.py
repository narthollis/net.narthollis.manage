from django.contrib import admin
from guardian.admin import GuardedModelAdmin
from dns import models as dns

class Zone(GuardedModelAdmin):
    list_display = ('zone', 'serial')

class Record(admin.ModelAdmin):
    list_filter = ('zone', 'type')

admin.site.register(dns.Zone, Zone)
admin.site.register(dns.Record, Record)

