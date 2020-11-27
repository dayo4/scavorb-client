<template>
    <div class="GBLMContainer flex">
        <!-- MAIN CONTENT SLOT -->
        <div
            :id="ownID?ownID:''"
            class="MC-ViewArea"
            :class="MainCB ? MainCB : `${ noSideNav ? `xs12 ${!['home'].includes($route.name) ? 'padded' : ''}` : 'xs12 lg9'}`"
        >
            <slot></slot>
        </div>
        <Footer />

        <!-- SIDE NAVIGATION SLOT -->
        <!-- <div v-if="!noSideNav" class="hide-lg-down" :class="SideCB ? SideCB : 'lg3'">
            <slot name="SideNav"></slot>
        </div>-->
    </div>
</template>
<script lang="ts">

import Footer from "@/components/navs/Footer.vue"
import Vue from "vue"
import { $Navs } from '@/myStore'

export default Vue.extend({
    components: {
        Footer
    },

    props: {
        noSideNav: { required: false, type: Boolean, default: true },
        ownID: { required: false, type: String, default: false },
        /* additional special classname binding for the slots if necessary */
        MainCB: { required: false, type: String }, /* Main_class_binding. Good for passing custom class names to the inner components for custom styling. */
        SideCB: { required: false, type: String }, /* Side_class_binding */

    },

    // mounted () {
    // $Navs.$container.element = window //document.getElementsByClassName('GBLMContainer')[ 0 ]
    // // $Navs.$container.element = document.getElementById(this.ownID)
    // $Navs.$container.ScrollingHandler()
    // }
})
</script>
<style lang="scss">
.GBLMContainer {
    position: relative;
    height: 100%;
}
.MC-ViewArea {
    position: relative;
    padding-top: 52px;
    padding-bottom: 165px; /* Bottom-nav height + Footer height + 0px*/
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

@include lg-and-up {
    .MC-ViewArea.padded {
        padding-left: 15%;
        padding-right: 15%;
    }
}

@include sm-and-down {
    .MC-ViewArea {
        padding-top: 49px;
    }
}
</style>