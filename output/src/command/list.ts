import { ChoicesListItem } from "../lib/DataCollection";
import { log, successMsgStyle } from "../utils/logger";
import { failSpinner, logWithSpinner, stopSpinner } from "../utils/spinner";
import {
    fetchTplConfig,
    keywordCyan,
    keywordRed,
    keywordWhite
} from "../utils/utils";
import { Add, ConfigStruct } from "./add";

export class List {
    constructor() {
        this.init().catch(e => log.error("初始化异常", e));
    }

    public async init() {
        await logWithSpinner(keywordWhite(`正在拉取模版数据...`), successMsgStyle("模版数据拉取成功"));
        try {
            const confs = Add.getConf();
            stopSpinner();
            console.log(`========================================模版项目列表=======================================`);
            confs.forEach((item: ConfigStruct) => {
                console.log(keywordWhite(`* alias: ${ keywordCyan(item.name) }`));
                console.log(keywordCyan(` (repository)： \t${ item.repositories }`));
            });
            console.log(`===========================================================================================`);
        } catch (e) {
            failSpinner(`模版数据拉取失败`);
            log.error("模版数据拉取失败", e);
        }
    }
}
