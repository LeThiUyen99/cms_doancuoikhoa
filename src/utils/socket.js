import { io } from 'socket.io-client'
import { getToken } from './auth'

const socket = io('http://localhost:8888/contact', { autoConnect: false, auth: getToken() })

function createWebSocketPlugin(socket) {
  return (store) => {
    store.$socket = socket
  }
}

export const websocketPlugin = createWebSocketPlugin(socket)

export default socket

