import graphene

import dns.schema


class Query(dns.schema.Query):
    pass

schema = graphene.Schema(name="DNS Schema")
schema.query = Query
