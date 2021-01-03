import { tmpDir } from "../config";
import { log } from "../utils/logger";
import { confName } from "./add";
const fs = require("fs-extra");
const path = require("path");

export class Clear {
    constructor() {
        this.init().catch(e => log.error("初始化异常", e));
    }

    public async init() {
        fs.removeSync(path.join(tmpDir, confName));
        log.success("清理成功");
    }
}
