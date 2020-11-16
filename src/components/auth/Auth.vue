<template>
    <transition name="slide-fade">
        <div class="AuthModal noselect" v-if="showModal">
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
                <h4 class="bg-light-blue-5 t-light-blue p-4 my-0" v-if="query.showQuery">
                    <span class="icon-info mr-2 t-blue"></span>
                    {{ query.message ? query.message : 'Sorry! You have to login to access this section.'}}
                </h4>
            </transition>

            <hr class="my-2 shadow-10" />

            <div class="FormCont flex j-c-center bg-white h-full">
                <div class="Pillar xs11 sm9 md7 lg5">
                    <!-- <div class="Logo"> -->
                    <div class="Logo logo-base logo-small shadow-5">
                        <span>
                            <span>
                                <b>S</b>
                            </span>
                            <span></span>
                        </span>
                        <span></span>
                    </div>
                    <!-- </div> -->

                    <!--current mode Title -->
                    <div class="Title flex text-center noselect">
                        <h3>SCAVORB</h3>
                    </div>

                    <!-- Reset password -->
                    <div class="text-right mb-5">
                        <b
                            v-if="mode === 1"
                            @click="switchMode(3)"
                            class="font-6 t-blue-grey bg-grey-4 p-2 br3 text-right cursor-pointer"
                        >Forgot password?</b>
                    </div>

                    <!-- Alternate btw login and signUp modes -->
                    <div
                        v-if="sysSet.allow_new_reg && mode === 1"
                        class="flex wrap a-i-center mb-5 t-blue-grey-1"
                    >
                        <span class="mr-3 bold-2">Dont have an account yet?</span>
                        <span
                            @click="switchMode(2)"
                            class="Alternate bold-4 shadow-1 icon-user-add noselect"
                        >Create New Account</span>
                    </div>
                    <div v-if="mode != 1" class="flex wrap a-i-center mb-5 t-blue-grey-1">
                        <span
                            class="mr-3 bold-2"
                        >{{ mode === 3 ? 'Oh! I just remembered' : 'Already have an account?'}}</span>
                        <span
                            @click="switchMode(1)"
                            class="Alternate bold-4 shadow-1 icon-login noselect"
                        >Login</span>
                    </div>

                    <!-- MAIN FORM COMPONENTS -->
                    <Login :show="mode === 1" />
                    <Register :show="mode === 2" />
                    <Reset :show="mode === 3" />
                    <!-- MAIN FORM COMPONENTS -->
                </div>
            </div>
        </div>
    </transition>
</template>
<script lang="ts">

import { defineComponent } from "vue"

import Login from '@/components/auth/tabs/Login.vue'
import Register from '@/components/auth/tabs/Register.vue'
import Reset from '@/components/auth/tabs/ResetPassword.vue'
import { $Auth } from "@/myStore"
import { $Validator } from "@/plugins"


export default defineComponent({
    components: {
        Login,
        Register,
        Reset
    },

    computed: {
        sysSet: () => $Auth.sysSettings,
        response: () => $Auth.$form.response,
        showModal: () => $Auth.$form.status,
        mode: () => $Auth.$form.mode,
        query: () => $Auth.$form.query,
    },

    methods: {
        switchMode (mode: number) {
            $Auth.$form.resetResponse()
            $Auth.$form.mode = mode
        },

        dismiss () {
            $Auth.$form.dismiss()
        }
    }
})
</script>
<style lang="scss">
.AuthModal {
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
    & .FormCont {
        height: 800px !important;
    }
    & .Pillar {
        position: relative;
        height: 100%;
        border-top: solid 2px rgba(75, 75, 75, 0.5);

        & .Logo {
            position: absolute;
            top: -20px;
            left: 50%;
            margin-left: -27px;
        }
    }

    & .Title {
        border-radius: 93%;
        border-top: 2px $blue-grey-2 solid;
        margin-top: 40px;
        margin-bottom: 10px;

        & h3 {
            color: $blue-grey-2;
            width: 100%;
            // text-shadow: 0.5px 1px 2px white;
            padding: 10px 0px;
        }
    }

    & .Alternate {
        font-size: 18px;
        border-radius: 28px;
        padding: 3px 5px;
        color: $blue-grey-1;
        border-radius: 4px;
        border: solid currentColor 0.5px;
        cursor: pointer;
        &:active {
            box-shadow: none !important;
        }
    }
}

/* THIS STYLES BELOW ARE SHARED BY THESE COMPONENTS ["REGISTER", "LOGIN", RESETPASSWORD, CONTACTS] */
.GenFormWrapper {
    border-radius: 12%;
    animation: fade 0.7s;

    & .StageWrapper {
        animation: fade 0.7s;
    }
}
.GenFormStyle {
    border-radius: 12%;
    & .Error {
        // font-family: "Courier New", Courier, monospace;
        font-weight: 400;
    }
    & .Alert {
        // font-family: cursive;
        font-family: "Courier New", Courier, monospace;
        font-weight: 600;
        letter-spacing: 1px;
        min-height: 50px;
        max-height: 100px;
        border-left: none;
        border-right: none;
        border-radius: 3px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    & .Section {
        justify-content: center;

        & > .Head {
            text-align: center;
            margin: auto;
            padding: 12px 16px;
            height: 40px;
            border-radius: 73% 73% 20% 20%;
            border-left: white double 10px;
            border-right: white double 10px;
            text-shadow: 0px 1px 2px white;
            display: block;
            min-width: 130px;
            max-width: 80%;
            font-weight: 500;
            font-size: 18px;
            color: white;
            background-color: $cyan--3;
        }
        & > input {
            height: 50px;
            width: 100%;
            display: block;
            padding: 5px 10px;
            margin: 3px 0 10px 0;
            flex-grow: 1;
            font-size: 18px;
            border-top: 1px $blue-grey-3 solid;
            border-bottom: 1px $blue-grey-3 solid;
        }
    }
}

@include xs-only {
    // .AuthModal {
    //     & .Logo {
    //         left: 44% !important;
    //     }
    // }
    .GenFormStyle {
        & > div {
            & > .Head {
                min-width: 95%;
            }
        }
    }
}
</style>