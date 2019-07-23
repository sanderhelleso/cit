const commander = require('commander');
const branchName = require('current-git-branch');

const program = new commander.Command();
program.version('0.0.1');

console.log(branchName());
