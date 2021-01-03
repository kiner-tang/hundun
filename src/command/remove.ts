import { tmpDir } from "../config";
import { log } from "../utils/logger";
import { Add, ConfigStruct, confName } from "./add";

const fs = require("fs-extra");
const path = require("path");

export class Remove {
    constructor(private alias: string) {
        this.init();
    }


    private init(){
        if(!fs.pathExistsSync(tmpDir)){
            fs.mkdirpSync(tmpDir);
        }
        const conf: ConfigStruct[] = Add.getConf();
        if(!this.alias){
            log.error("请使用以下格式删除别名：hundun remove <alias>，例如：hundun add demo");
            return;
        }

        const confIdx = conf.findIndex(item => item.name === this.alias);

        if(confIdx === -1){
            log.error(`未找到命令:${this.alias};`);
            return;
        }

        conf.splice(confIdx, 1);

        fs.writeFileSync(path.join(tmpDir, confName), JSON.stringify(conf));

        log.success(`删除别名:${this.alias}成功;`);
    }
}
