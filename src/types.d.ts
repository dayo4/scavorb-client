import Vue from 'vue'

import type SocketIOClient from "socket.io-client"
// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface Vue {
        $moment: any
        $postBaseUrl: string
        $userBaseUrl: string
    }


}
export default SocketIOClient 
