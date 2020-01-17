'use strict';

const CreateTypesPlugin = (function() {
	const path = require('path');
	const fs = require('fs');

	function CreateTypesPlugin() {}

	CreateTypesPlugin.prototype.apply = function(compiler) {
		compiler.plugin('done', function() {
			const fullPath = path.join(__dirname, `../publish/sdk.d.ts`);
			fs.writeFileSync(
				fullPath,
				`export * from './types/sdk/index.d.ts';`
			);
		});
	};

	return CreateTypesPlugin;
})();

module.exports = CreateTypesPlugin;
