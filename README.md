# Git Deploy logger

A tool that can be used to write logging info about deployments (also other actions are possible) of applications.  
We use this tool to log our deployments of SAPUI5 applications to SAP ABAP repository.

When you call this tool it collects some information from git, package.json as well as some SAP
specific deploy information and writes it to a local json file.

## Written log information

The log is written in json format. Here you see what gets logged

```
[
  {
    "project": "<name of package.json>",
    "version": "<version of package.json>",
    "branch": "<the current git branch>",
    "username": "<the git username from git config>",
    "date": "<current date with format yyyy-mm-dd>",
    "time": "<current time with format HH:MM:ss>",
    "commit": "<the latest git commit hash>",
    "commitInfo": "<additional information, e.g. problems that occured>",
    "abap_package": "<package name of the ABAP package the bsp is associated to",
    "abap_bsp": "<name of the ABAP BSP the application is deployed to>",
    "abap_transport": "<ABAP transport name/ID>"
  }
]
```

and here is an example

```
[
  {
    "project": "salesorder-app",
    "version": "1.1.0",
    "branch": "main",
    "username": "Helmut Tammen",
    "date": "2024-09-15",
    "time": "14:19:31",
    "commit": "",
    "commitInfo": "deployed with unstaged changes",
    "abap_package": "ZOURS_TP_APPS",
    "abap_bsp": "ZTP_MONI_FLP",
    "abap_transport": "AB1K600434"
  }
]
```

### Property Documentation

#### project

The tool reads the property `name` from your package.json and prints it in this property.

#### version

The tools reads the property `version` from your package.json and prints it in this property.

#### branch

The branch is read with the command `git branch --show-current` and printed to this property.

#### username

The username is read with the command `git config user.name` and printed to this property.

#### date

This is the current date with format yyyy-mm-dd

#### time

This is the current time with format HH:MM:ss

#### commit

Here the commit hash from the current git commit is printed. But this is only true if
there are no unstaged changes in your current workspace and if there are no uncommitted
changes.  
We only write the commit hash for commited changes to make clear that this deployment may not
be reproducable at a later time, e.g. if the developer discards and never commits the changes.  
If commit is empty the commitInfo gives more details.

#### commitInfo

Additional information to the git commit. Gets only filled if `commit` is empty.

#### abap_package

ABAP package name. This is either read from the file `ui5-deploy.yaml` or `.nwabaprc`.

#### abap_bsp

ABAP bsp name. This is either read from the file `ui5-deploy.yaml` or `.nwabaprc`.

#### abap_transport

ABAP transport name/ID. This is either read from the file `ui5-deploy.yaml` or `.nwabaprc`.

## Installation

```
npm install -D @htammen/deploy-abap-logger
```

## Usage

To use this tool just add it to a script of your package.json.  
Here is an example. Here we use `nwabap:upload` to deploy our SAPUI5 application to the ABAP system.

```
  "scripts": {
    ...
    "deploy": "npm-run-all build nwabap:upload write-deploy-log",
    "write-deploy-log": "deploy-abap-logger"
  }
```

## Contribution

This package currently works for our environment. There might be other ones that are slightly different.  
If it does not fit into yours you can either add changes via forks and pull requests or create an [issue](https://github.com/htammen/deploy-abap-logger/issues).
on github.
