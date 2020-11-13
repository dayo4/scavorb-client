<template>
    <div id="app">
        <!-- <div v-if="appMode === 1"> -->
        <TopNav />
        <HoverPanel />
        <Notify />
        <ReadQueue />
        <Input />
        <Process />
        <Auth />

        <transition name="fade-in">
            <router-view />
        </transition>

        <BottomNav />
        <!-- </div> -->

        <!-- <div v-else></div> -->
        <!-- <Footer /> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { $Auth, $Navs } from "@/myStore"

// import Container from '@/components/navs/reusables/Container.vue'

import TopNav from "@/components/navs/TopNav.vue"
import BottomNav from "@/components/navs/BottomNav.vue"
import HoverPanel from "@/components/navs/HoverPanel.vue"
import Process from "@/components/GlobalComponents/notification/Process.vue"
import Notify from "@/components/GlobalComponents/notification/Notify.vue"
import { $General } from './plugins'
// import Footer from "@/components/navs/Footer.vue"

// import { $Navs } from '@/myStore'
// import Footer from "@/components/navs/Footer.vue"

@Component({
    components: {
        // Container,
        TopNav,
        BottomNav,
        HoverPanel,
        Process,
        Notify,
        ReadQueue: () => import("@/components/posts/misc/ReadQueue.vue"),
        Input: () => import("@/components/GlobalComponents/Input.vue"),
        Auth: () => import("@/components/auth/Auth.vue"),
    },
    // computed: {
    //     // loadAuth: () => import(/* webpackChunkName: "auth" */ "@/components/auth/Auth.vue")
    // }
})

export default class App extends Vue {
    // appMode: number

    // created () {
    //     this.appMode = $General.appMode
    // }
    mounted () {
        $Auth.getSysSettings()
        $Navs.$container.element = window //document.getElementsByClassName('GBLMContainer')[ 0 ]
        $Navs.$container.ScrollingHandler()
    }
}
</script>

<style lang="scss">
</style>
