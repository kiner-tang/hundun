import { tmpDir } from "../config";
import { log } from "../utils/logger";

const shell = require("shelljs");
const fs = require("fs-extra");
const path = require("path");

export const confName = "hundun_config.json";

export interface ConfigStruct {
    name: string,
    repositories: string
}

export class Add {
    constructor(private alias: string, private repositories: string) {
        this.init();
    }

    static isConfExist(){
        return fs.existsSync(path.join(tmpDir, confName))
    }

    static getConf(): ConfigStruct[]{
        let config: ConfigStruct[];
        if(Add.isConfExist()){
            const conf = fs.readFileSync(path.join(tmpDir, confName));

            try{
                config = JSON.parse(conf);
            }catch (e) {
                config = [];
            }
        }else{
            config = [];
        }

        return config;
    }

    static getConfByAlia(alias: string): ConfigStruct | undefined {
        const confs = Add.getConf();
        return confs.find(item => item.name === alias);
    }

    private init(){
        if(!fs.pathExistsSync(tmpDir)){
            fs.mkdirpSync(tmpDir);
        }
        const conf: ConfigStruct[] = Add.getConf();
        if(!this.alias || !this.repositories){
            log.error("请使用以下格式新增别名：hundun add <alias> [repositories]，例如：hundun add demo https://xxx.com/xxx.git");
            return;
        }

        const old: ConfigStruct|undefined = conf.find(item => item.name === this.alias);
        if(old){
            log.error(`已经存在一个同名命令: ${old.name}(${old.repositories})`);
            return;
        }

        conf.push({
            name: this.alias,
            repositories: this.repositories
        });

        fs.writeFileSync(path.join(tmpDir, confName), JSON.stringify(conf));

        log.success(`新增别名成功，可使用以下命令新建项目：hundun create ${this.alias}`);
    }
}
