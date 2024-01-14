import tsj from 'ts-json-schema-generator'
import fs from 'fs'

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const config = {
    path: "./src/constants/config.json",
    tsconfig: "tsconfig.json",
    type: "*", // Or <type-name> if you want to generate schema for that one type only
};

const output_path = "./src/schema/index.json";

const schema = tsj.createGenerator(config).createSchema(config.type);
const schemaString = JSON.stringify(schema, null, 2);
fs.writeFile(output_path, schemaString, (err) => {
    if (err) throw err;
});