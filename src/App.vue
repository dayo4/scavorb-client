<template>
    <div>
        <TopNav />
        <HoverPanel />
        <Notify />
        <ReadQueue />
        <Input />
        <Process />
        <Auth />

        <transition name="fade-in">
            <router-view></router-view>
        </transition>

        <BottomNav />
    </div>
</template>

<script lang="ts">
import Vue from "vue"
import { $Auth, $Navs } from "@/myStore"

import TopNav from "@/components/navs/TopNav.vue"
import BottomNav from "@/components/navs/BottomNav.vue"
import HoverPanel from "@/components/navs/HoverPanel.vue"
import Process from "@/components/GlobalComponents/notification/Process.vue"
import Notify from "@/components/GlobalComponents/notification/Notify.vue"
import { $General } from './plugins'
// import Footer from "@/components/navs/Footer.vue"

export default Vue.extend({
    components: {
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

    mounted () {
        $Auth.getSysSettings()
        $Navs.$container.element = window //document.getElementsByClassName('GBLMContainer')[ 0 ]
        $Navs.$container.ScrollingHandler()
    }
})

</script>

<style lang="scss">
</style>
