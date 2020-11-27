<template>
    <div>Something</div>
    <!-- <transition name="slide-fade">
        <div class="Modal noselect" v-if="showModal"></div>
    </transition>-->
</template>
<script lang="ts">
import Vue from "vue"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import { $General } from '@/plugins'

export default Vue.extend({
    components: {
        Container,
    },
    metaInfo () {
        return $General.metaInfo({ title: 'scavorb gallery' })
    },

    data () {
        return {
            showModal: false
        }
    },
})


</script>
<style lang="scss" scoped>
.Modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    overflow-y: scroll;
}
</style>