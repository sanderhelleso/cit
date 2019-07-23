const commander = require('commander');
const shell = require('shelljs');
const branchName = require('current-git-branch');
const chalk = require('chalk');
const figlet = require('figlet');

console.log(chalk.yellow(figlet.textSync('CIT', { horizontalLayout: 'full' })));
console.log(chalk.bold(chalk.white('🔥  Quick git commits for branch controll 🔥\n')));

const program = new commander.Command();
program.version('1.0.0').description('CIT - Quick git commits for branch controll');

program.command('branch').alias('b').description('Shows the current git branch').action(branch);

program
	.command('commit <message>')
	.alias('c')
	.option('-a, --add', 'Add all files to git before committing')
	.description('Commit to current branch with branch name prefixed to commit message')
	.action(commit);

program.parse(process.argv);

function getBranch() {
	const branch = branchName();
	return branch ? branch : 'Master';
}

function branch() {
	console.log(`Current branch: ${chalk.yellow(getBranch())}`);
}

function commit(message, { add }) {
	if (add) {
		const added = exe('git add .');
		if (!added) {
			return error('Git add failed');
		} else {
			success('Files added to commit!');
		}
	}

	const branch = getBranch();
	const git_message = `${branch}: ${message}`;
	const committed = exe(`git commit -m "${git_message}"`);

	console.log(committed);

	if (!committed) {
		error('Git commit failed');
	} else {
		success(`Successfully committed to ${branch}!`);
	}
}

function exe(command) {
	const cmd = shell.exec(command);
	console.log(cmd);
	return cmd.code;
}

function error(msg) {
	console.log(chalk.bold.red(`❌  ${msg}`));
}

function success(msg) {
	console.log(chalk.bold.green(`✅  ${msg}`));
}
