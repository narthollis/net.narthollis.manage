"use strict";

if (typeof(net) == "undefined") var net = {};
if (typeof(net.narthollis) == "undefined") net.narthollis = {};
if (typeof(net.narthollis.manage) == "undefined") net.narthollis.manage = {};
if (typeof(net.narthollis.manage.DNS) == "undefined") net.narthollis.manage.DNS = {};
if (typeof(net.narthollis.manage.DNS.Record) == "undefined") net.narthollis.manage.DNS.Record = {};

net.narthollis.manage.DNS.Record.Base = function(pk, zone, fields) {
    if(typeof(pk) == "undefined") pk = -1;
    if(typeof(zone) == "undefined") zone = null;
    if(typeof(fields) == "undefined") fields = {'type': null, 'host': null, 'mx_priority': null, 'ttl': null, 'data': null};

    var self = this;

    this.pk = pk;
    this.Zone = zone;

	this.type = fields['type'];
	this.host = fields['host'];
	this.mx_priority = fields['mx_priority'];
	this.ttl = fields['ttl'];
	this.data = fields['data'];

    this.rootElement = document.createElement('li');
    this.form = document.createElement('form');
    this.form.addEventListener('submit', function(e) { self.saveRecord(e); } );

    this.rootElement.appendChild(this.form);

    this.actions = document.createElement('div');
    this.actions.className = 'actions';
    this.form.appendChild(this.actions);

    this.save = document.createElement('button');
    this.save.innerHTML = 'Save';
    this.save.setAttribute('type', 'submit');

    this.del = document.createElement('button');
    this.del.innerHTML = 'Delete';
    this.del.setAttribute('type', 'button');
    this.del.addEventListener('click', function(e) { self.deleteRecord(e); } );
};

net.narthollis.manage.DNS.Record.Base.prototype.saveRecord = function(event) {
    console.log('save');
};

net.narthollis.manage.DNS.Record.Base.prototype.deleteRecord = function(event) {
    console.log('delete');
};

net.narthollis.manage.DNS.Record.Base.prototype.draw = function() {
    
};

net.narthollis.manage.DNS.Record.A = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);    
};

net.narthollis.manage.DNS.Record.A.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.AAAA = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.AAAA.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.AFSDB = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.AFSDB.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.APL = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
};

net.narthollis.manage.DNS.Record.APL.Inherits(net.narthollis.manage.DNS.Record.Base);

net.narthollis.manage.DNS.Record.CERT = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
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

net.narthollis.manage.DNS.Record.SOA = function(pk, zone, fields) {
    this.Inherits(net.narthollis.manage.DNS.Record.Base, pk, zone, fields);
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

