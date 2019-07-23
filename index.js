const commander = require('commander');
const shell = require('shelljs');
const branchName = require('current-git-branch');

const program = new commander.Command();
program.version('1.0.0', '-v', '--version');

program.option('branch, --branch', 'Get the name of the current branch');
program.command('commit <message>').option('-a, --add', 'Add all files to git before committing').action(commit);

program.parse(process.argv);

/**
 * Logs the current branch of active git repo
 */

function getBranch() {
	const branch = branchName();
	return branch ? branch : 'Master';
}

if (program.branch) {
	console.log(`Current branch: ${getBranch()}`);
}

/**
 * Commit and append current branch as prefix to commit message
 */

function commit(message, { add }) {
	if (add) exe('git add .');

	const branch = getBranch();
	const git_message = `${branch}: ${message}`;
	const committed = exe(`git commit -m "${git_message}"`);

	if (!committed) {
		shell.echo('Error: Git commit failed');
	} else {
		shell.echo(`Successfully committed to ${branch}`);
	}
}

function exe(command) {
	const cmd = shell.exec(command);
	return cmd.code !== 0;
}
