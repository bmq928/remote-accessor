import axios from 'axios'

import { constants } from '../vendors'

export async function showFolderTree(folderPath, depth = 3) {
  const url = `${constants.AGENT_HOST}/file/structure?directory=${folderPath}&depth=${depth}`
  const resp = await axios.get(url)
  return resp.data
}

export async function readFileContent(filePath) {
  const url = `${constants.AGENT_HOST}/file/content?filePath=${filePath}`
  const resp = await axios.get(url)
  return resp.data
}
