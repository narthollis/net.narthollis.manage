from django.conf.urls import patterns, include, url

import dns.views

urlpatterns = patterns('',
    url(r'^$', dns.views.index, name='index'),
    url(r'^zone/?$', dns.views.list_zones, name='list_zones'),
    url(r'^zone/add/?$', dns.views.add_zone, name='add_zone'),
    url(r'^zone/(?P<zone>[0-9]+)/?$', dns.views.zone, name='zone'),
    url(r'^zone/(?P<zone>[0-9]+)/delete/?', dns.views.delete_zone, name='delete_zone'),
    url(r'^zone/(?P<zone>[0-9]+)/record/?$', dns.views.add_record, name='add_record'),
    url(r'^zone/(?P<zone>[0-9]+)/record/(?P<record>[0-9]+)/edit/?$', dns.views.edit_record, name='edit_record'),
    url(r'^zone/(?P<zone>[0-9]+)/record/(?P<record>[0-9]+)/delete/?$', dns.views.edit_record, name='delete_record')
)
