///@ts-check
const fs = require('fs')
const util = require('util')

/**
 * @param {String} filePath 
 */
module.exports = async function readFileContent(filePath, enc='base64') {
  const readFilePromise = util.promisify(fs.readFile)
  const content = await readFilePromise(filePath, enc)
  return content
}