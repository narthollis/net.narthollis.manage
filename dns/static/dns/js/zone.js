"use strict";

if (typeof(net) == "undefined") var net = {};
if (typeof(net.narthollis) == "undefined") net.narthollis = {};
if (typeof(net.narthollis.manage) == "undefined") net.narthollis.manage = {};
if (typeof(net.narthollis.manage.DNS) == "undefined") net.narthollis.manage.DNS = {};

net.narthollis.manage.DNS.Zone = function(pk, fields) {
    var self = this;

    this.pk = pk;
    this.contact = fields['contact'];
	this.expire = fields['expire'];
	this.minimum = fields['minimum'];
	this.primary_ns = fields['primary_ns'];
	this.refresh = fields['refresh'];
	this.retry = fields['retry'];
	this.serial = fields['serial'];
	this.ttl = fields['ttl'];
	this.zone = fields['zone'];

    this.records = {};

    this.menuItem = document.createElement('li');
    this.menuItem.innerHTML = this.zone;
    this.menuItem.addEventListener('click', function(e) { self.menuItemOnClick(e); });

    net.narthollis.manage.DNS.Main.menu.appendChild(this.menuItem);
};

net.narthollis.manage.DNS.Zone.prototype.menuItemOnClick = function(event) {
    this.loadRecords();
};

net.narthollis.manage.DNS.Zone.prototype.loadRecords = function() {
    var self = this;
    var xhr = new XMLHttpRequest;

    xhr.open('GET', 'zone/' + this.pk + '/');
    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            self.__loadRecords(this);
        }
    };

    xhr.send(null);
};

net.narthollis.manage.DNS.Zone.prototype.__loadRecords = function(xhr) {
    var data = JSON.parse(xhr.responseText);

    for (var i=0,len=data.length; i<len; i++) {
        var rec = new net.narthollis.manage.DNS.Record[data[i]['fields']['type']](
                this, data[i]['pk'],
                data[i]['fields']
            );

        this.records[data[i]['pk']] = rec;
    }
};





