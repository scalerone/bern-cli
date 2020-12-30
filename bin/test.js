#!/usr/bin/env node

console.log('My custom bern scaffold start...')
const program = require('commander')
const pkg = require('../package.json')

// console.log(process.argv)
// console.log(program)
// program.parse(process.argv)
program
  .command('create <app-name>')
  .description('create a new project powered by bern-cli')
  .option('-f, --force', 'override')
  .action((name, cmd) => {
    console.log('name', name)
    console.log('cmd.options', cmd.options)
    console.log('cmd.args', cmd.args)
  })
//.usage 和 .name通过这两个选项可以修改帮助信息的首行提示
program.version(pkg.version).usage(`<command> [options]`)
//括号（例如<required>）意味着必选，而方括号（例如[optional]）则代表可选。

program.parse(process.argv)

//示例命令：
//bern -V
//bern create xxx

