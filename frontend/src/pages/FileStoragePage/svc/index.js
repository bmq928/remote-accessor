import axios from 'axios'

import { constants } from '../vendors'

export async function showFolderTree(folderPath, depth = 3) {
  const url = `${constants.AGENT_HOST}/file/structure?directory=${folderPath}`
  const resp = await axios.get(url)
  return resp.data
}

export function readFileContent(filePath) {
  
}
