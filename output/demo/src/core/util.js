"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.browser = exports.fitZero = exports.getQueryString = exports.createUpdateState = void 0;
function createUpdateState(setState) {
    return function (partialState) { return setState(function (oldState) {
        return (__assign(__assign({}, oldState), partialState));
    }); };
}
exports.createUpdateState = createUpdateState;
// 获取当前链接中的参数name的值
function getQueryString(name) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (pair[0] === name) {
            return pair[1];
        }
    }
    return '';
}
exports.getQueryString = getQueryString;
function fitZero(str, targetLen) {
    if (targetLen === void 0) { targetLen = 4; }
    var len = str.length;
    var num = targetLen - len;
    if (num < 0) {
        return str;
    }
    else {
        return "" + '0'.repeat(num) + str;
    }
}
exports.fitZero = fitZero;
exports.browser = {
    /**
     * 判断是否安卓手机
     * @returns {boolean}
     */
    isAndroid: function () {
        var ua = typeof window === "object" ? window.navigator.userAgent : "";
        return /Android/i.test(ua);
    },
    /**
     * 判断是否ios
     * @returns {boolean}
     */
    isIOS: function () {
        var ua = typeof window === "object" ? window.navigator.userAgent : "";
        return /iPhone|iPod|iPad/i.test(ua);
    },
    /**
     * 判断是否为微信浏览器
     */
    isWeiXin: function () {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        return ua.match(/MicroMessenger/i);
    }
};
