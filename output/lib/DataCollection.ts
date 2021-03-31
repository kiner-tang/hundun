import { WebTransporter } from "./WebTransporter";

const inquirer = require("inquirer");

export interface Config {
    projectName: string,
    sourceProjectName?: string,
    template: string,
    branch: string,
    pkgManager: string,
    [key: string]: any
}

export enum DataSource {
    commandLine = "commandLine",
    web = "web"
}


export interface ChoicesListItem {
    name: string,
    value: string,

    [key: string]: string
}

export interface PromptListItem {
    type: | "input" | "number" | "confirm" | "list" | "rawlist"
        | "expand" | "checkbox" | "password" | "editor",
    message: string,
    name: string,
    default?: any,
    choices?: ChoicesListItem[]
}

let webTransporter: WebTransporter<PromptListItem[], Config>;

export class DataCollection {

    private static async commandLineDataCollector(promptList: PromptListItem[]): Promise<Config> {
        return inquirer.prompt(promptList);
    }

    private static async webDataCollector(promptList: PromptListItem[]): Promise<Config> {
        if (!webTransporter) {
            webTransporter = new WebTransporter<PromptListItem[], Config>("https://test.com");
        }
        return webTransporter.send(promptList);
    }

    constructor(private dataSource: DataSource = DataSource.commandLine) {

    }

    public async getData(promptList: PromptListItem[]): Promise<Config> {
        if (this.dataSource === DataSource.commandLine) {
            return DataCollection.commandLineDataCollector(promptList);
        } else {
            return DataCollection.webDataCollector(promptList);
        }
    }

}
