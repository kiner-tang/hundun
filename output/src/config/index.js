"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpDir = exports.pkgManagers = exports.tplConfigFilePath = exports.tplConfigGitLabUrl = void 0;
var os = require("os");
var path = require("path");
var fs = require("fs-extra");
exports.tplConfigGitLabUrl = "https://git.yy.com/webs/edu100FE/template-manage-cli.git";
exports.tplConfigFilePath = "tplConfig.json";
// export const tplConfig: ChoicesListItem[] = [
//     {
//         name: "Vue模版项目",
//         value: "template-vue-ide",
//         repository: "https://git.yy.com/webs/edu100FE/template-vue-ide.git",
//         defaultBranch: "master"
//     },
//     {
//         name: "纯Typescript模版项目",
//         value: "template-typescript-ide",
//         repository: "https://git.yy.com/webs/edu100FE/template-typescript-ide.git",
//         defaultBranch: "master"
//     },
//     {
//         name: "Typescript+React模版项目",
//         value: "template-react-ide",
//         repository: "https://git.yy.com/webs/edu100FE/template-react-ide.git",
//         defaultBranch: "master"
//     },
//     {
//         name: "Typescript+Ant_Design模版项目",
//         value: "template-antd-ide",
//         repository: "https://git.yy.com/webs/edu100FE/template-antd-ide.git",
//         defaultBranch: "master"
//     }
// ];
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
exports.tmpDir = os.type() === 'Windows_NT' ? path.join("" + os.homedir(), ".tmp/" + tmpProjectDir) : path.join(os.tmpdir(), tmpProjectDir);
if (!fs.existsSync(exports.tmpDir)) {
    fs.mkdirpSync(exports.tmpDir);
}
