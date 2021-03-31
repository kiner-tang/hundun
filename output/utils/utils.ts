import chalk from "chalk";

import { tmpDir } from "../config";
import { Config } from "../lib/DataCollection";

import { log } from "./logger";
import { ConfigStruct, confName } from "../command/add";

const fs = require("fs-extra");

const shell = require("shelljs");
const path = require("path");


export function keyword(color: string) {
    return (...args: any[]) => chalk.bold.keyword(color)(...args);
}

export const keywordCyan = keyword("cyan");
export const keywordWhite = keyword("white");
export const keywordRed = keyword("red");

const branchReg = /origin\/(.*)/gi;

export function resolveBranchList(branchString: string): string[] {
    const strs = branchString.split("\n");
    return strs.map(item => item.replace(branchReg, "$1").trim()).filter(item => !!item && !item.startsWith("HEAD"));
}

export function getGitBranchList(projectRoot: string): string[] {
    const branchListStr = shell.cd(projectRoot).exec(`git fetch&git branch -lr`, { silent: true }).stdout;
    return resolveBranchList(branchListStr);
}

export function switchGitBranch(projectRoot: string, targetBranch: string): any {
    return shell
        .cd(projectRoot)
        .exec(`git fetch --all&git switch -C ${ targetBranch } origin/${ targetBranch }`, { silent: true });
}

export function copyFileList(projectRoot: string): string[] {
    return shell
        .ls(`-lA`, projectRoot).filter((item: any) => item.name !== ".git")
        .map((item: any) => path.join(projectRoot, item.name));
}

export function copyFilesToTargetPath(fileList: string[], targetPath: string): any {
    return shell.cp("-Rf", fileList, targetPath);
}

export function patchPackageJSON(
    projectRoot: string,
    originalPackage: Record<string, any>,
    config: Config, extra: (pkg: Record<string, any>) => void
): void {
    const projectPath = projectRoot;
    try {
        originalPackage.name = config.projectName;
        originalPackage.tplVersion = config.branch;
        originalPackage.version = "0.0.1";
        originalPackage.author = shell.exec(`git config user.name`, { silent: true }).stdout.trim();
        originalPackage.email = shell.exec(`git config user.email`, { silent: true }).stdout.trim();
        originalPackage.pkgManager = config.pkgManager;
        extra && extra(originalPackage);
        fs.writeFileSync(path.join(projectPath, "package.json"), JSON.stringify(originalPackage, null, 4), {
            encoding: "UTF-8"
        });
    } catch (e) {
        log.error(`修正项目出现异常`, e);
        throw e;
    }
}

export function getSource(path: string): string {
    return fs.readFileSync(path, {
        encoding: "utf-8"
    });
}

export function injectArg(source: string, args: Record<string, any>): string {
    return source.replace(/(\$\$[^\$]*\$\$)/g, function(str: string, argName: string) {
        return args[argName];
    })
}

export function patchConf(
    projectRoot: string,
    config: Config,
    updateConf: Record<string, any>
): void {
    const projectPath = projectRoot;
    const fileList = Object.keys(updateConf);
    const args: Record<string, any> = config;
    Object.keys(updateConf).forEach((argsName: string) => {
        const file = updateConf[argsName];
        Object.keys(file).forEach(argName => {
            args[argName] = config[file[argName]];
        });
    });
    fileList.forEach((filePath: string) => {
        const curFilePath = path.join(projectPath, filePath);
        let source = getSource(curFilePath);
        source = injectArg(source, args);
        fs.writeFileSync(curFilePath, source, {
            encoding: "utf-8"
        });
    });
}

export async function installDependencies(projectRoot: string, pkgManager: string): Promise<any> {
    return new Promise(async(resolve, reject) => {
        let cmd = ``;
        switch (pkgManager) {
            case "yarn":
            case "tyarn":
                cmd = `${ pkgManager }`;
                break;
            case "npm":
            case "cnpm":
                cmd = `${ pkgManager } install`;
                break;
        }
        try {
            const res = await shell.cd(projectRoot).exec(cmd);
            if (res.code !== 0) {
                reject(res);
                log.error("安装依赖出错", res.stderr);
                return;
            }
            resolve(res);
        } catch (e) {
            reject(e);
        }
    });

}

export async function fetchTplConfig(): Promise<ConfigStruct[]> {
    return require(path.join(tmpDir, confName));
}

const argsExp = /\{\{([^\}]*)\}\}/gi;

export function resolveArgs(json: Record<string, any>, config: Config): void {
    Object.keys(json).forEach(key => {
        let val = json[key];
        if (typeof val === "string" || typeof val === "number" || typeof val === "boolean") {
            if (typeof val === "string") {

                val = val.replace(argsExp, function(arg1: any, arg2: string) {
                    return config[arg2];
                });
            }
            json[key] = val;
        } else {
            resolveArgs(json[key], config);
        }
    });
}


export function mergeJSON(minor: Record<string, any>, main: Record<string, any>) {
    Object.keys(minor).forEach(key => {
        if (main[key] === undefined) { // 不冲突的，直接赋值
            main[key] = minor[key];
            return;
        }
        // 冲突了，如果是Object，看看有么有不冲突的属性
        // 不是Object 则以（minor）为准为主，
        if (isJSON(minor[key]) || isArray(minor[key])) { // arguments.callee 递归调用，并且与函数名解耦
            // arguments.callee(minor[key], main[key]);
            mergeJSON(minor[key], main[key]);
        } else {
            main[key] = minor[key];
        }
    });
}

function isJSON(target: any) {

    return typeof target === "object" && target.constructor === Object;
}

function isArray(o: any) {
    return Object.prototype.toString.call(o) === "[object Array]";
}
