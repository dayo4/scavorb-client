declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component


  import type SocketIOClient from 'socket.io-client'
  export default SocketIOClient

  // import type jjjj from '@tryghost/content-api'
  // export default SocketIOClient
  // export interface Vue {
  //   $moment: any
  //   $postBaseUrl: string
  //   $userBaseUrl: string
  // }
}
