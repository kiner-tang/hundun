import { Add, ConfigStruct } from "./add";
import { ChoicesListItem, DataCollection, DataSource, PromptListItem } from "../lib/DataCollection";
import { Create } from "./create";

export class Init {
    private dc: DataCollection;
    constructor(private dataSource: DataSource = DataSource.commandLine) {
        if (dataSource === DataSource.commandLine) {
            this.dc = new DataCollection(DataSource.commandLine);
            this.doInit();
        } else {
            this.dc = new DataCollection(DataSource.web);
        }
    }

    async doInit(){
        const confs = Add.getConf();
        const tpls: ChoicesListItem[] = confs.map((item: ConfigStruct) => ({
            name: `${item.name}<${item.repositories}>`,
            value: item.name
        }));

        const promptList: PromptListItem[] = [
            {
                type: "list",
                message: "请选择模版项目",
                name: "tpl",
                choices: tpls
            }
        ];

        const tpl = await this.dc.getData(promptList);

        const namePrompt: PromptListItem[] = [
            {
                type: "input",
                message: "请输入要创建的项目名称",
                name: "name",
                default: tpl.name
            }
        ];

        const projectName = await this.dc.getData(namePrompt);

        new Create(tpl.tpl, projectName.name);

    }
}