"use strict";

var __InitTasks = function() {
    this.tasks = [];
    this.hasRun = false;
};

__InitTasks.prototype.add = function(func, obj, args) {
    if (typeof(func) == "undefined") throw "Function required";
    if (typeof(obj) == "undefined") obj = null;
    if (typeof(args) == "undefined") args = [];

    if (this.hasRun) {
        func.apply(obj, args);
    } else {
        this.tasks[this.tasks.length] = [func, obj, args];
    }
};

__InitTasks.prototype.run = function() {
    this.hasRun = true;

    for (var i=0,len=this.tasks.length; i<len; i++) {
        this.tasks[i][0].apply(this.tasks[i][1], this.tasks[i][2]);
    }
};

var InitTasks = new __InitTasks();
