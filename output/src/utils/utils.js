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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeJSON = exports.resolveArgs = exports.fetchTplConfig = exports.downloadDirFromGitLab = exports.installDependencies = exports.patchConf = exports.injectArg = exports.getSource = exports.patchPackageJSON = exports.copyFilesToTargetPath = exports.copyFileList = exports.switchGitBranch = exports.getGitBranchList = exports.resolveBranchList = exports.keywordRed = exports.keywordWhite = exports.keywordCyan = exports.keyword = void 0;
var chalk_1 = __importDefault(require("chalk"));
var config_1 = require("../config");
var logger_1 = require("./logger");
var add_1 = require("../command/add");
var fs = require("fs-extra");
var os = require("os");
var shell = require("shelljs");
var path = require("path");
function keyword(color) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return chalk_1.default.bold.keyword(color).apply(void 0, args);
    };
}
exports.keyword = keyword;
exports.keywordCyan = keyword("cyan");
exports.keywordWhite = keyword("white");
exports.keywordRed = keyword("red");
var branchReg = /origin\/(.*)/gi;
function resolveBranchList(branchString) {
    var strs = branchString.split("\n");
    return strs.map(function (item) { return item.replace(branchReg, "$1").trim(); }).filter(function (item) { return !!item && !item.startsWith("HEAD"); });
}
exports.resolveBranchList = resolveBranchList;
function getGitBranchList(projectRoot) {
    var branchListStr = shell.cd(projectRoot).exec("git fetch&git branch -lr", { silent: true }).stdout;
    return resolveBranchList(branchListStr);
}
exports.getGitBranchList = getGitBranchList;
function switchGitBranch(projectRoot, targetBranch) {
    return shell
        .cd(projectRoot)
        .exec("git fetch --all&git switch -C " + targetBranch + " origin/" + targetBranch, { silent: true });
}
exports.switchGitBranch = switchGitBranch;
function copyFileList(projectRoot) {
    return shell
        .ls("-lA", projectRoot).filter(function (item) { return item.name !== ".git"; })
        .map(function (item) { return path.join(projectRoot, item.name); });
}
exports.copyFileList = copyFileList;
function copyFilesToTargetPath(fileList, targetPath) {
    return shell.cp("-Rf", fileList, targetPath);
}
exports.copyFilesToTargetPath = copyFilesToTargetPath;
function patchPackageJSON(projectRoot, originalPackage, config, extra) {
    var realProjectName = config.sourceProjectName === "." ? "" : config.projectName;
    var projectPath = path.join(projectRoot, realProjectName);
    try {
        originalPackage.name = config.projectName;
        originalPackage.tplVersion = config.branch;
        originalPackage.version = "0.0.1";
        originalPackage.author = shell.exec("git config user.name", { silent: true }).stdout.trim();
        originalPackage.email = shell.exec("git config user.email", { silent: true }).stdout.trim();
        originalPackage.pkgManager = config.pkgManager;
        extra && extra(originalPackage);
        fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(originalPackage, null, 4), {
            encoding: "UTF-8"
        });
    }
    catch (e) {
        logger_1.log.error("\u4FEE\u6B63\u9879\u76EE\u51FA\u73B0\u5F02\u5E38", e);
        throw e;
    }
}
exports.patchPackageJSON = patchPackageJSON;
function getSource(path) {
    return fs.readFileSync(path, {
        encoding: "utf-8"
    });
}
exports.getSource = getSource;
function injectArg(source, args) {
    return source.replace(/(\$\$[^\$]*\$\$)/g, function (str, argName) {
        return args[argName];
    });
}
exports.injectArg = injectArg;
function patchConf(projectRoot, config, updateConf) {
    var realProjectName = config.sourceProjectName === "." ? "" : config.projectName;
    var projectPath = path.join(projectRoot, realProjectName);
    var fileList = Object.keys(updateConf);
    var args = config;
    Object.keys(updateConf).forEach(function (argsName) {
        var file = updateConf[argsName];
        Object.keys(file).forEach(function (argName) {
            args[argName] = config[file[argName]];
        });
    });
    fileList.forEach(function (filePath) {
        var curFilePath = path.join(projectPath, filePath);
        var source = getSource(curFilePath);
        source = injectArg(source, args);
        fs.writeFileSync(curFilePath, source, {
            encoding: "utf-8"
        });
    });
}
exports.patchConf = patchConf;
function installDependencies(projectRoot, pkgManager) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                    var cmd, res, e_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cmd = "";
                                switch (pkgManager) {
                                    case "yarn":
                                    case "tyarn":
                                        cmd = "" + pkgManager;
                                        break;
                                    case "npm":
                                    case "cnpm":
                                        cmd = pkgManager + " install";
                                        break;
                                }
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, shell.cd(projectRoot).exec(cmd)];
                            case 2:
                                res = _a.sent();
                                if (res.code !== 0) {
                                    reject(res);
                                    logger_1.log.error("安装依赖出错", res.stderr);
                                    return [2 /*return*/];
                                }
                                resolve(res);
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                reject(e_1);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })];
        });
    });
}
exports.installDependencies = installDependencies;
function downloadDirFromGitLab(gitUrl, targetUrl, targetDir, branch) {
    if (branch === void 0) { branch = "master"; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (os.type() === "Windows_NT") {
                try {
                    shell.exec(path.resolve(__dirname, "../supports/downloadDirFromGitLab.cmd") + " " + gitUrl + " " + targetUrl + " " + targetDir + " " + branch, { silent: true });
                }
                catch (e) {
                    console.warn("执行cmd命令失败：", e);
                }
            }
            else {
                // 不支持提示
                shell.exec("bash " + path.resolve(__dirname, "../supports/downloadDirFromGitLab.sh") + " " + gitUrl + " " + targetUrl + " " + targetDir + " " + branch, { silent: true });
            }
            return [2 /*return*/];
        });
    });
}
exports.downloadDirFromGitLab = downloadDirFromGitLab;
function fetchTplConfig() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, require(path.join(config_1.tmpDir, add_1.confName))];
        });
    });
}
exports.fetchTplConfig = fetchTplConfig;
var argsExp = /\{\{([^\}]*)\}\}/gi;
function resolveArgs(json, config) {
    Object.keys(json).forEach(function (key) {
        var val = json[key];
        if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
            if (typeof val === "string") {
                val = val.replace(argsExp, function (arg1, arg2) {
                    return config[arg2];
                });
            }
            json[key] = val;
        }
        else {
            resolveArgs(json[key], config);
        }
    });
}
exports.resolveArgs = resolveArgs;
function mergeJSON(minor, main) {
    Object.keys(minor).forEach(function (key) {
        if (main[key] === undefined) { // 不冲突的，直接赋值
            main[key] = minor[key];
            return;
        }
        // 冲突了，如果是Object，看看有么有不冲突的属性
        // 不是Object 则以（minor）为准为主，
        if (isJSON(minor[key]) || isArray(minor[key])) { // arguments.callee 递归调用，并且与函数名解耦
            // arguments.callee(minor[key], main[key]);
            mergeJSON(minor[key], main[key]);
        }
        else {
            main[key] = minor[key];
        }
    });
}
exports.mergeJSON = mergeJSON;
function isJSON(target) {
    return typeof target === "object" && target.constructor === Object;
}
function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
}
