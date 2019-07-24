<h1 align="center">CIT</h1>

<p align="center">
<b>Automatically add branch to commit message | add, commit and push in one command | quick git.</b><br>
<sub>cit c "npm install me" -n</sub>
</p>

<br>

<p align="center">
<a href="https://www.npmjs.com/package/@sanderhelleso/cit">
<img src="https://github.com/sanderhelleso/cit/blob/master/preview/preview.gif" alt="version">
</a>

<br>
<br>

## ❯ Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install @sanderhelleso/cit -g
```

<br>

## ❯ Usage

### Add all changes to current branch

<p>Add all new git changes in current directory to current branch</p>

```sh
$ cit a
```

### Push all commits to branch

<p>Pushes all commits to specified branch from the current branch</p>

```sh
$ cit p "name"
```

### Show current branch

<p>Shows the current git branch of the current git project</p>

```sh
$ cit l
```

### Show current branch

<p>Commit to current branch with branch name prefixed to commit message</p>

Commit
```sh
$ cit c "message"
```

Commit and add 
```sh
$ cit c "message" -a
```

Commit, add and push
```sh
$ cit c "message" -a -p "branch"
```

### Show current branch

<p>Checkout to provided branch or create a new branch</p>

Checkout existing branch
```sh
$ cit b "name"
```

Checkout new branch
```sh
$ cit b "name" -n
```
