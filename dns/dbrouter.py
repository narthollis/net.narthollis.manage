
class DnsAppRouter(object):
    def db_for_read(self, model, **hints):
        if model._meta.app_label == 'dns':
            return 'bind'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label == 'dns':
            return 'bind'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label == 'dns' or obj2._meta.app_label == 'dns':
            return True
        return None

    def allow_syncdb(self, db, model):
        if db == 'bind':
            return model._meta.app_label == 'dns'
        elif model._meta.app_label == 'dns':
            return False
        return None
