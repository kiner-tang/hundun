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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonStore = exports.genCommonStoreState = void 0;
var mobx_1 = require("mobx");
function genCommonStoreState() {
    return {
        loading: false,
    };
}
exports.genCommonStoreState = genCommonStoreState;
var CommonStore = /** @class */ (function () {
    function CommonStore() {
        this.state = genCommonStoreState();
    }
    CommonStore.prototype.setGlobalLoading = function (loading) {
        console.log(loading);
        this.state = __assign(__assign({}, this.state), { loading: loading });
    };
    __decorate([
        mobx_1.observable
    ], CommonStore.prototype, "state", void 0);
    __decorate([
        mobx_1.action
    ], CommonStore.prototype, "setGlobalLoading", null);
    return CommonStore;
}());
exports.CommonStore = CommonStore;
