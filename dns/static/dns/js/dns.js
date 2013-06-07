"use strict";

if (typeof(net) == "undefined") var net = {};
if (typeof(net.narthollis) == "undefined") net.narthollis = {};
if (typeof(net.narthollis.manage) == "undefined") net.narthollis.manage = {};
if (typeof(net.narthollis.manage.DNS) == "undefined") net.narthollis.manage.DNS = {};

net.narthollis.manage.DNS.__Main = function() {
    this.zones = {};
    
    this.leftBar = document.createElement('menu');
    document.body.appendChild(this.leftBar);
    this.leftBar.appendChild(document.createElement('h2'));
    this.leftBar.childNodes[0].innerHTML = 'Zones';

    this.menu = document.createElement('ul');
    this.leftBar.appendChild(this.menu);

    this.contentArea = document.createElement('article');
    document.body.appendChild(this.contentArea);

    this.getZones();
};

net.narthollis.manage.DNS.__Main.prototype.getZones = function() {
    var self = this;
    
    var xhr = new XMLHttpRequest;
    xhr.open('GET', 'zone/', true);
    xhr.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE) {
            self.__getZones(this);
        }
    };

    xhr.send(null);
};

net.narthollis.manage.DNS.__Main.prototype.__getZones = function(xhr) {
    var zones = JSON.parse(xhr.responseText)

    for (var i=0,len=zones.length; i<len; i++) {
        if (this.zones.hasOwnProperty(zones[i]['pk'])) {

        } else {
            this.zones[zones[i]['pk']] = new net.narthollis.manage.DNS.Zone(zones[i]['pk'], zones[i]['fields']);
        }
    }
};


net.narthollis.manage.DNS.Main = null;
InitTasks.add(function() {
    net.narthollis.manage.DNS.Main = new net.narthollis.manage.DNS.__Main();
});

