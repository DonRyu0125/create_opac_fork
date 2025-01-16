import { exec } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

export function setFileContent(fp: string, content: string) {
	try {
		if (fs.existsSync(fp)) {
			fs.unlinkSync(fp)
		}
		fs.writeFileSync(fp, content)
	} catch (error) {
		console.error('Error writing file:', error)
	}
}

export function rebuildOPAC() {
	const base = path.dirname(path.dirname(__dirname))

	const process = exec(`cd ${base} && npx vite build`, (error, stdout, stderr) => {
		if (error) {
			// console.error(`error: ${error.message}`)
			return
		}

		if (stderr) {
			// console.error(`stderr: ${stderr}`)
			return
		}

		// console.log(`stdout:\n${stdout}`)
	})

	process.on('spawn', () => {
		console.log('start')
	})
	process.on('exit', () => {
		console.log('exit')
	})
	process.on('disconnect', () => {
		console.log('disconnect')
	})
	process.on('close', () => {
		console.log('close')
	})
	process.on('error', () => {
		console.log('error')
	})

	return process
}
