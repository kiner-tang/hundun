import { pkgManagers } from "../config";
import {
    Config,
    DataCollection,
    DataSource,
    PromptListItem
} from "../lib/DataCollection";
import { log, successMsgStyle } from "../utils/logger";
import { failSpinner, logWithSpinner, stopSpinner } from "../utils/spinner";
import {
    getGitBranchList,
    installDependencies,
    keywordWhite,
    mergeJSON,
    patchConf,
    patchPackageJSON,
    resolveArgs, switchGitBranch
} from "../utils/utils";
import { Add } from "./add";

const path = require("path");
const shell = require("shelljs");
const fs = require("fs-extra");

export interface ProjectExtendConfig {
    extend: {
        prompt: PromptListItem[],
        updatePkg: Record<string, any>,
        updateConf: Record<string, any>
    };
}

export class Create {

    private dc: DataCollection;
    private projectPath: string = shell.pwd().stdout;

    private config: Config = {
        projectName: "",
        template: "",
        branch: "",
        pkgManager: ""
    };

    constructor(private alias: string, private projectName: string, private dataSource: DataSource = DataSource.commandLine) {
        if (dataSource === DataSource.commandLine) {
            this.dc = new DataCollection(DataSource.commandLine);
            this.init();
        } else {
            this.dc = new DataCollection(DataSource.web);
        }
    }


    public async init() {

        this.projectPath = path.join(this.projectPath, this.projectName);
        const conf = Add.getConfByAlia(this.alias);
        this.config.projectName = this.projectName;

        if (!conf) {
            log.error(`命令：${ this.alias }不存在`);
            return;
        }

        if (!fs.pathExistsSync(this.projectPath)) {
            fs.mkdirpSync(this.projectPath);
        }

        const res = shell.cd(this.projectPath).exec(`git clone ${ conf.repositories } .`);
        if (res.code !== 0) {
            failSpinner(`克隆模版项目[${ conf.name }]失败`);
            // @ts-ignore
            process.exit(0);
        }
        await this.resolveBranchList(this.projectPath);
        const promptList: PromptListItem[] = [
            {
                type: "list",
                message: "你使用的包管理工具",
                name: "pkgManager",
                choices: pkgManagers
            }
        ];

        const packageManager = await this.dc.getData(promptList);
        this.config.projectName = this.projectName;
        this.config.branch = 'master';
        this.config.template = conf.repositories;
        this.config.pkgManager = packageManager.pkgManager;

        await this.patchProject();

        this.installDependencies(packageManager.pkgManager);

        this.rmGitFile();

    }

    private rmGitFile(){
        shell.rm('-rf', path.join(this.projectPath, '.git'));
    }

    // 从下载下来的项目中获取扩展配置
    public async getExtendConfigFromProject(): Promise<ProjectExtendConfig | null> {
        const projectRoot = this.projectPath;
        const extendConfigPath = path.join(projectRoot, ".config.tpl.extend.json");
        if (fs.existsSync(extendConfigPath)) {
            const extendConfig: ProjectExtendConfig = require(extendConfigPath);
            const extendPrompt = extendConfig.extend.prompt;
            const config = await this.dc.getData(extendPrompt);
            this.mergeOption(config);
            return extendConfig;
        }
        return null;
    }

    // 根据项目中的updatePkg更新package.json
    public updatePkgByExtendConfig(originalPkg: Record<string, any>, updatePkg: Record<string, any>): void {
        mergeJSON(updatePkg, originalPkg);
        resolveArgs(originalPkg, this.config);
    }

    public mergeOption(config: Config) {
        this.config = {
            ...this.config,
            ...config
        };
    }

    public async resolveBranchList(projectRoot: string): Promise<void> {
        const branchList = getGitBranchList(projectRoot);
        const promptList: PromptListItem[] = [
            {
                type: "list",
                message: `请选择要使用哪个分支创建项目`,
                name: "branch",
                choices: branchList.map((item: string) => ({
                    name: item,
                    value: item
                })),
                default: "master"
            }
        ];
        const config = await this.dc.getData(promptList);
        this.mergeOption(config);
    }

    public async patchProject(): Promise<void> {
        const pkg = require(path.join(this.projectPath, "package.json"));
        try {
            const extendConfig = await this.getExtendConfigFromProject();
            if (!extendConfig) {
                return;
            }
            logWithSpinner(keywordWhite(`正在修正项目配置...`), successMsgStyle(`项目配置修正成功`));
            patchPackageJSON(this.projectPath, pkg, this.config, (originalPkg) => {
                if (extendConfig) {
                    const updatePkg = extendConfig.extend.updatePkg;
                    this.updatePkgByExtendConfig(originalPkg, updatePkg);
                    patchConf(this.projectPath, this.config, (extendConfig.extend.updateConf || {}));
                }
            });
            stopSpinner(true);
        } catch (e) {
            failSpinner(`修正项目出现异常`);
        }
    }


    public async installDependencies(packageManager: string): Promise<void> {
        logWithSpinner(keywordWhite(`正在安装项目依赖 `), successMsgStyle(`安装完成`));
        const projectPath = this.projectPath;
        try {
            await installDependencies(projectPath, packageManager);
            stopSpinner(true);
        } catch (e) {
            failSpinner(`安装项目依赖失败`);
            log.error(e);
            // @ts-ignore
            process.exit(0);
        }
    }
}
