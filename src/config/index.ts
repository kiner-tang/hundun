import { ChoicesListItem } from "../lib/DataCollection";

const os = require("os");
const path = require("path");
const fs = require("fs-extra");

export const tplConfigGitLabUrl = "https://git.yy.com/webs/edu100FE/template-manage-cli.git";
export const tplConfigFilePath = "tplConfig.json";

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

export const pkgManagers: ChoicesListItem[] = [
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

const tmpProjectDir = "hundun-cli";

export const tmpDir = path.join(`${os.homedir()}`, `.tmp/${tmpProjectDir}`);

if (!fs.existsSync(tmpDir)) {
    fs.mkdirpSync(tmpDir);
}
