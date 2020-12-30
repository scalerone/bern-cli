#!/usr/bin/env node
// 通过commander实现命令行的交互
// 通过download-git-repo实现仓库代码的拉取
// 通过inquirer实现配置的选择和相关项的填写，实现可选配置
// 通过handlebars实现对package.json模板的替换
// 通过chalk和ora对命令行的输出进行美化
// 通过child_process模块开启子进程，实现依赖的npm install

// 解析命令和参数：处理用户输入的命令
const { program } = require('commander')
// 文件路径
const path = require('path');
// 模板替换-对package.json模板
const Handlebars = require('handlebars');
// 下载文件
const download = require('download-git-repo');
// 命令行与用户交互
const inquirer = require('inquirer');
// 文件操作
const fs = require('fs');
//loading效果
const ora = require('ora');
//命令行颜色美化
const chalk = require("chalk");

program
    .version('0.1.0')
    .command('init <name>')
    .description('初始化模板')
    .action( (name) => {
        inquirer.prompt([
          {type: 'input', name: 'author', message: '请输入作者名称',default: "jswu" },
	      	{type: 'input', name: 'description', message: '请输入项目描述', default: 'a vue`s project'}
        ]).then((paramater)=>{
            const targetPath = path.resolve(__dirname,name);
            paramater = {name,...paramater};
            const spinner = ora("模板下载中^.^... 请稍后");
            spinner.start();
            // program.addCommand('是否需要install:').action((value)=>{
            //     program.addCommand("npm install");
            // })
            console.log('paramater',paramater)
            const meta = {
              name,
              description: paramater.description,
              author: paramater.author
            };
            
            const x = download("github:https://github.com/scalerone/bern-UI.git",targetPath,{ clone:true }, (err)=>{
                if(!err){
                    spinner.succeed();
                    const packagePath = path.join(targetPath,'package.json');
                    if(fs.existsSync(packagePath)){
                        const content = fs.readFileSync(packagePath).toString();
                        const template = Handlebars.compile(content);
                        const result = template(meta);
                        fs.writeFileSync(packagePath,result);
                    }else{
                        spinner.fail();
                        console.log(chalk.red("failed! 没有package.json"));
                        return
                    }
                    console.log(chalk.green("success！ 项目初始化成功")+'\n');
                    console.log(
                        chalk.greenBright("开启项目") + '\n' +
                        chalk.greenBright("cd " + name) + '\n' + 
                        chalk.greenBright("npm run dev"));
                }else{
                    console.log(chalk.red("failed! 拉取失败",err));
                    spinner.fail();
                    return;
                }
            })
            
        }).catch((error)=>{
            console.log(chalk.red(error));
        })
    })

program.parse(process.argv)

// 使用
// npm install -g bern 全局安装
// bern init projectName 拉取模板进行初始化