import fs from 'fs';

const filePath = 'src/constants/config.json';

try {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    const jsObject = JSON.parse(fileContent);

    const root = getStructure({});
    for (let key in jsObject) {
      const value = jsObject[key];
      const type = getType(value);
      const structure = getStructure(type);
      insertStructure(root, key, structure)
    }

    console.log(root);

  } catch (error) {
    throw new Error("File can't be parsed into JSON Object");
  }
} catch (err) {
  throw new Error('File not found');
}




/**
 * Simple bare minimum getType
 * @param {any} object 
 * @returns {string}
 */
function getType(object) {
  if (Array.isArray(object)) {
    return "array";
  }

  return typeof obj;
}

/**
 * Check if type is primitive
 * @param {string} type 
 * @returns {boolean}
 */
function isPrimitive(type) {
  return type === 'string' || type === 'number' || type === 'boolean'
}

/**
 * Return the structure based on type
 * @param {string} type 
 * @returns {Map<string, any>}
 */
function getStructure(type) {
  const struct = {
    "type": type
  }
  if (isPrimitive(type)) {
    return struct
  }
  if (type === 'object') {
    return { ...struct, "properties": {} }
  }
  if (type === 'array') {
    return { ...struct, "items": {} }
  }

  throw new Error('Unknown type')
}

/**
 * 
 * @param {Map<string,any>} root 
 * @param {string} prop 
 * @param {Map<string,any>} struct 
 * @returns {Map<string,any>}
 */
function insertStructure(root, prop, struct) {
  const type = root.type
  if (isPrimitive(type)) {
    return;
  }
  if (type === 'object') {
    root['properties'][prop] = struct;
  }

  if (type === 'array') {
    root['items'][prop] = struct
  }

  return root;
}