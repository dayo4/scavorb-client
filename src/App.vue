<template>
    <div id="app">
        <TopNav />
        <HoverPanel />
        <Notify />
        <ReadQueue />
        <Input />
        <Process />

        <transition name="fade-in">
            <router-view />
        </transition>

        <BottomNav />
        <Auth />
        <!--<component :is="loadAuth"></component> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { $Auth } from "@/myStore"


import TopNav from "@/components/navs/TopNav.vue"
import BottomNav from "@/components/navs/BottomNav.vue"
import HoverPanel from "@/components/navs/HoverPanel.vue"
import Process from "@/components/GlobalComponents/notification/Process.vue"
import Notify from "@/components/GlobalComponents/notification/Notify.vue"

@Component({
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
})

export default class App extends Vue {
    mounted () {
        $Auth.getSysSettings()
    }
}
</script>

<style lang="scss">
</style>
