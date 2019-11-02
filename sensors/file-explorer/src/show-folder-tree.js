///@ts-check
const fs = require('fs')
const util = require('util')
const path = require('path')

const readdir = util.promisify(fs.readdir)
const stat = util.promisify(fs.stat)
const exists = util.promisify(fs.exists)

/**
 * @typedef FileInfo
 * @type {Object}
 * @property {Boolean} rootIsFile
 * @property {String} path
 * @property {Array<FileInfo>} files
 * @property {Array<FileInfo>} folders
 */

/**
 * @param {String} folderPath
 * @param {Number} depth
 * @returns {Promise<FileInfo>}
 */
module.exports = async function showFolderTree(folderPath, depth = 3) {
  const existed = await exists(folderPath)
  if (!existed) throw new Error('folderPath is not existed')

  return await showFolderTreeRecursive(folderPath, depth, 0)
}

/**
 * @param {String} itemPath
 * @param {Number} depth
 * @param {Number} curDepth
 * @returns {Promise<FileInfo>}
 */
async function showFolderTreeRecursive(itemPath, depth, curDepth) {
  const rootIsFile = (await stat(itemPath)).isFile()
  if (rootIsFile || curDepth === depth) {
    const fileInfoOptions = {
      rootIsFile,
      path: itemPath,
      files: [],
      folders: [],
    }
    return createFileInfo(fileInfoOptions)
  }

  const childrenNames = await readdir(itemPath)
  const childrenPaths = childrenNames.map(name => path.join(itemPath, name))
  const childrenFileInfos = await Promise.all(
    childrenPaths.map(childPath =>
      showFolderTreeRecursive(childPath, depth, curDepth + 1)
    )
  )
  const curFileInfoOptions = {
    rootIsFile,
    path: itemPath,
    files: childrenFileInfos.filter(child => child.rootIsFile),
    folders: childrenFileInfos.filter(child => !child.rootIsFile),
  }

  return createFileInfo(curFileInfoOptions)
}

/**
 * @param {FileInfo} options
 * @returns {FileInfo}
 */
function createFileInfo(options) {
  if (!options.path) throw new Error('path is required')
  if (!Array.isArray(options.files)) throw new Error('files should be an array')
  if (!Array.isArray(options.folders))
    throw new Error('folders should be an array')

  const defaultOption = {
    rootIsFile: true,
    path: '',
    files: [],
    folders: [],
  }

  return {
    ...defaultOption,
    ...options,
  }
}
