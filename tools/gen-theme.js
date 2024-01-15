import fs from 'fs';

import path from 'path';
import { getFiles } from './index.js';


const inputDir = './src/themes';

const outFile = './src/themes/index.json';

function main() {
    try {
        console.log("Generating theme .......");
        const files = getFiles(inputDir, 'css');
        files.forEach((file) => {
            console.log(file)
        })
    } catch (error) {
        console.log(error)
    }
}


main();
