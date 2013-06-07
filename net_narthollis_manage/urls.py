from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from net_narthollis_manage.views import ProfileUpdateView, IndexView

urlpatterns = patterns('',
    url(r'^$', IndexView.as_view(), name="index"),

    url(r'^dns/', include('dns.urls')),

#    url(r'^accounts/', include('registration.backends.default.urls')),
    url(r'^accounts/profile/?', ProfileUpdateView.as_view()),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),

)
