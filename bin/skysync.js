#!/usr/bin/env node

'use strict';

require('clifflite');

const semver = require('semver');
const packageJson = require('../package.json');
const expectedVersion = packageJson.engines.node;

if (!semver.satisfies(process.version.substring(1), expectedVersion)) {
	console.error('Incorrect node version'.red +
				('\n`skysync-cli` requires `' + expectedVersion + '`, ' +
				'you’re currently running `' + process.version + '`.').yellow);
	process.exit(-1);
} else {
	require('../dist');
}
