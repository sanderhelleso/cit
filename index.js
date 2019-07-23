const commander = require('commander');
const shell = require('shelljs');
const branchName = require('current-git-branch');
const chalk = require('chalk');
const figlet = require('figlet');
const log = console.log;

log(chalk.yellow(figlet.textSync('CIT', { horizontalLayout: 'full' })));
log(chalk.bold(chalk.white('🔥  Quick git commits for branch controll 🔥\n')));

const program = new commander.Command();
program.version('1.0.0').description('CIT - Quick git commits for branch controll');

program
	.command('list')
	.alias('l')
	.description('Shows the current git branch of the current git project')
	.action(listBranch);

program
	.command('commit <message>')
	.alias('c')
	.option('-a, --add', 'Add all files to git before committing')
	.description('Commit to current branch with branch name prefixed to commit message')
	.action(commit);

program
	.command('branch <name>')
	.alias('b')
	.option('-n, --new', 'Create a new branch')
	.description('Navigate to provided branch or creates a new')
	.action(branch);

program.parse(process.argv);

function getBranch() {
	const branch = branchName();
	return branch ? branch : 'Master';
}

function listBranch() {
	log(`Current branch: ${chalk.yellow(getBranch())}`);
}

function branch(name, options) {
	name = name.replace(/ /g, '_');

	if (options.new) {
		const created = exe(`git checkout -b ${name}`);
		if (!created) {
			return error('Failed to create new branch');
		} else {
			success(`Successfully created new branch ${name}!`);
		}
	} else {
		const changed = exe(`git checkout ${name}`);
		if (!changed) {
			return error('Failed to change branch');
		} else {
			success(`Successfully changed to branch ${name}!`);
		}
	}
}

function commit(message, { add }) {
	if (add) {
		const added = exe('git add .');
		if (!added) {
			return error('Git add failed');
		} else {
			success('added to commit!');
		}
	}

	const branch = getBranch();
	const git_message = `${branch}: ${message}`;
	const committed = exe(`git commit -m "${git_message}"`);

	if (!committed) {
		error('Git commit failed');
	} else {
		success(`Successfully committed to ${branch}!`);
	}
}

function exe(command) {
	const cmd = shell.exec(command);
	return !cmd.code;
}

function error(msg) {
	log(chalk.bold.red(`❌  ${msg}`));
}

function success(msg) {
	log(chalk.bold.green(`✅  ${msg}`));
}
