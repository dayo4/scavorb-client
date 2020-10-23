<template>
    <Container ownID="MC-Gall">
        <h1 class="Head text-center t-blue-grey font-9 px-5">Name of the Component</h1>

        <section class="flex j-c-center">
            <div class="xs11 sm10 md8 lg10">
                <div class="my-4">Intro</div>

                <div class="Img noselect">
                    <img src="/defaults/pgs/scavorb.jpg" draggable="false" />
                </div>
                <div class="Img">
                    <img src="/defaults/pgs/scavorb.jpg" />
                </div>
                <div class="Img">
                    <img src="/defaults/pgs/scavorb.jpg" />
                </div>

                <div class="my-4">Detail</div>

                <div class="flex j-c-center mt-10">
                    <button class="btn bg-pink--3">Preview Demo</button>
                </div>
            </div>
        </section>
    </Container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import { $General } from '@/plugins'

@Component({
    components: {
        Container,
    },
    metaInfo () {
        return $General.metaInfo('scavorb gallery', null, '', '', 'website')
    },
})

export default class GalleryView extends Vue {

}

</script>
<style lang="scss" scoped>
.Title {
    margin: 6px 0 40px 0;
    font-size: 16px;
    font-weight: bold;
}

.Img {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-height: 350px;
    margin: 20px 0;
    & img {
        border-radius: 5px;
        max-width: 100%;
        max-height: 100%;
    }
}

@include xs-only {
}
</style>