"use strict";

//* package net.narthollis.elements.form

if (typeof(net) == "undefined") var net = {};
if (typeof(net.narthollis) == "undefined") net.narthollis = {};
if (typeof(net.narthollis.elements) == "undefined") net.narthollis.elements = {};
if (typeof(net.narthollis.elements.form) == "undefined") net.narthollis.elements.form = {};

/**
 * @class net.narthollis.elements.form.TextInput
 * 
 * A Form Input Helper
 * 
 * This class helps construct, manage and validate <input> elements
 * 
 * @param label Label for the input
 * @param name (OPTIONAL) The name attribute of the element DEFAULT=label_text
 * @param value (OPTIONAL) Tha initial value of the element DEFAULT=
 */
net.narthollis.elements.form.TextInput = function(label, name, value, type) {
    if(typeof(label) == "undefined") throw "Label Required";
    if(typeof(type) == "undefined") type = "text";
    if(typeof(name) == "undefined") name = label.replace(/\W/, '_') + '_' + type;
    if(typeof(value) == "undefined") value = null;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', type);
    
    this.__input.setAttribute('id', 'nnei_' + net.narthollis.Uid() + name);

    this.__label = document.createElement('label');
    this.__label.setAttribute('for', this.__input.getAttribute('id'));

    this.__div = document.createElement('div');
    this.__div.className = 'nnjs form input ' + type;
    this.__div.appendChild(this.__label);
    this.__div.appendChild(this.__input);

    this.__validator = null;

    this.autoDisplayErrors = false;
    
    this.label = label;
    this.name = name;
    if(value !== null) {
        this.value = value;
    };
};

net.narthollis.elements.form.TextInput.prototype.setLabel = function(label) {
    this.__label.innerHTML = label;
}

net.narthollis.elements.form.TextInput.prototype.setName = function(label) {
    this.__input.innerHTML = label;
}

net.narthollis.elements.form.TextInput.prototype.setValue = function(value) {
    this.__input.setAttribute('value', value);
}

/**
 * @method net.narthollis.elements.form.TextInput.setHelpText
 * 
 * Sets the fields help text
 */
net.narthollis.elements.form.TextInput.prototype.setHelpText = function(text) {
    if (typeof(this.__helpText) == 'undefined' || this.__helpText == null) {
        if (typeof(text) == 'undefined' || text == null) {
            this.__div.removeChild(this.__helpText);
            this.__helpText = null;
            return;
        }
        this.__helpText = document.createElement('p');
        this.__helpText.className = 'helptext';
        this.__div.appendChild(this.__helpText);
    }

    this.__helpText.innerHTML = text;
};

net.narthollis.elements.form.TextInput.prototype.setValidator = function(value) {
    if (typeof(value) != "function") throw "TypeError: Must Be a function" 

    this.__validator = value;
};

net.narthollis.elements.form.TextInput.prototype.getLabel = function() {
    return this.__label.innerHTML;
};

net.narthollis.elements.form.TextInput.prototype.getName = function() {
    return this.__input.getAttribute('name');
};

net.narthollis.elements.form.TextInput.prototype.getValue = function() {
    return this.__input.value;
};

net.narthollis.elements.form.TextInput.prototype.getElement = function() {
    return this.__div;
};

net.narthollis.elements.form.TextInput.prototype.getHelpText = function() {
    return this.__helpText.innerHTML;
};

net.narthollis.elements.form.TextInput.prototype.__defineSetter__("label", net.narthollis.elements.form.TextInput.prototype.setLabel);
net.narthollis.elements.form.TextInput.prototype.__defineSetter__("name", net.narthollis.elements.form.TextInput.prototype.setName);
net.narthollis.elements.form.TextInput.prototype.__defineSetter__("value", net.narthollis.elements.form.TextInput.prototype.setValue);
net.narthollis.elements.form.TextInput.prototype.__defineSetter__("helptext", net.narthollis.elements.form.TextInput.prototype.setHelpText);
net.narthollis.elements.form.TextInput.prototype.__defineSetter__("validator", net.narthollis.elements.form.TextInput.prototype.setValidator);

net.narthollis.elements.form.TextInput.prototype.__defineGetter__("label", net.narthollis.elements.form.TextInput.prototype.getLabel);
net.narthollis.elements.form.TextInput.prototype.__defineGetter__("name", net.narthollis.elements.form.TextInput.prototype.getName);
net.narthollis.elements.form.TextInput.prototype.__defineGetter__("value", net.narthollis.elements.form.TextInput.prototype.getValue);
net.narthollis.elements.form.TextInput.prototype.__defineGetter__("element", net.narthollis.elements.form.TextInput.prototype.getElement);
net.narthollis.elements.form.TextInput.prototype.__defineGetter__("helptext", net.narthollis.elements.form.TextInput.prototype.getHelpText);

/**
 * @method net.narthollis.elements.form.TextInput.validate
 * 
 * @retuns boolean True if the input is ok, false otherwise
 */
net.narthollis.elements.form.TextInput.prototype.validate = function() {
    if (this.__validator === null) return true;
    var result = this.__validator(this.value);
    if (this.autoDisplayErrors) {
        if (result) {
            this.clearError();
        } else {
            this.displayError();
        }
    }
    return result;
};

/**
 * @method net.narthollis.elements.form.TextInput.disable
 * 
 * Disables the input
 */
net.narthollis.elements.form.TextInput.prototype.disable = function() {
    this.__input.disabled = true;
    this.__div.className = this.__div.className + ' disabled';
};

/**
 * @method net.narthollis.elements.form.TextInput.enable
 * 
 * Enables the input
 */
net.narthollis.elements.form.TextInput.prototype.enable = function() {
    this.__input.disabled = false;

    var classes = this.__div.className.split(' ');
    this.__div.className = '';
    for (var i=0,len=classes.length; i<len; i++) {
        if (classes[i] != 'disabled' && classes[i] != '') {
            this.__div.className = this.__div.className + ' ' + classes[i];
        }
    }
};

/**
 * @method net.narthollis.elements.form.TextInput.displayError
 * 
 * Displays an error message
 * 
 * @param errorMessage (OPTIONAL) the message to display
 */
net.narthollis.elements.form.TextInput.prototype.displayError = function(message) {
    if(typeof(message) == "undefined") message = this.genericErrorMessage;

    this.__div.className = this.__div.className + ' error';

    if (typeof(message) != "undefined" && message != null) {
        this.error = document.createElement('p');
        this.error.innerHTML = message;
        this.__div.appendChild(this.error);
    }
};

/**
 * @method net.narthollis.elements.form.TextInput.clearError
 * 
 * Clears any error messages
 */
net.narthollis.elements.form.TextInput.prototype.clearError = function() {
    if (this.error) {
        this.__div.removeChild(this.error);
        delete this.error;
    }

    var classes = this.__div.className.split(' ');
    this.__div.className = '';
    for (var i=0,len=classes.length; i<len; i++) {
        if (classes[i] != 'error' && classes[i] != '') {
            this.__div.className = this.__div.className + ' ' + classes[i];
        }
    }
};

/**
 * @method net.narthollis.elements.form.TextInput.enable
 * 
 * Enables the input
 */
net.narthollis.elements.form.TextInput.prototype.enable = function() {
    this.__input.disabled = false;

    var classes = this.__div.className.split(' ');
    this.__div.className = '';
    for (var i=0,len=classes.length; i<len; i++) {
        if (classes[i] != 'disabled' && classes[i] != '') {
            this.__div.className = this.__div.className + ' ' + classes[i];
        }
    }
};

/**
 * @method net.narthollis.elements.form.TextInput.displayError
 * 
 * Displays an error message
 * 
 * @param errorMessage (OPTIONAL) the message to display
 */
net.narthollis.elements.form.TextInput.prototype.displayError = function(message) {
    if(typeof(message) == "undefined") message = '';

    this.__div.className = this.__div.className + ' error';

    this.error = document.createElement('p');
    this.error.innerHTML = message;
    this.__div.appendChild(this.error);
};

/**
 * @method net.narthollis.elements.form.TextInput.clearError
 * 
 * Clears any error messages
 */
net.narthollis.elements.form.TextInput.prototype.clearError = function() {
    if(typeof(this.error) != 'undefined') {
        this.__div.removeChild(this.error);

        var classes = this.__div.className.split(' ');
        this.__div.className = '';
        for (var i=0,len=classes.length; i<len; i++) {
            if (classes[i] != 'error' && classes[i] != '') {
                this.__div.className = this.__div.className + ' ' + classes[i];
            }
        }

        delete this.error;
    }
};

/**
 * @method net.narthollis.elements.form.TextInput.addEventListener
 * 
 * Wrapper for the input elements addEventListener
 */
net.narthollis.elements.form.TextInput.prototype.addEventListener = function(type, func, bubble) {
    this.__input.addEventListener(type, func, bubble);
};



