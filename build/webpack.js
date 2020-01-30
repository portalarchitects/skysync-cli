const path = require('path');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const packageJsonPath = __dirname + '/../package.json';
const packageJson = require(packageJsonPath);

const buildNumber = process.env.BUILD_BUILDID || process.env.BUILD_NUMBER || 0;
const branch = process.env.BUILD_SOURCEBRANCH || process.env.BUILD_BRANCH || '';
const label = branch.indexOf('master') === -1 ? '-alpha' : '';

const version =
	packageJson.version
		.split('.')
		.splice(0, 2)
		.join('.') +
	'.' +
	buildNumber +
	label;

console.log('Creating version ' + version);

const excludeDeps = ['cliff', 'dot-object', 'liftoff', 'open', 'semver', 'v8flags', 'yargs'];

module.exports = {
	mode: 'none',
	entry: path.resolve(__dirname, 'ignored-entry.js'),
	output: {
		path: path.resolve(__dirname, '../publish'),
	},
	plugins: [
		new CopyPlugin([{
			from: __dirname + '/../src/sdk',
			ignore: ['*.test.ts']
		}]),
		new GeneratePackageJsonPlugin(
			{
				name: '@skysync/sdk',
				description: 'SkySync Client SDK',
				version,
				engines: packageJson.engines,
				dependencies: Object.keys(packageJson.dependencies)
					.filter(key => excludeDeps.indexOf(key) === -1)
					.reduce((deps, key) => {
						deps[key] = packageJson.dependencies[key];
						return deps;
					}, {}),
				devDependencies: {
					typescript: packageJson.devDependencies.typescript
				},
				main: './index.ts',
			},
			packageJsonPath
		)
	],
};
