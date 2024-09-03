import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, './src'),
		},
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined,
				inlineDynamicImports: true,
				entryFileNames: 'main.js', // currently does not work for the legacy bundle
				assetFileNames: '[name].[ext]', // currently does not work for images
			},
		},
	},
})
