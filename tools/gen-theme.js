import fs from 'fs';

import path from 'path';
import { getFiles, setFileContent } from './index.js';


const inputDir = './src/themes';

const styleMapPath = './src/themes/index.json';

const mainCSSPath = './src/index.css'

function main() {
    try {
        console.log("Generating theme .......");
        console.log('gen-theme')
        const files = getFiles(inputDir, 'css');

        const mainCSSContent = files.map((file) => getImportedCSS(file)).join('\n');
        const styleMapContent = files.map((file) => getStyleMapObject(file))
        console.log("Generating index.css content .......");

        setFileContent(mainCSSPath, JSON.stringify(mainCSSContent))
        setFileContent(styleMapPath, JSON.stringify(styleMapContent))

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

/**
 * 
 * @param {string} file 
 * @returns {string}
 */
function getStyleMapObject(file) {
    return file;
}
main();
