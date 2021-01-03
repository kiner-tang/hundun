"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_1 = require("react-router");
var routeConfig_1 = require("./routeConfig");
var history_1 = __importDefault(require("./history"));
function AppRoute() {
    return (<react_router_1.Router history={history_1.default}>
      {routeConfig_1.routes.map(function (routeItem) { return <react_router_1.Route key={routeItem.name} exact={routeItem.extra} path={routeItem.path} component={routeItem.component}/>; })}
    </react_router_1.Router>);
}
exports.default = AppRoute;
