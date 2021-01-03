#! /usr/bin/env node

import command = require("commander");

import { Clear } from "../command/clear";
import { Create } from "../command/create";
import { List } from "../command/list";
import { fetchTplConfig } from "../utils/utils";
import { Add } from "../command/add";
import { Remove } from "../command/remove";
const pkg = require("../../package.json");


command
    .version(pkg.version);

command
    .usage("<command>");

command
    .command("add <alias> <repositories>")
    .description("新增一个github项目")
    .alias("a")
    .action(async(alias, repositories) => {
        new Add(alias, repositories);
    });

command
    .command("remove <alias>")
    .description("删除一个别名")
    .alias("r")
    .action(async(alias) => {
        new Remove(alias);
    });

command
    .command("create <alias> <projectName>")
    .description("根据模版创建一个项目")
    .alias("c")
    .action(async(alias, projectName) => {
        new Create(alias, projectName);
    });
command
    .command("list")
    .description("列出所有项目模版")
    .alias("l")
    .action(async() => {
        await fetchTplConfig();
        new List();
    });
command
    .command("clear")
    .description("清理缓存")
    .alias("c")
    .action(async() => {
        new Clear();
    });

command.parse(process.argv);

if (!command.args || !command.args.length) {
    command.help();
}
