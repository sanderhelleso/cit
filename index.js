const commander = require('commander');
const shell = require('shelljs');
const branchName = require('current-git-branch');
const chalk = require('chalk');
const figlet = require('figlet');
const log = console.log;

module.exports = () => {
	const program = new commander.Command();
	program.version('1.0.7');

	program
		.command('add')
		.alias('a')
		.description('Add all new git changes in current directory to current branch')
		.action(add);

	program
		.command('push <branch>')
		.alias('p')
		.description('Pushes all commits to specified branch from the current branch')
		.action(push);

	program
		.command('list')
		.alias('l')
		.description('Shows the current git branch of the current git project')
		.action(listBranch);

	program
		.command('commit <message>')
		.alias('c')
		.option('-a, --add', 'Add all files to git before committing')
		.option('-p, --push <branch>', 'Pushes commit to specified branch')
		.description('Commit to current branch with branch name prefixed to commit message')
		.action(commit);

	program
		.command('branch <name>')
		.alias('b')
		.option('-n, --new', 'Create a new branch')
		.description('Navigate to provided branch or create a new branch')
		.action(branch);

	program.parse(process.argv);

	if (!program.args.length) {
		showHelp();
	}

	program.on('*', function() {});

	function listBranch() {
		showPreBranch();

		log(`Current branch: ${chalk.yellow(getBranch())}`);
	}

	function add(hidePre) {
		if (!hidePre) showPreBranch();

		const added = exe('git add .');
		if (!added) {
			error('Failed to add changes to git');
			return false;
		}

		success('Added changes to commit!');
		return true;
	}

	function push(options, hidePre) {
		if (!hidePre) showPreBranch();

		const branch = options.branch || options;

		const pushed = exe(`git push origin ${stripSpace(branch)}`);
		if (!pushed) {
			error(`Failed to push to branch '${branch}'`);
		} else {
			success(`Successfully pushed to branch '${branch}'!`);
		}
	}

	function branch(name, options) {
		showPreBranch();

		name = stripSpace(name);

		if (options.new) {
			const created = exe(`git checkout -b ${name}`);
			if (!created) {
				return error('Failed to create new branch');
			} else {
				success(`Successfully created new branch '${name}'!`);
			}
		} else {
			const changed = exe(`git checkout ${name}`);
			if (!changed) {
				return error('Failed to change branch');
			} else {
				success(`Successfully changed to branch '${name}'!`);
			}
		}
	}

	function commit(message, options) {
		showPreBranch();

		if (options.add) {
			const added = add(true);
			if (!added) return;
		}

		const branch = getBranch();
		const git_message = `${branch}: ${message}`;
		const committed = exe(`git commit -m "${git_message}"`);

		if (!committed) {
			error('Git commit failed');
		} else {
			success(`Successfully committed to '${branch}'!`);
		}

		if (options.push) {
			push(options.push, true);
		}
	}

	function exe(command) {
		const cmd = shell.exec(command);
		return !cmd.code;
	}

	function stripSpace(str) {
		const stripped = str.replace(/ /g, '_');
		return stripped;
	}

	function showHelp() {
		log(chalk.yellow(figlet.textSync('CIT', { horizontalLayout: 'full' })));
		log(chalk.bold(chalk.white('🔥  Quick git for branch controll and speed 🔥\n')));
		program.help();
	}

	function getBranch() {
		const branch = branchName();
		return branch ? branch : 'master';
	}

	function showPreBranch() {
		console.log(`\n🌿  ${chalk.gray(getBranch())}`);
	}

	function error(msg) {
		log(chalk.bold.red(`❌  ${msg}`));
	}

	function success(msg) {
		log(chalk.bold.green(`✅  ${msg}`));
	}
};
