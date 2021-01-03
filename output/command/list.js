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
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
var logger_1 = require("../utils/logger");
var spinner_1 = require("../utils/spinner");
var utils_1 = require("../utils/utils");
var add_1 = require("./add");
var List = /** @class */ (function () {
    function List() {
        this.init().catch(function (e) { return logger_1.log.error("初始化异常", e); });
    }
    List.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var confs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, spinner_1.logWithSpinner(utils_1.keywordWhite("\u6B63\u5728\u62C9\u53D6\u6A21\u7248\u6570\u636E..."), logger_1.successMsgStyle("模版数据拉取成功"))];
                    case 1:
                        _a.sent();
                        try {
                            confs = add_1.Add.getConf();
                            spinner_1.stopSpinner();
                            console.log("========================================\u6A21\u7248\u9879\u76EE\u5217\u8868=======================================");
                            confs.forEach(function (item) {
                                console.log(utils_1.keywordWhite("* alias: " + utils_1.keywordCyan(item.name)));
                                console.log(utils_1.keywordCyan(" (repository)\uFF1A \t" + item.repositories));
                            });
                            console.log("===========================================================================================");
                        }
                        catch (e) {
                            spinner_1.failSpinner("\u6A21\u7248\u6570\u636E\u62C9\u53D6\u5931\u8D25");
                            logger_1.log.error("模版数据拉取失败", e);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return List;
}());
exports.List = List;
