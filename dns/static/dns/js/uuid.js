"use strict";

//* package net.narthollis

if (typeof(net) == "undefined") var net = {};
if (typeof(net.narthollis) == "undefined") net.narthollis = {};

/**
 * @method net.narthollis.Uid
 * 
 * returns int returns a nonsecure unique Id
 */
net.narthollis.Uid = function() {
    var d = new Date();

    return String(d.getTime()) + Math.floor(Math.random()*1000);
};
