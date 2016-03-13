from django.conf.urls import include, url

import dns.views
import dns.api

api_patterns = [
    url(
        r'^zone(/(?P<zone_id>[0-9]+)|/?)?$',
        dns.api.zone,
        name='api_zone'
    ),
    url(
        r'^zone/(?P<zone_id>[0-9]+)/record(/(?P<record_id>[0-9]+)|/?)?$',
        dns.api.record,
        name='api_record'
    )
]

dns_patterns = [
    url(
        r'^$',
        dns.views.index,
        name='index'
    ),
    url(
        r'^zone/?$',
        dns.views.zone_list,
        name='zone_list'
    ),
    url(
        r'^zone/add/?$',
        dns.views.zone_add,
        name='zone_add'
    ),
    url(
        r'^zone/(?P<zone>[0-9]+)/?$',
        dns.views.zone_get,
        name='zone_get'
    ),
    url(
        r'^zone/(?P<zone>[0-9]+)/delete/?',
        dns.views.zone_delete,
        name='zone_get'
    ),
    url(
        r'^zone/(?P<zone>[0-9]+)/record/?$',
        dns.views.record_list,
        name='record_list'
    ),
    url(
        r'^zone/(?P<zone>[0-9]+)/record/add/?$',
        dns.views.record_add,
        name='record_add'
    ),
    url(
        r'^zone/(?P<zone>[0-9]+)/record/(?P<record>[0-9]+)/?$',
        dns.views.record_get,
        name='record_get'
    ),
    url(
        r'^zone/(?P<zone>[0-9]+)/record/(?P<record>[0-9]+)/edit/?$',
        dns.views.record_edit,
        name='record_edit'
    ),
    url(
        r'^zone/(?P<zone>[0-9]+)/record/(?P<record>[0-9]+)/delete/?$',
        dns.views.record_delete,
        name='record_delete'
    ),
    url(
        r'^api/',
        include(api_patterns, namespace="api", app_name="api"),
    )
]


urlpatterns = [
    url(
        r'',
        include(dns_patterns, namespace="dns", app_name='dns'),
    )
]
