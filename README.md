# HunDun
混沌cli（混沌包容万物，乃万物之始），本项目用于将管理任意github项目，通过cli操作的方式，基于目标github创建新项目

# Install

```bash
yarn global @kiner/hundun

或

npm i @kiner/hundun -g
```

# Usage

```bash
# 新增cli
# hd add your-project-alias your-project-github-url
hd add demo https://xxx.com/xxx.git

# 查看现有cli
hd list

# 移除cli
# hd remove your-project-alias
hd remove demo

# 使用cli创建新项目
# hd create your-project-alias your-project-name
hd create demo myProject

# 查看命令帮助
hd

# 或
hd -h

```
