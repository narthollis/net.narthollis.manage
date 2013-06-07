"use strict";

if (typeof(net) == "undefined") var net = {};
if (typeof(net.narthollis) == "undefined") net.narthollis = {};
if (typeof(net.narthollis.manage) == "undefined") net.narthollis.manage = {};
if (typeof(net.narthollis.manage.DNS) == "undefined") net.narthollis.manage.DNS = {};
if (typeof(net.narthollis.manage.DNS.Record) == "undefined") net.narthollis.manage.DNS.Record = {};
if (typeof(net.narthollis.manage.DNS.Record.Validators) == "undefined") net.narthollis.manage.DNS.Record.Validators = {};

net.narthollis.manage.DNS.Record.Validators.ttl = function(value) {
    return ((parseInt(value) + "") === (value + "")) && value > 0;
};

net.narthollis.manage.DNS.Record.Validators.VALID_HOSTNAME = /^(\*\.)?([a-z0-9_][a-z0-9-]*\.)*([a-z0-9_][a-z0-9-]*)$/;
net.narthollis.manage.DNS.Record.Validators.host = function(value) {
    if (value == "@" || value == "*") return true;
    return net.narthollis.manage.DNS.Record.Validators.VALID_HOSTNAME.test(value);
};

net.narthollis.manage.DNS.Record.Validators.fqdn = function(value) {
    var end = value[value.length - 1];
    if (end == '@' || end == '.') {
        return net.narthollis.manage.DNS.Record.Validators.host(value.substr(0, value.length -2));
    }
    return false;
};

net.narthollis.manage.DNS.Record.Validators.ipv4 = function(value) {
    var a = new v4.Address(value);
    return a.isValid();
};

net.narthollis.manage.DNS.Record.Validators.ipv6 = function(value) {
    var a = new v6.Address(value);
    return a.isValid();
};

net.narthollis.manage.DNS.Record.Base = function(pk, zone, fields) {
    if(typeof(pk) == "undefined") pk = -1;
    if(typeof(zone) == "undefined") zone = {'ttl': null};
    if(typeof(fields) == "undefined") fields = {};

    // Load Default Field Values in case of partial dict
    var fieldsDefault = {'type': null, 'host': '@', 'mx_priority': null, 'ttl': zone.ttl, 'data': ''};
    for (var key in fieldsDefault) {
        if (!fieldsDefault.hasOwnProperty(key)) continue;
        if (!fields.hasOwnProperty(key)) fields[key] = fieldsDefault[key];
    }

    var self = this;

    this.pk = pk;
    this.Zone = zone;

	this.type = fields['type'];
	this.host = fields['host'];
	this.mx_priority = fields['mx_priority'];
	this.ttl = fields['ttl'];
	this.data = fields['data'];

    this.rootElement = document.createElement('li');
    this.rootElement.className = 'nnmdns record ' + this.type
    this.formElem = document.createElement('form');
    this.formElem.addEventListener('submit', function(e) { self.saveRecord(e); } );
    this.formElem.addEventListener('input', function(e) { self.onValueChange(e); });
    this.formElem.addEventListener('change', function(e) { self.validate(); });

    this.typeElem = document.createElement('h3');
    this.rootElement.appendChild(this.typeElem);
    this.typeElem.innerHTML = this.type;

    this.form = {};

    this.rootElement.appendChild(this.formElem);

    this.form.ttl = new net.narthollis.elements.form.Input('TTL', 'ttl', this.ttl, 'number');
    this.form.ttl.validator = net.narthollis.manage.DNS.Record.Validators.ttl;
    this.form.ttl.autoDisplayErrors = true;
    this.formElem.appendChild(this.form.ttl.element);
    
    this.form.host = new net.narthollis.elements.form.Input('Host', 'host', this.host);
    this.form.host.validator = net.narthollis.manage.DNS.Record.Validators.host;
    this.form.host.autoDisplayErrors = true;
    this.formElem.appendChild(this.form.host.element);

    // ACTIONS
    this.actions = document.createElement('div');
    this.actions.className = 'actions';
    this.formElem.appendChild(this.actions);

    this.save = document.createElement('button');
    this.save.innerHTML = 'Save';
    this.save.setAttribute('type', 'submit');
    this.actions.appendChild(this.save);

    this.del = document.createElement('button');
    this.del.innerHTML = 'Delete';
    this.del.setAttribute('type', 'button');
    this.del.addEventListener('click', function(e) { self.deleteRecord(e); } );
    this.actions.appendChild(this.del);
};

net.narthollis.manage.DNS.Record.Base.prototype.toString = function() {
    return '[object DNS.Record.' + this.type + ' (' + this.ttl + ', "' + this.host + '")]';
};

net.narthollis.manage.DNS.Record.Base.prototype.formatData = function() {
    return null;
};

net.narthollis.manage.DNS.Record.Base.prototype.onValueChange = function(event) {
    if (this.formatData() != this.data || this.form.ttl.value != this.ttl || this.form.host.value != this.host) {
        this.rootElement.classList.add('notice');
    } else {
        this.rootElement.classList.remove('notice');
    }
};


net.narthollis.manage.DNS.Record.Base.prototype.saveRecord = function(event) {
    console.log('save');
};

net.narthollis.manage.DNS.Record.Base.prototype.validate = function() {
    var errors = [];

    for (var field in this.form) {
        if (this.form.hasOwnProperty(field)) {
            if (this.form[field] instanceof Array) {
                for (var i=0,len=this.form[field].length; i<len; i++) {
                    if (!this.form[field][i].validate()) {
                        errors[errors.length] = 'field' + i;
                    }
                }
            } else {
                if (!this.form[field].validate()) {
                    errors[errors.length] = field;
                }
            }
        }
    }

    return errors.length > 0;
};

net.narthollis.manage.DNS.Record.Base.prototype.deleteRecord = function(event) {
    console.log('delete');
};

net.narthollis.manage.DNS.Record.Base.prototype.draw = function(base) {
    base.appendChild(this.rootElement);
};

net.narthollis.manage.DNS.Record.A = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);

    this.form.address = new net.narthollis.elements.form.Input('Address', 'address', this.data);
    this.form.address.autoDisplayErrors = true;
    this.formElem.appendChild(this.form.address.element);

    this.form.address.validator = net.narthollis.manage.DNS.Record.Validators.ipv4;
};

net.narthollis.manage.DNS.Record.A.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.A.prototype.formatData = function() {
    return this.form.address.value;
};

net.narthollis.manage.DNS.Record.AAAA = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.A, pk, zone, fields);

    this.form.address.validator = net.narthollis.manage.DNS.Record.Validators.ipv6;
};

net.narthollis.manage.DNS.Record.AAAA.Inherits(net.narthollis.manage.DNS.Record.A);

net.narthollis.manage.DNS.Record.APL = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);

    var self = this;

    this.addRange = document.createElement('button');
    this.addRange.innerHTML = 'Add Range';
    this.addRange.setAttribute('type', 'button');
    this.addRange.addEventListener('click', function(e) { self.onAddRange(e); });
    this.actions.insertBefore(this.addRange, this.save);

    this.form.ranges = [];

    this.rootElement.appendChild(document.createElement('p'));
    this.rootElement.children[this.rootElement.children.length - 1].innerHTML = "Address type will be automaticly detected, prepend an ! to make the range an exclude.";
};

net.narthollis.manage.DNS.Record.APL.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.APL.prototype.onAddRange = function(event) {
    var i = this.form.ranges.length;
    this.form.ranges[i] = new net.narthollis.elements.form.Input('', 'range[' + i + ']');
    this.formElem.appendChild(this.form.ranges[i].element);
};

net.narthollis.manage.DNS.Record.APL.prototype.formatData = function() {
    var data = '';
    for (var i=0,len=this.form.ranges.length; i<len; i++) {
        var value = this.form.ranges[i].value;
        if (value[0] == '!') {
            data = data + '!';
            value = value.substr(1, value.length);
        }
        value = value.split('/');

        if (net.narthollis.manage.DNS.Record.Validators.ipv6(value[0])) {
            data = data + '2:'+value[0]+'/'+value[1] + ' ';
        } else {
            data = data + '1:'+value[0]+'/'+value[1] + ' ';
        }
    }

    return data;
};

net.narthollis.manage.DNS.Record.CERT = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);

    this.form.type = ''; // need to make select input... YEEy
    this.form.keytag = '';
};

net.narthollis.manage.DNS.Record.CERT.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.CNAME = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.CNAME.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.DHCID = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.DHCID.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.DLV = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.DLV.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.DNAME = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.DNAME.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.DNSKEY = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.DNSKEY.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.DS = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.DS.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.HIP = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.HIP.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.IPSECKEY = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.IPSECKEY.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.KEY = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.KEY.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.KX = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.KX.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.LOC = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.LOC.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.MX = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.MX.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.NAPTR = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.NAPTR.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.NS = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.NS.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.NSEC = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.NSEC.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.NSEC3 = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.NSEC3.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.NSEC3PARAM = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.NSEC3PARAM.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.PTR = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.PTR.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.RRSIG = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.RRSIG.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.RP = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.RP.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.SIG = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.SIG.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.SOA = function(zone) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, -1, zone, {'type': 'SOA', 'host': null, 'mx_priority': null, 'ttl': null, 'data': null});

    for (var i in this.form) {
        if (!this.form.hasOwnProperty(i)) continue;
        this.formElem.removeChild(this.form[i].element);
    }
    this.form = {};

    this.form.primary_ns = new net.narthollis.elements.form.Input('Name Server', 'primary_ns', zone.primary_ns);
    this.formElem.appendChild(this.form.primary_ns.element);

    this.form.contact = new net.narthollis.elements.form.Input('Contact', 'contact', zone.contact);
    this.formElem.appendChild(this.form.contact.element);

    this.form.serial = new net.narthollis.elements.form.Input('Serial Number', 'serial', zone.serial, 'number');
    this.formElem.appendChild(this.form.serial.element);
    
    this.form.ttl = new net.narthollis.elements.form.Input('TTL', 'ttl', zone.ttl, 'number');
    this.formElem.appendChild(this.form.ttl.element);

    this.form.refresh = new net.narthollis.elements.form.Input('Refresh', 'refresh', zone.refresh, 'number');
    this.formElem.appendChild(this.form.refresh.element);

    this.form.retry = new net.narthollis.elements.form.Input('Retry', 'retry', zone.retry, 'number');
    this.formElem.appendChild(this.form.retry.element);

    this.form.expire = new net.narthollis.elements.form.Input('Expiry', 'expire', zone.expire, 'number');
    this.formElem.appendChild(this.form.expire.element);

    this.form.minimum = new net.narthollis.elements.form.Input('Neg-Cache', 'minimum', zone.minimum, 'number');
    this.formElem.appendChild(this.form.minimum.element);


};

net.narthollis.manage.DNS.Record.SOA.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.SPF = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.SPF.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.SRV = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.SRV.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.SSHFP = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.SSHFP.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.TA = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.TA.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.TKEY = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.TKEY.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.TLSA = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.TLSA.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.TSIG = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.TSIG.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.TXT = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.TXT.Inherits(net.narthollis.manage.DNS.Record.Base);

