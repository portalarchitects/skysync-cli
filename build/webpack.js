const path = require('path');
const nodeExternals = require('webpack-node-externals');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CreateTypesPlugin = require('./create-types-plugin');

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

const includeDeps = ['querystring-es3'];

module.exports = {
	mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
	entry: {
		sdk: path.resolve(__dirname, '../src/sdk/index.ts')
	},
	output: {
		libraryTarget: 'commonjs',
		filename: `[name].js`,
		path: path.resolve(__dirname, '../publish'),
	},
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		fallback: {
			'querystring': 'querystring-es3'
		}
	},
	module: {
		rules: [
			{ test: /\.ts?$/, loader: 'ts-loader' },
		],
	},
	plugins: [
		new CreateTypesPlugin(),
		new GeneratePackageJsonPlugin(
			{
				name: '@skysync/sdk',
				description: 'SkySync Client SDK',
				version,
				engines: packageJson.engines,
				main: './sdk.js',
				types: './sdk.d.ts',
				dependencies: Object.keys(packageJson.dependencies)
					.filter(k => includeDeps.indexOf(k) >= 0)
					.reduce((result, k) => {
						result[k] = packageJson.dependencies[k];
						return result;
					}, {})
			},
			{
				sourcePackageFilenames: [packageJsonPath]
			}
		),
		new CopyPlugin({
			patterns: [{ from: __dirname + '/.npmrc' }]
		})
	],
	externals: [
		{ 'querystring': 'querystring-es3' },
		nodeExternals()
	],
	...(process.env.NODE_ENV !== 'production' ? { devtool: 'eval-source-map' } : undefined)
};
