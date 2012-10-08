from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'net_narthollis_manage.views.home', name='home'),
    # url(r'^net_narthollis_manage/', include('net_narthollis_manage.foo.urls')),

    url(r'^dns/', include('dns.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

)
