const fs = require('fs').promises;
const path = require('path');

/**
 * Returns parsed JSON from db file
 * @param {string} file
 */
exports.getJsonFromDB = async file =>
  JSON.parse(await fs.readFile(path.join(__dirname, 'data', file)));

/**
 * Writes `data` to a json file
 * @param data
 * @param {string} file`
 */
exports.writeJsonToDB = (data, file) =>
  fs.writeFile(path.join(__dirname, 'data', file), JSON.stringify(data));
