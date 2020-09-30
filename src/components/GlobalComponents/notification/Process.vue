<template>
    <div>
        <transition name="slide-up-fade">
            <div v-show="status" class="Wrapper bg-trans-2 flex a-i-center j-c-center noselect">
                <div
                    class="LargeIcon icon-cog-1 flex a-i-center j-c-center bg-white t-pink--4 font-14 br5 mr-8"
                ></div>
                <div class="bg-white font-5 bold-4 pl-3 py-2 pr-3 br4 flex j-c-around">
                    <span :class="icon" class="t-pink--4"></span>
                    <span class="Text t-pink--4 px-2 letter-space-1">{{info}}</span>
                </div>
            </div>
        </transition>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { $Process } from '@/plugins'

@Component({
    computed: {
        status: () => $Process.status,
        info: () => $Process.info,
        icon: () => $Process.icon,
        // fullscreen: () => $Process.fullscreen,
    }
})
export default class Loading extends Vue { }
</script>
<style lang="scss" scoped>
.Wrapper {
    pointer-events: none;
    position: fixed;
    top: 50px;
    left: 0;
    height: 40px /* 64px */;
    width: 100%;
    z-index: 10;
    border-top: white solid 0.5px;
    border-bottom: white solid 0.5px;
    // &.fullscreen {
    //     height: 100%;
    // }
}
.Text {
    transition: width 0.5s;
}
.LargeIcon {
    height: 40px /* 60px */;
    width: 40px /* 60px */;
    animation: rotation 1s infinite;
}
@keyframes rotation {
    from {
        transform: rotateZ(0deg);
    }
    to {
        transform: rotateZ(270deg);
    }
}
</style>