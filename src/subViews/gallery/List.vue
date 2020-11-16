<template>
    <Container ownID="MC-Gall">
        <div class="flex j-c-center pt-5 noselect">
            <div class="logo-base shadow-5">
                <span>
                    <span>
                        <b>S</b>
                    </span>
                    <span></span>
                </span>
                <span></span>
            </div>
        </div>
        <div class="Title text-center t-blue-grey">SCAVORB</div>

        <h1 class="Head text-center t-blue-grey font-9 px-5"></h1>

        <!-- Filter -->
        <div class="Filter flex a-i-center noselect">
            <span class="bold-4 mr-5">Filter:</span>
            <select class="btn" @change="filter">
                <option value>All</option>
                <option value>Navigation Bars</option>
                <option value>Side Drawers</option>
                <option value>Sets</option>
            </select>
            <i></i>
        </div>

        <!-- TILES -->
        <section class="flex j-c-center">
            <div class="xs11 flex wrap j-c-center sm-j-c-start">
                <div class="Tiles noselect" v-for="(G, i) in 5" :key="i">
                    <div class="Img">
                        <img src="/defaults/pgs/scavorb.jpg" draggable="false" />
                    </div>
                    <div class="Btn">
                        <button class="btn bg-pink--3">View</button>
                    </div>
                </div>
            </div>
        </section>
    </Container>
</template>
<script lang="ts">
import { defineComponent } from "vue"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import { $General } from '@/plugins'

export default defineComponent({
    components: {
        Container,
    },
    metaInfo () {
        //@ts-ignore
        return $General.metaInfo('scavorb gallery', null, '', this.$baseUrl, 'website')
    },
})

</script>
<style lang="scss" scoped>
.Title {
    margin: 6px 0 40px 0;
    font-size: 16px;
    font-weight: bold;
}

.Filter {
    position: relative;
    margin: 30px 40px;
    // border: solid 3px;
    & select {
        padding-right: 26px;
    }
    & i {
        position: relative;
    }
    & i::after {
        content: "";
        position: absolute;
        top: 45%;
        left: -20px;
        border-top: 7px solid white;
        border-left: 7px solid transparent;
        border-right: 7px solid transparent;
    }
}

.Tiles {
    overflow: hidden;
    width: 300px;
    height: 300px;
    background-color: white;
    border-radius: 15px;
    margin: 0px 30px 30px 30px;
    // border-top: solid 3px $cyan;
    border-bottom: solid 3px $cyan;

    & > .Img {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: $cyan-4;
        width: 100%;
        height: 80%;
        & img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    & > .Btn {
        height: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
@include xs-only {
    .Tiles {
        width: 100%;
        // margin: 0px 30px 30px 0;
    }
}
</style>