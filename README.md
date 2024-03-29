# Judge-d

Judge-d is a JS CLI tool for publishing and validating contracts using [judge-d](https://github.com/HLTech/judge-d) API.

## Install

```sh
$ npm i judge-d -g
```

## Usage

```sh
$ judge-d --help
```

Help output:

```
Commands:
  judge-d publish  Publish contracts
  judge-d verify   Verify contracts

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]

```

## Commands

```sh
$ judge-d publish --help
```

```
Publish contracts

Options:
  --url             Url to judge-d instance                  [string] [required]
  --serviceName     Service name                             [string] [required]
  --serviceVersion  Service version                          [string] [required]

  Required one of:
  --pactsDir        Path to directory with pacts             [string]
  --swaggerFile     Path to swagger json file                [string]

```

```sh
$ judge-d verify --help
```

```
It verifies contracts and generates HTML report if outFile is provided

Options:
  --url             Url to judge-d instance                  [string] [required]
  --serviceName     Service name                             [string] [required]
  --serviceVersion  Service version                          [string] [required]
  --environment     Environment name                         [string] [required]
  --outFile         Path with HTML report filename, ex. report.html     [string]

```
