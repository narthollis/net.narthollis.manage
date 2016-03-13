from django.conf.urls import include, url
from django.views.decorators.csrf import csrf_exempt
from graphene.contrib.django.views import GraphQLView

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

from net_narthollis_manage.schema import schema

from net_narthollis_manage.views import ProfileUpdateView, IndexView

urlpatterns = [
    url(r'^$', IndexView.as_view(), name="index"),

    url(r'^dns/', include('dns.urls')),

#    url(r'^accounts/', include('registration.backends.default.urls')),
    url(r'^accounts/profile/?', ProfileUpdateView.as_view()),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^graphql', csrf_exempt(GraphQLView.as_view(schema=schema))),
    url(r'^graphiql', include('django_graphiql.urls')),

]