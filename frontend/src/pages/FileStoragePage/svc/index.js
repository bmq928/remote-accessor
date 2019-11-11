import axios from 'axios'

import { constants } from '../vendors'

export async function showFolderTree(folderPath, depth = 3) {
  const url = `${constants.AGENT_HOST}/file/structure?directory=${folderPath}`
  const resp = await axios.get(url)
  return resp.data
  // return new Promise((resolve, reject) => {
  //   if (!socket) reject(new SocketConnectionError('socket is not connected'))
  //   if (!socket.connected)
  //     reject(new SocketConnectionError('agents socket is not online'))
  //   if (socket.disconnected)
  //     reject(new SocketConnectionError('socket is disconnected'))

  //   const message = { folderPath, depth }
  //   socket.emit(constants.FILE_EXPLORER_SHOW_FOLDER_TREE_REQUESTED, message)
  //   socket.on(constants.FILE_EXPLORER_SHOW_FOLDER_TREE_DONE, resp =>
  //     resolve(resp)
  //   )
  // })
}

export function readFileContent(filePath) {
  // return new Promise((resolve, reject) => {
  //   if (!socket) reject(new SocketConnectionError('socket is not connected'))
  //   if (!socket.connected)
  //     reject(new SocketConnectionError('agents socket is not online'))
  //   if (socket.disconnected)
  //     reject(new SocketConnectionError('socket is disconnected'))
  // })
}
