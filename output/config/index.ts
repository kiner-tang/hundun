import { ChoicesListItem } from "../lib/DataCollection";
const os = require("os");
const path = require("path");
const fs = require("fs-extra");
export const pkgManagers: ChoicesListItem[] =[
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
export const tmpDir = os.type() === 'Windows_NT'?path.join(`${os.homedir()}`,`.tmp/${tmpProjectDir}`):path.join(os.tmpdir(), tmpProjectDir);
if(!fs.existsSync(tmpDir)){
    fs.mkdirpSync(tmpDir);
}
