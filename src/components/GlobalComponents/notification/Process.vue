<template>
    <div>
        <transition name="slide-up-fade">
            <div v-show="status" class="Wrapper flex j-c-center noselect">
                <span class="Load bg-trans-2">
                    <span class="logo-base logo-small logo-fast shadow-5">
                        <span>
                            <span>
                                <b>S</b>
                            </span>
                            <span></span>
                        </span>
                        <span></span>
                    </span>

                    <span class="bg-white font-4 bold-4 pl-3 py-2 pr-3 br4 flex j-c-around">
                        <span :class="icon" class="t-pink--4"></span>
                        <span class="Text t-pink--4 px-2 letter-space-1">{{info}}</span>
                    </span>
                </span>
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
    width: 100%;
    z-index: 10;
}
.Load {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    height: 66px;
    padding: 5px;
    border-radius: 28px;
    & > span:last-child {
        height: 30px;
        min-width: 200px;
    }
}
</style>