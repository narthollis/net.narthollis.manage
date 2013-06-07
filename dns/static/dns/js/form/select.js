"use strict";

//* package net.narthollis.elements.form.element

if (typeof(net) == "undefined") var net = {};
if (typeof(net.narthollis) == "undefined") net.narthollis = {};
if (typeof(net.narthollis.elements) == "undefined") net.narthollis.elements = {};
if (typeof(net.narthollis.elements.form) == "undefined") net.narthollis.elements.form = {};

/**
 * @class net.narthollis.elements.form.Select
 * 
 * A Form Select Helper
 * 
 * This class helps construct, manage and validate <select> elements
 * 
 * @param label Label for the input
 * @param options Hash of options
 * @param name (OPTIONAL) The name attribute of the element DEFAULT=name_type
 * @param value (OPTIONAL) Tha initial value of the element DEFAULT=
 */
net.narthollis.elements.form.Select = function(label, options, name, value) {
	if(typeof(options) == "undefined") throw "Options required";

	this.Inherits(net.narthollis.elements.form.Input, label, name, value, 'select');

};

net.narthollis.elements.form.Select.Inherits(net.narthollis.elements.form.Input);


net.narthollis.elements.form.Select.prototype.addOptions = function(list) {
	for(var i in list) {
		if (!list.hasOwnProperty(i)) continue;

		this.addOption(options[i], i)
	}	
};

net.narthollis.elements.form.Select.prototype.addOption = function(value, text) {
    this.__input.options[this.__input.options.length] = new Option(value, text, 0, 0);
};

net.narthollis.elements.form.Select.prototype.removeOption = function(value) {
    for(var i in this.__input.options) {
    	if(!this.__input.options.hasOwnProperty(i)) continue;

    	if(!this.__input.options[i].value == value) {
    		this.__input.options.remove(i);
    	}
    }
};

/**
 * @method net.narthollis.elements.form.Select.getValue
 * 
 * @returns mixed Retruns the value of the Select
 */
net.narthollis.elements.form.Select.prototype.setValue = function(value) {
    for(var i in this.__input.options) {
    	if(!this.__input.options.hasOwnProperty(i)) continue;

    	if(!this.__input.options[i].value == value) {
    		this.__input.options[i].selected = true;
    	} else {
    		this.__input.options[i].selected = false;
    	}
    }
    
}
net.narthollis.elements.form.Select.prototype.__defineSetter__("value", net.narthollis.elements.form.Select.prototype.setValue);
net.narthollis.elements.form.Select.prototype.__defineGetter__("value", net.narthollis.elements.form.Input.prototype.getValue);

