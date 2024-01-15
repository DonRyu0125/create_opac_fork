import fs from 'fs';
const filePath = './src/constants/config.json';
// eslint-disable-next-line no-undef
try {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  try {
    const json = JSON.parse(fileContent)
    const rootType = getType(json)
    const root = getStructure(rootType);
    traverseObject(json, root)
    const metadata = {
      "$schema": "http://json-schema.org/draft-07/schema#",
    }
    const schemaContent = { ...metadata, ...root }
    const schemaPath = filePath.replace('constants', `schema`);

    if (fs.existsSync(schemaPath)) {
      fs.unlinkSync(schemaPath);
    }
    fs.writeFileSync(schemaPath, JSON.stringify(schemaContent));


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
  const type = typeof object;
  return type;
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
    "type": type,
    "title": "",
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

  // throw new Error('Unknown type')
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
    root['items'] = struct
  }

  return root;
}


/**
 * 
 * @param {Map<string,any>} object 
 * @param {Map<string,any>} root 
 */
function traverseObject(object, root) {
  for (let key in object) {
    const value = object[key];
    const type = getType(value);
    const structure = getStructure(type);
    structure.title = camelCaseToRegularString(key)
    if (!isPrimitive(type)) {
      traverseObject(value, structure)
    }
    insertStructure(root, key, structure)
  }
}

/**
 * 
 * @param {string} camelCaseString 
 * @returns string
 */
function camelCaseToRegularString(camelCaseString) {
  const regularString = camelCaseString.replace(/([a-z])([A-Z])/g, '$1 $2');

  return regularString.charAt(0).toUpperCase() + regularString.slice(1);
}