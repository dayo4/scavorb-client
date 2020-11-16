<template>
    <TopNav />
    <HoverPanel />
    <Notify />
    <ReadQueue />
    <Input />
    <Process />
    <Auth />

    <!-- <transition name="fade-in">
        <router-view />
    </transition>-->
    <router-view v-slot="{ Component }">
        <transition name="fade-in">
            <component :is="Component" />
        </transition>
    </router-view>
    <BottomNav />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue"
import { $Auth, $Navs } from "@/myStore"

import TopNav from "@/components/navs/TopNav.vue"
import BottomNav from "@/components/navs/BottomNav.vue"
import HoverPanel from "@/components/navs/HoverPanel.vue"
import Process from "@/components/GlobalComponents/notification/Process.vue"
import Notify from "@/components/GlobalComponents/notification/Notify.vue"
import { $General } from './plugins'
// import Footer from "@/components/navs/Footer.vue"

export default defineComponent({
    components: {
        TopNav,
        BottomNav,
        HoverPanel,
        Process,
        Notify,
        ReadQueue: defineAsyncComponent(() => import("@/components/posts/misc/ReadQueue.vue")),
        Input: defineAsyncComponent(() => import("@/components/GlobalComponents/Input.vue")),
        Auth: defineAsyncComponent(() => import("@/components/auth/Auth.vue")),
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
