<template>
    <div class="GBLMContainer flex">
        <!-- MAIN CONTENT SLOT -->
        <div
            :id="ownID?ownID:''"
            class="MC-ViewArea"
            :class="MainCB ? MainCB : `${ noSideNav ? 'xs12' : 'xs12 lg9'}`"
        >
            <slot></slot>

            <Footer />
        </div>

        <!-- SIDE NAVIGATION SLOT -->
        <div v-if="!noSideNav" class="hide-lg-down" :class="SideCB ? SideCB : 'lg3'">
            <slot name="SideNav"></slot>
        </div>
    </div>
</template>
<script lang="ts">

import Footer from "@/components/navs/Footer.vue"
import { Component, Vue, Prop } from "vue-property-decorator"
import { $Navs } from '@/myStore'

@Component({
    components: {
        Footer
    }
})
export default class GBLMContainer extends Vue {
    // $ref!: {
    // 	Container: HTMLElement
    // }
    @Prop({ required: false, default: false }) noSideNav: boolean
    @Prop({ required: false, default: false }) ownID: string
    /* additional special classname binding for the slots if necessary */
    @Prop({ required: false, }) readonly MainCB /* Main_class_binding */: string  /* Good for passing custom class names to the inner components for custom styling. */
    @Prop({ required: false, }) readonly SideCB /* Side_class_binding */: string

    mounted () {
        $Navs.$container.element = document.getElementById(this.ownID)
        $Navs.$container.ScrollingHandler()
    }

}
</script>
<style lang="scss">
.GBLMContainer {
    position: relative;
    height: 100vh;
}
.MC-ViewArea {
    position: relative;
    padding-top: 52px;
    padding-bottom: 45px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}

@include sm-and-down {
    .MC-ViewArea {
        padding-top: 49px;
    }
}
</style>