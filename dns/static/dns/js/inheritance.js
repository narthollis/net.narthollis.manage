"use strict";

Object.prototype.Inherits = function(parent) {
    if (arguments.length > 1) {
        parent.apply(this, Array.prototype.slice.call(arguments,1));
    } else {
        parent.call(this);
    }
};

Function.prototype.Inherits = function(parent) {
    this.prototype = new parent();
    this.prototype.constructor = this;
};

