"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpDir = exports.pkgManagers = void 0;
var os = require("os");
var path = require("path");
var fs = require("fs-extra");
exports.pkgManagers = [
    {
        name: "yarn",
        value: "yarn"
    },
    {
        name: "tyarn",
        value: "tyarn"
    },
    {
        name: "npm",
        value: "npm"
    },
    {
        name: "cnpm",
        value: "cnpm"
    },
];
var tmpProjectDir = "hundun-cli";
exports.tmpDir = path.join("" + os.homedir(), ".tmp/" + tmpProjectDir);
if (!fs.existsSync(exports.tmpDir)) {
    fs.mkdirpSync(exports.tmpDir);
}
