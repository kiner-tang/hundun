"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Add = exports.confName = void 0;
var config_1 = require("../config");
var logger_1 = require("../utils/logger");
var shell = require("shelljs");
var fs = require("fs-extra");
var path = require("path");
exports.confName = "hundun_config.json";
var Add = /** @class */ (function () {
    function Add(alias, repositories) {
        this.alias = alias;
        this.repositories = repositories;
        this.init();
    }
    Add.isConfExist = function () {
        return fs.existsSync(path.join(config_1.tmpDir, exports.confName));
    };
    Add.getConf = function () {
        var config;
        if (Add.isConfExist()) {
            var conf = fs.readFileSync(path.join(config_1.tmpDir, exports.confName));
            try {
                config = JSON.parse(conf);
            }
            catch (e) {
                config = [];
            }
        }
        else {
            config = [];
        }
        return config;
    };
    Add.getConfByAlia = function (alias) {
        var confs = Add.getConf();
        return confs.find(function (item) { return item.name === alias; });
    };
    Add.prototype.init = function () {
        var _this = this;
        if (!fs.pathExistsSync(config_1.tmpDir)) {
            fs.mkdirpSync(config_1.tmpDir);
        }
        var conf = Add.getConf();
        if (!this.alias || !this.repositories) {
            logger_1.log.error("请使用以下格式新增别名：hundun add <alias> [repositories]，例如：hundun add demo https://xxx.com/xxx.git");
            return;
        }
        var old = conf.find(function (item) { return item.name === _this.alias; });
        if (old) {
            logger_1.log.error("\u5DF2\u7ECF\u5B58\u5728\u4E00\u4E2A\u540C\u540D\u547D\u4EE4: " + old.name + "(" + old.repositories + ")");
            return;
        }
        conf.push({
            name: this.alias,
            repositories: this.repositories
        });
        fs.writeFileSync(path.join(config_1.tmpDir, exports.confName), JSON.stringify(conf));
        logger_1.log.success("\u65B0\u589E\u522B\u540D\u6210\u529F\uFF0C\u53EF\u4F7F\u7528\u4EE5\u4E0B\u547D\u4EE4\u65B0\u5EFA\u9879\u76EE\uFF1Ahundun create " + this.alias);
    };
    return Add;
}());
exports.Add = Add;
