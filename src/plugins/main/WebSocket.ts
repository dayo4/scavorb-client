"use strict"
import webSokect from 'socket.io-client'
// import LSAgent from '@/plugins/storage/LSAgent'
const connStack: string[] = []

class WS {
  baseUrl = process.env.NODE_ENV === 'production' ? 'ws://scavorb.com' : 'ws://127.0.0.1:3000'

  createConnection (nsp: string, opts?: SocketIOClient.ConnectOpts) {
    const defaultOptions: SocketIOClient.ConnectOpts = {
      path: '/orbServer',
      secure: true,
      rejectUnauthorized: true,
      transports: [ "websocket" ],
    }
    const connOptions = opts ? Object.assign(defaultOptions, opts) : defaultOptions

    const socket = webSokect(this.baseUrl + nsp, connOptions)

    socket.on('connect', function (e) {
      // console.log('connected to ws ')
      // console.log(socket)
      connStack.push(nsp)
      // console.log(connStack)
      // socket.send('New connection established!')
    })

    socket.on('disconnect', function (reason) {
      connStack.splice(connStack.indexOf(nsp), 1)
      // console.log(socket.nsp + ' Disconnected from ws - Reason: ' + reason)
    })
    socket.on('error', function (reason) {
      // console.error('Error - Reason: ' + reason)
    })
    socket.on('reconnect', function (attemptNumber) {
      // console.log('Reconnected - ' + attemptNumber)
    })

    return socket
  }
}


export function io (nsp: string, opts?: SocketIOClient.ConnectOpts) {
  return new WS().createConnection(nsp, opts)
}