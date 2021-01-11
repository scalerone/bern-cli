const chalk = require("chalk");
const projectSuccess = function(projectName){
    console.log(
        chalk.greenBright("开启项目") + '\n' +
        chalk.greenBright("cd " + projectName) + '\n' +
        chalk.greenBright("npm run serve"));
}
const noPackageJSON = function(){
    console.log(chalk.red("failed! 没有package.json"));
    console.log(chalk.red("请重新尝试！"));
}

const pullFailed = function(){
    console.log(chalk.red("failed! 拉取失败",err));
    console.log(chalk.red("请重新尝试！"));
}

const queryError = function(error){
    console.log(chalk.red(error));
    console.log(chalk.red("请重新尝试！"));
}
const info = function(){
    console.log(chalk.green("作者搭建了一个简易版的vue项目脚手架，用来加快vue项目环境搭建的速度"));
    console.log(chalk.green("通过使用命令 bern init projectName 的方式生成项目"))
}

module.exports = {
    projectSuccess,
    noPackageJSON,
    pullFailed,
    queryError,
    info,
}
