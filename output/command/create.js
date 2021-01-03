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
exports.Create = void 0;
var config_1 = require("../config");
var DataCollection_1 = require("../lib/DataCollection");
var logger_1 = require("../utils/logger");
var spinner_1 = require("../utils/spinner");
var utils_1 = require("../utils/utils");
var add_1 = require("./add");
var path = require("path");
var shell = require("shelljs");
var fs = require("fs-extra");
var Create = /** @class */ (function () {
    function Create(alias, projectName, dataSource) {
        if (dataSource === void 0) { dataSource = DataCollection_1.DataSource.commandLine; }
        this.alias = alias;
        this.projectName = projectName;
        this.dataSource = dataSource;
        this.promptList = [
            {
                type: "input",
                message: "请设置项目名称(当前目录则输入`.`):",
                name: "projectName",
                "default": "test-project" // 默认值
            },
            {
                type: "list",
                message: "你使用的包管理工具",
                name: "pkgManager",
                choices: config_1.pkgManagers
            },
            {
                type: "list",
                message: "请选择你想要根据哪个模版创建项目",
                name: "template",
                choices: []
            }
        ];
        this.projectPath = shell.pwd().stdout;
        this.config = {
            projectName: "",
            template: "",
            branch: "",
            pkgManager: ""
        };
        if (dataSource === DataCollection_1.DataSource.commandLine) {
            this.dc = new DataCollection_1.DataCollection(DataCollection_1.DataSource.commandLine);
            this.init();
        }
        else {
            this.dc = new DataCollection_1.DataCollection(DataCollection_1.DataSource.web);
        }
    }
    Create.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conf, res, promptList, packageManager;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.projectPath = path.join(this.projectPath, this.projectName);
                        conf = add_1.Add.getConfByAlia(this.alias);
                        if (!conf) {
                            logger_1.log.error("\u547D\u4EE4\uFF1A" + this.alias + "\u4E0D\u5B58\u5728");
                            return [2 /*return*/];
                        }
                        if (!fs.pathExistsSync(this.projectPath)) {
                            fs.mkdirpSync(this.projectPath);
                        }
                        res = shell.cd(this.projectPath).exec("git clone " + conf.repositories + " .");
                        if (res.code !== 0) {
                            spinner_1.failSpinner("\u514B\u9686\u6A21\u7248\u9879\u76EE[" + conf.name + "]\u5931\u8D25");
                            // @ts-ignore
                            process.exit(0);
                        }
                        promptList = [
                            {
                                type: "list",
                                message: "你使用的包管理工具",
                                name: "pkgManager",
                                choices: config_1.pkgManagers
                            }
                        ];
                        return [4 /*yield*/, this.dc.getData(promptList)];
                    case 1:
                        packageManager = _a.sent();
                        return [4 /*yield*/, this.patchProject()];
                    case 2:
                        _a.sent();
                        this.installDependencies(packageManager.pkgManager);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 从下载下来的项目中获取扩展配置
    Create.prototype.getExtendConfigFromProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var projectRoot, extendConfigPath, extendConfig, extendPrompt, config;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        projectRoot = this.projectPath;
                        extendConfigPath = path.join(projectRoot, ".config.tpl.extend.json");
                        if (!fs.existsSync(extendConfigPath)) return [3 /*break*/, 2];
                        extendConfig = require(extendConfigPath);
                        extendPrompt = extendConfig.extend.prompt;
                        return [4 /*yield*/, this.dc.getData(extendPrompt)];
                    case 1:
                        config = _a.sent();
                        this.mergeOption(config);
                        return [2 /*return*/, extendConfig];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    // 根据项目中的updatePkg更新package.json
    Create.prototype.updatePkgByExtendConfig = function (originalPkg, updatePkg) {
        utils_1.mergeJSON(updatePkg, originalPkg);
        utils_1.resolveArgs(originalPkg, this.config);
    };
    Create.prototype.mergeOption = function (config) {
        this.config = __assign(__assign({}, this.config), config);
    };
    Create.prototype.patchProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pkg, extendConfig_1, e_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pkg = require(path.join(this.projectPath, "package.json"));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getExtendConfigFromProject()];
                    case 2:
                        extendConfig_1 = _a.sent();
                        if (!extendConfig_1) {
                            return [2 /*return*/];
                        }
                        spinner_1.logWithSpinner(utils_1.keywordWhite("\u6B63\u5728\u4FEE\u6B63\u9879\u76EE\u914D\u7F6E..."), logger_1.successMsgStyle("\u9879\u76EE\u914D\u7F6E\u4FEE\u6B63\u6210\u529F"));
                        utils_1.patchPackageJSON(this.projectPath, pkg, this.config, function (originalPkg) {
                            if (extendConfig_1) {
                                var updatePkg = extendConfig_1.extend.updatePkg;
                                _this.updatePkgByExtendConfig(originalPkg, updatePkg);
                                utils_1.patchConf(_this.projectPath, _this.config, extendConfig_1.extend.updateConf);
                            }
                        });
                        spinner_1.stopSpinner(true);
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        spinner_1.failSpinner("\u4FEE\u6B63\u9879\u76EE\u51FA\u73B0\u5F02\u5E38");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Create.prototype.installDependencies = function (packageManager) {
        return __awaiter(this, void 0, void 0, function () {
            var projectPath, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spinner_1.logWithSpinner(utils_1.keywordWhite("\u6B63\u5728\u5B89\u88C5\u9879\u76EE\u4F9D\u8D56 "), logger_1.successMsgStyle("\u5B89\u88C5\u5B8C\u6210"));
                        projectPath = this.projectPath;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, utils_1.installDependencies(projectPath, packageManager)];
                    case 2:
                        _a.sent();
                        spinner_1.stopSpinner(true);
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        spinner_1.failSpinner("\u5B89\u88C5\u9879\u76EE\u4F9D\u8D56\u5931\u8D25");
                        logger_1.log.error(e_2);
                        // @ts-ignore
                        process.exit(0);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Create;
}());
exports.Create = Create;
