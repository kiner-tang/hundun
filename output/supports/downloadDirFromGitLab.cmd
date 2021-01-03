:: need to download gitUrl
set "gitUrl=%1"

:: download dir
set "dolowloadDirPath=%2"

:: download file local path
set "targetPath=%3"

:: git branch
set "branch=%4"



:: if dir is not exit, create it
if not exist %targetPath% (
    mkdir %targetPath%
)

:: go to target dir
cd %targetPath% || exit

:: init git
git init
:: connect remote
git remote add -f origin %gitUrl%
:: open sparse checkout mode
git config core.sparsecheckout true

:: which dir or file you want to download
echo %dolowloadDirPath% >> .git/info/sparse-checkout

:: git reset
git reset --hard

:: checkout
git checkout master

:: delete tmp dir
for /r .git %i in (*) do rd /s /q %i

:::: downloadDirFromGitLab.cmd https://git.yy.com/webs/edu100FE/applet-cli-tpl.git /src/tpls/wechat-miniprogram/taro-nextstore-typescript-sass .tmp master
:::: downloadDirFromGitLab.cmd https://git.yy.com/webs/edu100FE/applet-cli-tpl.git /src/components/wechat-miniprogram/demo-component .tmp
