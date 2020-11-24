<template>
    <transition name="slide-fade">
        <div class="contactModal" v-if="showModal">
            <!-- HEADER -->
            <h3
                class="Head flex a-i-center j-c-between bg-white t-blue-grey font-7 p-4 my-0 noselect"
            >
                <span class="Header text-up font-6">Login or Create Account</span>
                <div @click="dismiss" class="labeled-action px-2">
                    <span class="icon-off t-pink-2"></span>
                    <span class="font-2">Close</span>
                </div>
            </h3>
            <transition name="slide-fade">
                <!-- This will display the route query payload when the user is redirected to the Login page from somewhere. -->
                <h4 class="bg-light-blue-5 t-light-blue p-4 my-0">
                    <span class="icon-info mr-2 t-blue"></span>
                    {{ 'Sorry! You have to login to access this section.'}}
                </h4>
            </transition>

            <hr class="my-2 shadow-10" />

            <div class="FormCont flex j-c-center bg-white h-full">
                <div class="Pillar xs11 sm9 md7 lg5">
                    <span class="Logo br5 t-cyan-5 bg-blue-grey--2 font-11 shadow-5">
                        <span
                            class="icon-spin5 animate-spin w-full h-full flex a-i-center j-c-center"
                        ></span>
                    </span>

                    <!--current mode Title -->
                    <div class="Title flex j-c-center noselect">
                        <h3 class="text-center">Scav Orb</h3>
                    </div>

                    <!-- Contact Component -->
                    <Contact></Contact>
                    <!-- Contact Component -->
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">

// import Vue from "vue"

// import { $Auth } from "@/myStore"
// import { $Validator } from "@/plugins"


// export default Vue.extend({
//     // computed: {

//     // }
// })
// export default class Auth extends Vue {

//     dismiss () {

//     }

// }
</script>
<style lang="scss" scoped>
.contactModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    overflow: scroll;
    background-color: rgba(87, 84, 84, 0.712);
    & .Head {
        border-radius: 8px 8px 0 0;
        & .Header {
            max-width: 90%;
            overflow-x: hidden;
        }
    }
}
.FormCont {
    height: 800px !important;
}
</style>