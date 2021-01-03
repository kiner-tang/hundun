"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
require("./index.scss");
var App_1 = __importDefault(require("./App"));
var reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
var react_hot_loader_1 = require("react-hot-loader");
var util_1 = require("@/core/util");
var vconsole_1 = __importDefault(require("vconsole"));
if (util_1.getQueryString('debug') === 'true') {
    new vconsole_1.default();
}
var rootEl = document.getElementById('root');
var WrapperAPP = process.env.BUILD_ENV === 'development' ? react_hot_loader_1.hot(module)(App_1.default) : App_1.default;
react_dom_1.default.render(<WrapperAPP />, rootEl);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals_1.default();
