import { compile, compileFromFile } from 'json-schema-to-typescript'

// // compile from file
// compileFromFile('foo.json')
//     .then(ts => fs.writeFileSync('foo.d.ts', ts))

// // or, compile a JS object
// let mySchema = {
//     properties: [...]
// }
// compile(mySchema, 'MySchema')
//     .then(ts => ...)


import fs from "fs";
import path, { resolve } from "path";
import { getFiles } from "./index.mjs";

// eslint-disable-next-line no-undef
const base = process.cwd();

const inputDir = resolve(base, "src/schema");
const outDir = resolve(base, "src/types");

function main() {
    try {
        console.log("Generating schemas .......");
        console.time("gen-types");
        const files = getFiles(inputDir, "json");
        files.forEach((file) => {
            const filePath = resolve(inputDir, file);
            generateTypeFile(filePath, outDir);
        });

        console.log("Schemas successfully generated!");
        console.timeEnd("gen-types");
    } catch (error) {
        console.log(error);
    }
}



main();

/**
 *
 * @param {string} filePath
 */
function generateTypeFile(filePath = "./", outDir = "./types") {
    try {

        if (!fs.existsSync(outDir)) {
            fs.mkdirSync(outDir);
        }
        const fileName = path.basename(filePath);
        // const fileContent = fs.readFileSync(filePath, "utf8");
        // console.log(fileContent)

        const typedPath = resolve(outDir, `${fileName}.d.ts`);
        compileFromFile(filePath)
            .then(ts => fs.writeFileSync(typedPath, ts))
        // const fileName = path.basename(filePath);

        // const json = JSON.parse(fileContent);
        // const rootType = getType(json);
        // const root = getStructure(rootType, fileName);
        // traverseObject(json, root);
        // const metadata = {
        //     $schema: "http://json-schema.org/draft-07/schema#",
        // };
        // const schemaContent = { ...metadata, ...root };
        // const schemaPath = `${outDir}/${fileName}`;
        // if (!fs.existsSync(outDir)) {
        //     fs.mkdirSync(outDir);
        // }

        // if (fs.existsSync(schemaPath)) {
        //     fs.unlinkSync(schemaPath);
        // }
        // fs.writeFileSync(schemaPath, JSON.stringify(schemaContent));

    } catch (err) {
        throw new Error("File not found");
    }
}