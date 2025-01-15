const path = require('path')
const DotEnv = require('dotenv')
const webpack = require('webpack')
const env = DotEnv.config({ path: `./.env.local` }).parsed || {}

const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next.trim()}`] = env[next]
		? JSON.stringify(env[next].trim())
		: JSON.stringify(env[next].trim())
	return prev
}, {})

const overrideWebpackConfig = ({ webpackConfig }) => {
	webpackConfig.cache = true
	webpackConfig.output.path = path.resolve('dist')
	webpackConfig.output.filename = 'main.js'
	webpackConfig.output.clean = true
	webpackConfig.resolve.alias = {
		'@': path.resolve(__dirname, 'src'),
	}
	return webpackConfig
}

module.exports = {
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
		proxy: {
			'/api': {
				target: 'http://localhost:3000', // Replace with your API server URL
				changeOrigin: true,
				secure: false,
				pathRewrite: { '^/api': '' }, // Optional: Removes `/api` prefix
			},
		},
	},

	webpack: {
		configure: {
			entry: './src/index.tsx',
		},
	},
	plugins: [
		{
			plugin: { overrideWebpackConfig },
		},
	],
}
