"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page3 = void 0;
var react_1 = __importDefault(require("react"));
var BaseComponent_1 = require("@/components/BaseComponent");
var mobx_react_1 = require("mobx-react");
require("./Page3.scss");
var Page3 = /** @class */ (function (_super) {
    __extends(Page3, _super);
    function Page3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Page3.prototype.render = function () {
        return (<div className="page">
                页面3
            </div>);
    };
    Page3 = __decorate([
        mobx_react_1.inject('stores'),
        mobx_react_1.observer
    ], Page3);
    return Page3;
}(BaseComponent_1.BaseComponent));
exports.Page3 = Page3;
