
import json
from functools import update_wrapper

import django.http
import django.core.exceptions
import django.shortcuts
import django.contrib.auth.decorators
from django.utils.decorators import method_decorator, classonlymethod
from django.views.generic.base import View
from django.views.decorators.csrf import csrf_exempt, csrf_protect


from guardian.shortcuts import get_objects_for_user
from guardian.decorators import permission_required_or_403


from dns import models as dns


class APIView(View):

    @classonlymethod
    def as_view(cls, *args, **kwargs):
        orig_view = super(APIView, cls).as_view(*args, **kwargs)

        def view(*args, **kwargs):
            try:
                return orig_view(*args, **kwargs)
            except django.http.Http404 as e:
                body = json.dumps({
                    'status': 404,
                    'message': str(e) if str(e) else 'Not Found'
                })
                return django.http.HttpResponseNotFound(body, content_type="application/json")
            except django.core.exceptions.PermissionDenied as e:
                body = json.dumps({
                    'status': 403,
                    'message': str(e) if str(e) else 'Permission Denied'
                })
                return django.http.HttpResponse(body)

        # take name and docstring from class
        update_wrapper(view, cls, updated=())
        
        # and possible attributes set by decorators
        # like csrf_exempt from dispatch
        update_wrapper(view, cls.dispatch, assigned=())
        return view


class DocumentedOptionsMixin(object):

    def options(self, request, *args, **kwargs):
        """
        ## OPTIONS ##
        Displayes the HTTP OPTIONS that can be used to access this endpoint
          and the documentation for those methods
        """
        body = str(self.__class__.__doc__)

        for method in self.http_method_names:
            try:
                if self.__class__.__dict__[method].__doc__:
                    body += '\n'
                    body += str(self.__class__.__dict__[method].__doc__)
                else:
                    body += '\n## %s ##\n' % method.upper()
            except KeyError:
                pass

        response = django.http.HttpResponse(body)
        response['Allow'] = ','.join([x.upper() for x in self.http_method_names])
        response['Content-Type'] = 'text/plain'

        return response


class Zone(APIView, DocumentedOptionsMixin):
    """
    # Zone #
    This endpoint provides access to Zone objects
    ## Object Definition ##
     *  **id** *integer* *read-only* The id of the zone
     *  **zone** *string* *not-editable* The full name of the zone
     *  **contact** *fully-qualified name* Dotted domain contact email address
     *  **primary_ns** *fully-qualified name* Primary Name Server for zone
     *  **serial** *integer* *read-only* The current domain serial
     *  **ttl** *integer* *seconds* SOA TTL
     *  **refresh** *integer* *seconds*
     *  **retry** *intrger* *seconds*
     *  **expire** *integer* *seconds*
     *  **minimum** *integer* *seconds*

    """

    @method_decorator(django.contrib.auth.decorators.login_required)
    def dispatch(self, *args, **kwargs):
        return super(Zone, self).dispatch(*args, **kwargs)

    @method_decorator(permission_required_or_403('dns.view_records', (dns.Zone, 'pk', 'zone_id')))
    def _get(self, request, *, zone_id):
        zone = dns.Zone.objects.values().get(pk=zone_id)
        
        data = json.dumps(zone)
        
        return django.http.HttpResponse(data)

    def _query(self, request):
        zones = get_objects_for_user(request.user, 'dns.view_records')
        zones = list(zones.values('id', 'zone'))

        data = json.dumps(zones)

        return django.http.HttpResponse(data)
    
    def get(self, request, zone_id=None):
        """
        ## GET ##
        If zone_id is specified it returnes a single zone matching that ID
        If zone_id is not specified it returnes a list of all zone_id that
        the current user has permission to access
        ### Parameters ###
        #### zone_id ####
        *optional*
        *integer*
        ID of the requested zone
        """
        
        if zone_id:
            return self._get(request, zone_id=zone_id)
        else:
            return self._query(request)

    #TODO: Permissions Check
    def post(self, request, *, zone_id=None):
        """
        ## POST ##
        Use this for creating or updating zone object
        ### Parameters ###
        #### zone_id ####
        *optional*
        *integer*
        ID of the zone to update
        """
        data = json.loads(request.body.decode('UTF-8'))

        if not zone_id:
            zone = dns.Zone(**data)
            zone.save()

            data['id'] = zone.pk
            
            response = django.http.HttpResponse(data)

    def delete(self, zone_id=None):
        """
        ## DELETE ##
        This is used for deleting zone objects
        ### Parameters ###
        #### zone_id ####
        *required*
        *integer*
        ID of the zone to delete
        """
        pass

zone = csrf_exempt(Zone.as_view())


class Record(View, DocumentedOptionsMixin):
    """
    # Record #
    This endpoint provides access to Record objects
    ## Object Definition ##
    """

    #TODO: Permissions Check

    def _get(self, request, *, zone, record_id):
        record = dns.Record.objects.values().get(zone=zone, pk=record_id)

        data = json.dumps(record)

        return django.http.HttpResponse(data)

    def _query(self, request, *, zone):
        records = dns.Record.objects.filter(zone=zone).values()

        data = json.dumps(list(records))

        return django.http.HttpResponse(data)

    def get(self, request, *, zone_id, record_id=None):
        zone = django.shortcuts.get_object_or_404(dns.Zone, pk=zone_id)

        if not record_id:
            return self._query(request, zone=zone)
        else:
            return self._get(request, zone=zone, record_id=record_id)

record = csrf_exempt(Record.as_view())

