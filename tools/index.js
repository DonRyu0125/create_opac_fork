import fs from "fs";
import path from "path";

/**
 *
 * @param {string} inputDir
 * @param {string} ext
 * @returns string[]
 */
export function getFiles(inputDir, ext = "") {
  try {
    const files = fs.readdirSync(inputDir);
    if (ext === "") return files;
    return files.filter((e) => path.extname(e) === `.${ext}`);
  } catch (err) {
    console.log(err);
  }
}

/**
 *
 * @param {string} fp
 * @param {string} content
 */
export function setFileContent(fp, content) {
  try {
    if (fs.existsSync(fp)) {
      fs.unlinkSync(fp);
    }
    fs.writeFileSync(fp, content);
  } catch (error) {
    console.log(error);
  }
}
