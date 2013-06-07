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

    this.recordElem = document.createElement('ul');

    this.soa = new net.narthollis.manage.DNS.Record.SOA(this);
    this.soa.draw(this.recordElem);

    this.recordElem.appendChild(document.createElement('li'));
    this.recordElem.children[1].appendChild(document.createElement('h3'));
    this.recordElem.children[1].children[0].innerHTML = 'New Record';
    this.recordElem.children[1].appendChild(document.createElement('form'));
    this.recordElem.children[1].children[1].addEventListener('submit', function(e) { self.addRecord(e); });
    this.newSelect = new net.narthollis.elements.form.Select('RR Type', [], 'rrtypes', 'rrtypes');
    this.recordElem.children[1].children[1].appendChild(this.newSelect.element);
    this.recordElem.children[1].children[1].appendChild(document.createElement('div'));
    this.recordElem.children[1].children[1].children[1].className = 'actions';
    this.addButton = document.createElement('button');
    this.addButton.setAttribute('type', 'submit');
    this.addButton.innerHTML = 'Add';
    this.recordElem.children[1].children[1].children[1].appendChild(this.addButton);

    for (var rr in net.narthollis.manage.DNS.Record) {
        if (!net.narthollis.manage.DNS.Record.hasOwnProperty(rr)) continue;
        if (rr == 'Base' || rr == 'Validators' || rr == 'SOA') continue;
        this.newSelect.addOption(rr, rr);
    };
};

net.narthollis.manage.DNS.Zone.prototype.addRecord = function(event) {
    event.stopPropagation();
    event.preventDefault();

    var rec = new net.narthollis.manage.DNS.Record[this.newSelect.value](null, this, {'type': this.newSelect.value});
    rec.draw(this.recordElem);
    rec.onValueChange();
    this.records[net.narthollis.Uid()] = rec;
    rec.rootElement.scrollIntoView();
};

net.narthollis.manage.DNS.Zone.prototype.menuItemOnClick = function(event) {
    for (var i=0,len=net.narthollis.manage.DNS.Main.menu.children.length; i<len; i++) {
        net.narthollis.manage.DNS.Main.menu.children[i].className = '';
    }
    this.menuItem.className = 'active';

    this.loadRecords();

    for (var i=0,len=net.narthollis.manage.DNS.Main.contentArea.children.length;i<len;i++) {
        net.narthollis.manage.DNS.Main.contentArea.removeChild(net.narthollis.manage.DNS.Main.contentArea.children[i]);
    }

    net.narthollis.manage.DNS.Main.contentArea.appendChild(this.recordElem);
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
        this.records[data[i]['pk']].draw(this.recordElem);
    }
};

