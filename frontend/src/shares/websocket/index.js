import io from 'socket.io-client'

/**
 * @type {SocketIOClient.Socket}
 */
let socket = null

export class SocketConnectionError extends Error {}

export function connect(host) {
  socket = io(host)
  return socket
}

export function disconnect() {
  socket.disconnect()
}