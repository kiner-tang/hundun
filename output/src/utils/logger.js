"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.Logger = exports.errorMsgStyle = exports.errorStyle = exports.warningMsgStyle = exports.warningStyle = exports.successMsgStyle = exports.successStyle = exports.infoMsgStyle = exports.infoStyle = exports.logStyle = void 0;
var pak = require("../../package.json");
var chalk = require('chalk');
var logger;
exports.logStyle = chalk.white;
exports.infoStyle = chalk.bold.white;
exports.infoMsgStyle = chalk.bold.keyword("white");
exports.successStyle = chalk.bold.green;
exports.successMsgStyle = chalk.bold.keyword("green");
exports.warningStyle = chalk.bold.yellow;
exports.warningMsgStyle = chalk.bold.keyword("yellow");
exports.errorStyle = chalk.bold.red;
exports.errorMsgStyle = chalk.bold.keyword("red");
var Logger = /** @class */ (function () {
    function Logger(namespace) {
        if (namespace === void 0) { namespace = "[" + pak.name + "<" + pak.version + ">]\uFF1A"; }
        this.namespace = namespace;
    }
    Logger.prototype.info = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.info.apply(console, __spreadArrays([exports.infoStyle("" + this.namespace + exports.infoMsgStyle(msg))], args));
    };
    Logger.prototype.success = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.info.apply(console, __spreadArrays([exports.successStyle("" + this.namespace + exports.successMsgStyle(msg))], args));
    };
    Logger.prototype.warning = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.warn.apply(console, __spreadArrays([exports.warningStyle("" + this.namespace + exports.warningMsgStyle(msg))], args));
    };
    Logger.prototype.error = function (msg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.error.apply(console, __spreadArrays([exports.errorStyle("" + this.namespace + exports.errorMsgStyle(msg))], args));
    };
    Logger.getInstance = function (namespace) {
        if (logger) {
            return logger;
        }
        else {
            return (logger = new Logger(namespace));
        }
    };
    return Logger;
}());
exports.Logger = Logger;
exports.log = Logger.getInstance();
