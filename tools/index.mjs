import fs from 'fs'
import path from 'path'

/**
 *
 * @param {string} inputDir: path to input file
 * @param {string | undefined} ext: file extension
 * @returns string[] all the files in the directory
 */
export function getFiles(inputDir, ext = '') {
	try {
		const files = fs.readdirSync(inputDir)
		if (ext === '') return files
		return files.filter((e) => path.extname(e) === `.${ext}`)
	} catch (err) {
		console.log(err)
	}
}

/**
 *
 * @param {string} fp: file path
 * @param {string} content: file content
 */
export function setFileContent(fp, content) {
	try {
		if (fs.existsSync(fp)) {
			fs.unlinkSync(fp)
		}
		fs.writeFileSync(fp, content)
	} catch (error) {
		console.log(error)
	}
}
