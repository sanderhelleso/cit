const commander = require('commander');
const shell = require('shelljs');
const branchName = require('current-git-branch');

const program = new commander.Command();
program.version('1.0.0', '-v', '--version');

program.command('branch').action(() => console.log(`Current branch: ${getBranch()}`));
program.command('commit <message>').option('-a, --add', 'Add all files to git before committing').action(commit);

program.parse(process.argv);

function getBranch() {
	const branch = branchName();
	return branch ? branch : 'Master';
}

function commit(message, { add }) {
	if (add) {
		const added = exe('git add .');
		if (!added) {
			return shell.echo('Error: Git add failed');
		} else {
			shell.echo('Success: Files added to commit!');
		}
	}

	const branch = getBranch();
	const git_message = `${branch}: ${message}`;
	const committed = exe(`git commit -m "${git_message}"`);

	if (!committed) {
		shell.echo('Error: Git commit failed');
	} else {
		shell.echo(`Successfully committed to ${branch}!`);
	}
}

function exe(command) {
	const cmd = shell.exec(command);
	return cmd.code !== 0;
}
