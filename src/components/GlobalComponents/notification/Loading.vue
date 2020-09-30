<template>
    <transition name="slide-up-fade">
        <div v-show="loading.status" class="Loading flex j-c-around bg-white shadow-24">
            <span class="icon-cog-1 t-white font-7"></span>
        </div>
    </transition>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({})
export default class Loading extends Vue { }
</script>
<style lang="scss" scoped>
.Loading {
    position: fixed;
    top: 6px;
    left: 0;
    height: 2px;
    width: 100%;
    z-index: 10;

    & span {
        position: absolute;
        top: -12px;
        left: 0;
        width: 100%;
        animation: load 2s infinite;
    }
}
@keyframes load {
    from {
        transform: translateX(-20px);
    }
    to {
        transform: translateX(100%);
    }
}
</style>