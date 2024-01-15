import fs from 'fs';

import path from 'path';
import { getFiles, setFileContent } from './index.js';


const inputDir = './src/themes';

const outFile = './src/themes/index.json';

const mainCSSPath = './src/index.css'

function main() {
    try {
        console.log("Generating theme .......");
        console.log('gen-theme')
        const files = getFiles(inputDir, 'css');

        const mainCSSContent = files.map((file) => getImportedCSS(file)).join('\n');
        console.log("Generating index.css content .......");

        setFileContent(mainCSSPath, mainCSSContent)

        console.log("Themes successfully generated!");
        console.timeEnd('gen-theme')

    } catch (error) {
        console.log(error)
    }
}




/**
 * 
 * @param {string} file 
 * @returns {string}
 */
function getImportedCSS(file) {
    return `@import './themes/${file}';`
}
main();
