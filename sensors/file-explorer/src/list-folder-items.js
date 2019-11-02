///@ts-check
const util = require('util')
const fs = require('fs')

/**
 * @param {String} folderPath
 */
module.exports = async function listFolderItems(folderPath) {
  const readDirPromise = util.promisify(fs.readdir)
  const items = await readDirPromise(folderPath)
  return items
}
