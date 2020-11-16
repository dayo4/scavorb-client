<template>
    <div v-show="show" class="GenFormWrapper py-4 shadow-12 bg-cyan--3">
        <div class="GenFormStyle shadow-12 bg-white py-8 px-5" @keydown.enter="send">
            <h3 class="icon-login text-center t-blue-grey--2 font-8 mt-0 mb-8">Login</h3>

            <!-- Stage one -->
            <section v-if="!stage_2" class="StageWrapper">
                <div class="Section">
                    <span class="Head icon-at">E-mail</span>
                    <span
                        v-show="email_err"
                        :class="email_err ? 'vibrate' : ''"
                        class="Error t-red-1"
                    >{{email_err}}</span>
                    <input
                        v-model="email"
                        type="email"
                        @input="resetResponse('email_err')"
                        placeholder="Input your email"
                    />
                </div>

                <div class="Section">
                    <span class="Head icon-lock-open-alt">Password</span>
                    <span
                        v-if="pass_err"
                        :class="pass_err ? 'vibrate' : ''"
                        class="Error t-red-1"
                    >{{pass_err}}</span>
                    <input
                        v-model="password"
                        type="password"
                        @input="resetResponse('pass_err')"
                        placeholder="Input your Password"
                    />
                </div>
            </section>
            <!-- Stage one -->

            <!-- Stage two -->
            <section v-if="stage_2" class="StageWrapper">
                <div class="Section">
                    <span class="Head icon-user">First Name</span>
                    <span class="Error t-red-1" v-show="fname_err">{{fname_err}}</span>
                    <input
                        v-model="fname"
                        type="text"
                        @input="resetResponse('fname_err')"
                        placeholder="Input your username"
                    />
                </div>

                <div class="Section">
                    <span class="Head icon-user">Last Name</span>
                    <span class="Error t-red-1" v-show="lname_err">{{lname_err}}</span>
                    <input
                        v-model="lname"
                        type="text"
                        @input="resetResponse('lname_err')"
                        placeholder="Input your username"
                    />
                </div>
            </section>
            <!-- Stage two -->

            <!-- server response alert box -->
            <transition name="expand">
                <div v-if="response.message" class="mt-5">
                    <div
                        :class="response.error ? 'bg-pink-5 t-red-1' : 'bg-lime-4 t-green-1'"
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

import { defineComponent, ref } from "vue"
import { $Auth } from "@/myStore"
import { $Validator, $Obstacle } from "@/plugins"

export default defineComponent({
    props: {
        show: { required: true, type: Boolean },
    },

    data () {
        return {
            stage_2: false,

            email: '',
            password: '',
            fname: '',
            lname: '',

            email_err: '',
            pass_err: '',
            fname_err: '',
            lname_err: '',

            staticData: [] /* to keep user email and password between stages */

        }
    },

    computed: {
        response: () => $Auth.$form.response,
    },

    methods: {
        send () {
            this.resetResponse()

            const schema1 = [
                {
                    fieldName: 'Email',
                    data: this.email,
                    rules: { required: true, email: true, }
                },
                {
                    fieldName: 'Password',
                    data: this.password,
                    rules: { required: true, string: true, min: 8, max: 50 }
                }
            ]
            const schema2 = [
                {
                    fieldName: 'First Name',
                    data: this.fname,
                    rules: { required: true, string: true, min: 2, max: 20, pattern: /^[a-zA-Z]$/ },
                    message: { pattern: 'Name may only contain letters' }
                },
                {
                    fieldName: 'First Name',
                    data: this.lname,
                    rules: { required: true, string: true, min: 2, max: 20, pattern: /^[a-zA-Z]$/ },
                    message: { pattern: 'Name may only contain letters' }
                },
            ]

            const _this = this
            const sendBtn = this.$refs.send as HTMLButtonElement
            // if(!this.stage_2){

            // }
            if ($Validator.validate(!this.stage_2 ? schema1 : schema2))
            {
                $Obstacle.create(sendBtn, {
                    action: function () {
                        if (_this.stage_2)
                        {
                            $Auth.$form.login({
                                email: _this.staticData[ 0 ],
                                password: _this.staticData[ 1 ],
                                first_name: _this.fname,
                                last_name: _this.lname,
                            }, 2).then(done => {
                                $Obstacle.destroy(sendBtn)
                            })
                        } else
                        {
                            _this.staticData = [ _this.email, _this.password ]
                            $Auth.$form.login({
                                email: _this.email,
                                password: _this.password,
                            }).then(data => {
                                $Obstacle.destroy(sendBtn)
                                if (data.next)
                                    _this.stage_2 = true
                            })
                        }
                    }
                })
            }
            const errors = $Validator.getErrors()
            this.email_err = errors[ 'Email' ]
            this.pass_err = errors[ 'Password' ]
            this.fname_err = errors[ 'First Name' ]
            this.lname_err = errors[ 'Last Name' ]
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