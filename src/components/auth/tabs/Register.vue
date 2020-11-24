<template>
    <div v-show="show" class="GenFormWrapper py-4 shadow-12 bg-cyan--3">
        <div class="GenFormStyle shadow-12 bg-white py-8 px-5" @keydown.enter="send">
            <h3
                class="icon-user-add text-center t-blue-grey--2 font-8 mt-0 mb-8 noselect"
            >New Account</h3>

            <div class="Section">
                <span class="Head icon-user">Username</span>
                <span class="Error t-red-1" v-show="username_err">{{username_err}}</span>
                <input
                    v-model="username"
                    type="text"
                    @input="resetResponse('username_err')"
                    placeholder="Input your username"
                />
            </div>

            <div class="Section">
                <span class="Head icon-at">E-mail</span>
                <span v-show="email_err" class="Error t-red-1">{{email_err}}</span>
                <input
                    v-model="email"
                    type="email"
                    @input="resetResponse('email_err')"
                    placeholder="Input your email"
                />
            </div>

            <div class="Section">
                <span class="Head icon-lock-open-alt">Password</span>
                <span v-if="pass_err" class="Error t-red-1">{{pass_err}}</span>
                <input
                    v-model="password"
                    type="password"
                    @input="resetResponse('pass_err')"
                    placeholder="Input your Password"
                />
            </div>

            <!-- server response alert box -->
            <transition name="expand">
                <div v-if="response.message" class="mt-5">
                    <div
                        :class="response.error ? 'bg-pink-5 t-red-1' : 'bg-lime-4 t-green--1'"
                        class="Alert p-3 b1"
                    >{{response.message}}</div>
                </div>
            </transition>

            <!-- Login button -->
            <button
                ref="send"
                @click="send"
                class="btn cyan-gradient-btn shadow-5 font-7 br4 mt-5 m-auto noselect"
            >
                <span class="icon-paper-plane mr-4"></span>
                <span>OK</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts">

import Vue from "vue"
import { $Auth } from "@/myStore"
import { $Validator, $Obstacle } from "@/plugins"


export default Vue.extend({
    props: {
        show: { required: true, type: Boolean },
    },

    data () {
        return {
            username: '',
            email: '',
            password: '',

            username_err: '',
            email_err: '',
            pass_err: ''
        }
    },


    computed: {
        response: () => $Auth.$form.response,
    },

    methods: {
        send () {
            this.resetResponse()

            const schema = [
                {
                    fieldName: 'Username',
                    data: this.username,
                    rules: {
                        required: true,
                        string: true,
                        min: 3,
                        max: 15,
                        pattern: /^([a-zA-Z]{3,})([0-9])*$/
                    },
                    messages: {
                        pattern: 'Username may only contain letters and numbers. Must start with minimum of 3 letters'
                    }
                },
                {
                    fieldName: 'Email',
                    data: this.email,
                    rules: {
                        required: true,
                        email: true,
                    }
                },
                {
                    fieldName: 'Password',
                    data: this.password,
                    rules: {
                        required: true,
                        string: true,
                        min: 8,
                        max: 50
                    }
                }
            ]

            const _this = this
            const sendBtn = this.$refs.send as HTMLButtonElement

            if ($Validator.validate(schema))
            {
                $Obstacle.create(sendBtn, {
                    action: function () {
                        $Auth.$form.register({
                            username: _this.username,
                            email: _this.email,
                            password: _this.password
                        }).then(done => {
                            $Obstacle.destroy(sendBtn)
                        })
                    }
                })
            }
            const errors = $Validator.getErrors()
            this.username_err = errors[ 'Username' ]
            this.email_err = errors[ 'Email' ]
            this.pass_err = errors[ 'Password' ]
        },

        resetResponse (err?: string) {
            if (this[ err ])
                this[ err ] = ''
            if (this.response)
            {
                $Auth.$form.resetResponse()
            }
        }
    }
})

</script>
<style lang="scss">
/* NOTE: "GenFormStyle GenFormWrapper" shared classes are found in the main "Auth" components */
</style>