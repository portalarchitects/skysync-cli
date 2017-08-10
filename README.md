[![Build Status](https://travis-ci.org/portalarchitects/skysync-cli.svg?branch=master)](https://travis-ci.org/portalarchitects/skysync-cli)
[![npm version](https://badge.fury.io/js/skysync-cli.svg)](https://www.npmjs.com/package/skysync-cli)
[![Downloads](https://img.shields.io/npm/dm/skysync-cli.svg)](https://www.npmjs.com/package/skysync-cli)

# SkySync CLI

[SkySync](https://www.skysync.com/) is a file sync and migration solution used by many enterprises to securely migrate, copy, and synchronize files across storage system. Whether you’re ready to bridge your disconnected storage environment or looking to integrate and deploy new on-premises systems and/or cloud-based EFSS services, [SkySync](https://www.skysync.com/) is here. 

The SkySync CLI allows you to fully automate and manage your [SkySync](https://www.skysync.com/) instances.

## Installing

For the latest stable version:

```shell
npm install -g skysync-cli
```

## Usage

```shell
skysync-cli --help
```

### Configuring

Any command line option that can be passed in to the SkySync CLI can also be picked up through environment variables (i.e. SKYSYNC_option=value) or through the presence of a skysync-cli.json file any where in the current directory hierarchy. This can be useful if you are managing an instance that is not running locally. You could create a skysync-cli.json file with the url, username, and password so that you do not need to pass it in with every command invocation.

```json
{
	"url": "https://1.2.3.4:9090/",
	"username": "admin",
	"password": "my crazy secret password"
}
```
