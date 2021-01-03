"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remove = void 0;
var config_1 = require("../config");
var logger_1 = require("../utils/logger");
var add_1 = require("./add");
var fs = require("fs-extra");
var path = require("path");
var Remove = /** @class */ (function () {
    function Remove(alias) {
        this.alias = alias;
        this.init();
    }
    Remove.prototype.init = function () {
        var _this = this;
        if (!fs.pathExistsSync(config_1.tmpDir)) {
            fs.mkdirpSync(config_1.tmpDir);
        }
        var conf = add_1.Add.getConf();
        if (!this.alias) {
            logger_1.log.error("请使用以下格式删除别名：hundun remove <alias>，例如：hundun add demo");
            return;
        }
        var confIdx = conf.findIndex(function (item) { return item.name === _this.alias; });
        if (confIdx === -1) {
            logger_1.log.error("\u672A\u627E\u5230\u547D\u4EE4:" + this.alias + ";");
            return;
        }
        conf.splice(confIdx, 1);
        fs.writeFileSync(path.join(config_1.tmpDir, add_1.confName), JSON.stringify(conf));
        logger_1.log.success("\u5220\u9664\u522B\u540D:" + this.alias + "\u6210\u529F;");
    };
    return Remove;
}());
exports.Remove = Remove;
