const pak = require("../../package.json");
const chalk = require('chalk');

let logger: Logger;

export const logStyle = chalk.white;
export const infoStyle = chalk.bold.white;
export const infoMsgStyle = chalk.bold.keyword("white");
export const successStyle = chalk.bold.green;
export const successMsgStyle = chalk.bold.keyword("green");
export const warningStyle = chalk.bold.yellow;
export const warningMsgStyle = chalk.bold.keyword("yellow");
export const errorStyle = chalk.bold.red;
export const errorMsgStyle = chalk.bold.keyword("red");

export class Logger {
    constructor(private namespace: string=`[${pak.name}<${pak.version}>]：`) {
    }
    info(msg: string, ...args: any[]): void{
        console.info(infoStyle(`${this.namespace}${infoMsgStyle(msg)}`), ...args)
    }
    success(msg: string, ...args: any[]): void{
        console.info(successStyle(`${this.namespace}${successMsgStyle(msg)}`), ...args)
    }
    warning(msg: string, ...args: any[]): void{
        console.warn(warningStyle(`${this.namespace}${warningMsgStyle(msg)}`), ...args)
    }
    error(msg: string, ...args: any[]): void{
        console.error(errorStyle(`${this.namespace}${errorMsgStyle(msg)}`), ...args);
    }
    static getInstance(namespace?: string): Logger {
        if(logger){
            return logger;
        }else{
            return (logger = new Logger(namespace));
        }
    }
}

export const log = Logger.getInstance();