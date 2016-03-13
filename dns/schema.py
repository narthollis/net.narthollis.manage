from graphene import relay, ObjectType, Argument, String
from graphene.contrib.django.filter import DjangoFilterConnectionField
from graphene.contrib.django.types import DjangoNode

from guardian.shortcuts import get_objects_for_user

import dns.models as models


class Zone(DjangoNode):

    @classmethod
    def get_node(cls, id, info):
        if not info.request_context.user.is_authenticated():
            return None

        try:
            zone = cls._meta.model.objects.get(id=id)
        except cls._meta.model.DoesNotExist:
            return None

        if not info.request_context.user.has_perm('site.change_zone', zone):
            return None
        return zone


    class Meta:
        model = models.Zone
        filter_fields = {
            'zone': ['istartswith', 'exact']
        }


class Record(DjangoNode):
    rr_type_string = String()

    class Meta:
        model = models.Record
        filter_fields = {
            'host': ['istartswith', 'exact'],
            'rr_type': ['exact'],
            'data': ['istartswith', 'icontains', 'exact']
        }


class Query(ObjectType):
    zone = relay.NodeField(Zone)
    all_zones = DjangoFilterConnectionField(Zone)

    record = relay.NodeField(Record, rr_type=Argument(Record.rr_type), )

    def resolve_all_zones(self, args, info):
        if not info.request_context.user.is_authenticated():
            return models.Zone.objects.none()
        else:
            return get_objects_for_user(info.request_context.user, [], models.Zone)

    class Meta:
        abstract = True
