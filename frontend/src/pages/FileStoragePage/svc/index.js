import { websocket, constants } from '../vendors'


const socket = websocket.connect(constants.AGENT_HOST)

export function showFolderTree(folderPath, depth = 1) {
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
