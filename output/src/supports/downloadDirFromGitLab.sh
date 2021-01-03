#!/bin/bash

# 待下载的git路径
gitUrl=$1

# 待下载目录路径
dolowloadDirPath=$2

# 下载文件存放目录
targetPath=$3

# 分支
branch=$4

# 若目标目录不存在则创建目标目录
if [ ! -d "$targetPath" ]; then
  mkdir -p "$targetPath"
fi

# 进入目标目录并初始化一个空的git仓库
cd "$targetPath" || exit

# 若目标目录不存在则创建目标目录
git init;
git clean -d -fx;

# 连接远程git仓库
git remote add -f origin "$gitUrl"
# 开启sparse checkout 模式
git config core.sparsecheckout true

# 告诉Git哪些文件或者文件夹是需要下载的（作为列表保存在 .git/info/sparse-checkout 文件中）
echo "$dolowloadDirPath" > .git/info/sparse-checkout


# echo "模版分支：$branch"

# 拉取代码
git pull origin ${branch} -p


# 拉取代码
# git pull origin master
# 删除.git目录
#rm -rf .git
## bash downloadDirFromGitLab.sh https://git.yy.com/webs/edu100FE/applet-cli-tpl.git /src/tpls/wechat-miniprogram/demo-tpl .tmp
## bash downloadDirFromGitLab.sh https://git.yy.com/webs/edu100FE/applet-cli-tpl.git /src/components/wechat-miniprogram/demo-component .tmp
