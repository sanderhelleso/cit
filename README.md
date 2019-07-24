<h1 align="center">CIT - Quick Git</h1>

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

CIT is tiny and easy to use. It aims to increase the git flow where structured commits and branches are required. 

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

<br>

```sh
$ cit a
```

<br>


### Push all commits to branch

<p>Pushes all commits to specified branch from the current branch</p>

<br>

```sh
$ cit p "name"
```

<br>


### Show current branch

<p>Shows the current git branch of the current git project</p>

<br>

```sh
$ cit l
```

<br>


### Show current branch

<p>Commit to current branch with branch name prefixed to commit message</p>

<br>

<sub>Commit</sub>
```sh
$ cit c "message"
```

<sub>Commit and add</sub> 
```sh
$ cit c "message" -a
```

<sub>Commit, add and push</sub>
```sh
$ cit c "message" -a -p "branch"
```

<br>


### Checkout branch

<p>Checkout to provided branch or create a new branch</p>

<br>

<sub>Checkout existing branch</sub>
```sh
$ cit b "name"
```

<sub>Checkout new branch</sub>
```sh
$ cit b "name" -n
```

<br>

## ❯ LICENCE
MIT
