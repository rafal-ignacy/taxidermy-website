const CracoAlias = require("craco-alias");

module.exports = {
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: "options",
				baseUrl: "./",
				aliases: {
					"@src": "./src",
					"@components": "./src/components",
					"@utils": "./src/utils",
					"@styles": "./src/styles",
					"@pages": "./src/pages",
					"@data": "./src/data",
					"@assets": "./src/assets"
				}
			}
		}
	]
};