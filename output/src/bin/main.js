#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var command = require("commander");
var clear_1 = require("../command/clear");
var create_1 = require("../command/create");
var list_1 = require("../command/list");
var utils_1 = require("../utils/utils");
var add_1 = require("../command/add");
var remove_1 = require("../command/remove");
var pkg = require("../../package.json");
command
    .version(pkg.version);
command
    .usage("<command>");
command
    .command("add <alias> <repositories>")
    .description("新增一个github项目")
    .alias("a")
    .action(function (alias, repositories) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new add_1.Add(alias, repositories);
        return [2 /*return*/];
    });
}); });
command
    .command("remove <alias>")
    .description("删除一个别名")
    .alias("r")
    .action(function (alias) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new remove_1.Remove(alias);
        return [2 /*return*/];
    });
}); });
command
    .command("create <alias> <projectName>")
    .description("根据模版创建一个项目")
    .alias("c")
    .action(function (alias, projectName) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new create_1.Create(alias, projectName);
        return [2 /*return*/];
    });
}); });
command
    .command("list")
    .description("列出所有项目模版")
    .alias("l")
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, utils_1.fetchTplConfig()];
            case 1:
                _a.sent();
                new list_1.List();
                return [2 /*return*/];
        }
    });
}); });
command
    .command("clear")
    .description("清理缓存")
    .alias("c")
    .action(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        new clear_1.Clear();
        return [2 /*return*/];
    });
}); });
command.parse(process.argv);
if (!command.args || !command.args.length) {
    command.help();
}
