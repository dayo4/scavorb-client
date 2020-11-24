<template>
    <div ref="GblMinimizer" class="GblMinimizer" :style="elementHeight">
        <!-- Content Appears here -->
        <slot></slot>
        <!-- Content Appears here -->

        <div
            v-if="!deactivated && !maxHeightReached"
            @click="increaseHeight"
            class="ShowMore flex a-i-center j-c-center"
        >
            <span class="t-blue-grey font-6">Show more</span>
            <span class="icon-down-open-big t-blue-grey font-12"></span>
        </div>
        <div
            v-if="maxHeightReached"
            @click="decreaseHeight"
            class="ShowMore flex a-i-center j-c-center"
        >
            <span class="t-blue-grey font-6">Show less</span>
            <span class="icon-up-open-big t-blue-grey font-12"></span>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue"

export default Vue.extend({
    props: {
        initialHeight: { required: true, type: Number },
        nextHeight: { required: false, type: Number },
        closeable: { required: false, type: Boolean, default: true },
    },

    data () {
        return {
            onMountHeight: null as number, /* set when the element is first mounted */
            elementHeight: '' as object | string,  /* dynamically created height to override onMountHeight */
            prevHeight: null as number,  /* Useful when next height is provided and the ShowMore btn is clicked once */
            deactivated: false, /* disables the component */
            maxHeightReached: false
        }
    },

    methods: {
        increaseHeight () {
            if (this.nextHeight && this.nextHeight < this.onMountHeight)
            {
                if (this.prevHeight)
                {
                    const newHeight = this.prevHeight + this.nextHeight
                    if (newHeight < this.onMountHeight)
                        this.elementHeight = { height: newHeight + 'px' }
                    else
                    {
                        this.deactivated = true
                        this.elementHeight = ''
                    }
                }
                else
                {
                    this.prevHeight = this.nextHeight || null
                    this.elementHeight = { height: this.nextHeight + 'px' }
                }
            }
            else
            {
                this.elementHeight = ''
                if (this.closeable === true)
                    this.maxHeightReached = true
                else
                {
                    this.maxHeightReached = false
                    this.deactivated = true
                }
            }
        },

        decreaseHeight () {
            this.elementHeight = { height: this.initialHeight + 'px' }
            this.maxHeightReached = false
        }
    },

    mounted () {
        this.onMountHeight = (this.$refs.GblMinimizer as HTMLElement).clientHeight
        if (this.onMountHeight > this.initialHeight)
            this.elementHeight = { height: this.initialHeight + 'px' }
        else
            this.deactivated = true
    }
})

    // $refs!: {
    //     GblMinimizer: HTMLDivElement
    // }

</script>
<style lang="scss" scoped>
.GblMinimizer {
    position: relative;
    overflow-y: hidden;
    transition: 0.9s !important;
}
.ShowMore {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    cursor: pointer;
    // background: linear-gradient(to bottom, #d1ecf060 35%, #143a3b 100%);
    background: linear-gradient(
        to bottom,
        rgba(250, 250, 250, 0.523) 35%,
        #eceff1 100%
    );
}
</style>