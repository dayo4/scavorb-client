<template>
    <section class="Cont flex j-c-center a-i-center">
        <transition :name="'fadeflip'+ flips.dir">
            <img
                v-if="flips.nextFlip"
                class="br2"
                :src="'/defaults/flips/'+flips.page+'.jpg'"
                draggable="false"
            />
        </transition>
    </section>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Container from '@/components/navs/reusables/Container.vue'

import { $Pages } from "@/myStore"

@Component({
    components: {
        Container,
    },

    computed: {
        flips: () => $Pages.$home.flips
    }
})
export default class Flipper extends Vue {

    mounted () {
        $Pages.$home.startFlipper()
    }

    beforeDestroy () {
        $Pages.$home.endFlipper()
    }
}
</script>
<style lang="scss" scoped>
.Cont {
    height: 300px;
    // background-color: rgb(45, 45, 45);
    background-image: url("/defaults/pgs/p8.png");
    background-position: center;
    background-repeat: repeat;
    // background-size: cover;
    & img {
        max-width: 100%;
        max-height: 95%;
    }
}

.fadeflip1-enter-active,
.fadeflip1-leave-active,
.fadeflip2-enter-active,
.fadeflip2-leave-active
// .fadeflip3-enter-active,
// .fadeflip3-leave-active,
// .fadeflip4-enter-active,
// .fadeflip4-leave-active
{
    transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fadeflip1-enter,
.fadeflip1-leave-to {
    // transform: translateY(120px) rotateX(90deg);
    transform: rotateX(90deg);
    opacity: 0.3;
}
.fadeflip2-enter,
.fadeflip2-leave-to {
    // transform: translateY(120px) rotateX(90deg);
    transform: rotateY(90deg);
    opacity: 0.3;
}
// .fadeflip2-enter,
// .fadeflip2-leave-to {
//     // transform: translateY(120px) rotateX(90deg);
//     transform: rotateX(-90deg);
//     opacity: 0.3;
// }
// .fadeflip4-enter,
// .fadeflip4-leave-to {
//     // transform: translateY(120px) rotateX(90deg);
//     transform: rotateY(-90deg);
//     opacity: 0.3;
// }
</style>