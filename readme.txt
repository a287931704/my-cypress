Cypress环境搭建需要下载安装Nodejs
进入node.js官网：https://nodejs.org/en/download/并安装
安装完成后打开命令行，输入npm -v，如有版本号显示说明安装成功
安装git：Git-2.33.1-64-bit.exe，安装完成后在cmd中输入git --version出现版本信息即可
打开cmd，输入命令从git clone项目: git clone https://github.com/a287931704/my-cypress.git
cd命令定位到x项目中cypress_test目录中，执行命令 npm install，等待依赖安装完成
执行用例
##可以执行package.json 里 scripts 命令进行调试,如vltn的prod环境：
npm run run:vltn #headless模式
npm run open:vltn #可视化调试模式
编写用例一般用VSCode：\\10.88.8.31\it软件包\VSCode