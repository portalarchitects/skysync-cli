'use strict';

const CreateTypesPlugin = (function() {
	const path = require('path');
	const fs = require('fs');

	function CreateTypesPlugin() {}

	CreateTypesPlugin.prototype.apply = compiler => {
		compiler.hooks.done.tap('CreateTypes', () => {
			const fullPath = path.join(__dirname, `../publish/sdk.d.ts`);
			fs.writeFileSync(
				fullPath,
				`export * from './types/sdk';`
			);
		});
	};

	return CreateTypesPlugin;
})();

module.exports = CreateTypesPlugin;
