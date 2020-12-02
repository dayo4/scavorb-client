<template>
    <div v-show="show" class="GenFormWrapper py-4 shadow-12 bg-cyan--3">
        <div class="GenFormStyle shadow-12 bg-white py-8 px-5" @keydown.enter="send">
            <h3
                class="icon-arrows-cw text-center t-blue-grey--2 font-8 mt-0 mb-8 noselect"
            >Reset Password</h3>

            <!-- Stage one -->
            <section v-if="stage===1" class="StageWrapper">
                <div class="Section">
                    <span class="Head">Your E-mail</span>
                    <span v-show="email_err" class="Error t-red-1">{{email_err}}</span>
                    <input
                        v-model="email"
                        type="email"
                        @input="resetResponse('email_err')"
                        placeholder="Enter your account email"
                    />
                </div>
            </section>
            <!-- Stage one -->

            <!-- Stage two -->
            <section v-if="stage===2" class="StageWrapper">
                <div class="Section">
                    <span class="Head">Enter Code</span>
                    <span v-if="code_err" class="Error t-red-1">{{code_err}}</span>
                    <input
                        v-model="code"
                        type="text"
                        @input="resetResponse('code_err')"
                        placeholder="Enter the code sent to you"
                    />
                </div>
            </section>
            <!-- Stage two -->

            <!-- Stage three -->
            <section v-if="stage ===3" class="StageWrapper">
                <div class="Section">
                    <span class="Head">New Password</span>
                    <span v-if="pass_err" class="Error t-red-1">{{pass_err}}</span>
                    <input
                        v-model="password"
                        type="password"
                        @input="resetResponse('pass_err')"
                        placeholder="Enter a new Password"
                    />
                </div>
            </section>
            <!-- Stage three -->

            <!-- server response alert box -->
            <transition name="expand">
                <div v-if="response.message" class="mt-5">
                    <div
                        :class="response.error ? 'bg-pink-5 t-red-1' : 'bg-lime-5 t-green'"
                        class="Alert p-3 b1"
                    >{{response.message}}</div>
                </div>
            </transition>

            <!--action button -->
            <div class="flex j-c-center">
                <button
                    v-if="stage === 2"
                    @click="(stage = 1) && (code = '')"
                    class="btn cyan-gradient-btn shadow-5 font-7 br4 mt-5 m-auto noselect"
                >
                    <span class="icon-left-open-big mr-4"></span>
                    <span class="font-5">BACK</span>
                </button>

                <button
                    ref="send"
                    @click="send"
                    class="btn cyan-gradient-btn shadow-5 font-7 br4 mt-5 m-auto noselect"
                >
                    <span class="icon-right-open-big mr-4"></span>
                    <span class="font-5">NEXT</span>
                </button>
            </div>
            <!-- <b v-if="stage === 1" @click="stage = 2">I already have a code</b> -->
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
            stage: 1,

            email: '',
            password: '',
            code: '',

            email_err: '',
            pass_err: '',
            code_err: '',

            staticEmail: ''
        }
    },

    computed: {
        response: () => $Auth.$reset.response,
    },

    methods: {
        send () {
            this.resetResponse()

            const schema1 = [
                {
                    fieldName: 'Email',
                    data: this.email,
                    rules: { required: true, email: true, }
                }
            ]
            const schema2 = [
                {
                    fieldName: 'Code',
                    data: this.code,
                    rules: { required: true }
                }
            ]
            const schema3 = [
                {
                    fieldName: 'Password',
                    data: this.password,
                    rules: { required: true, string: true, min: 8, max: 50 }
                }
            ]

            const _this = this
            const sendBtn = this.$refs.send as HTMLButtonElement

            if ($Validator.validate(this.stage === 1 ? schema1 : this.stage === 2 ? schema2 : schema3))
            {
                $Obstacle.create(sendBtn, {
                    icon: 'icon-spin6',
                    action: function () {
                        if (_this.stage === 1)
                        {
                            _this.staticEmail = _this.email
                            $Auth.$reset.send({
                                stage_1: {
                                    email: _this.email,
                                }
                            }).then(data => {
                                $Obstacle.destroy(sendBtn)
                                if (data && data.stage === 2)
                                {
                                    _this.stage = 2
                                }
                            })
                        } else if (_this.stage === 2)
                        {
                            $Auth.$reset.send({
                                stage_2: {
                                    email: _this.staticEmail,
                                    token: _this.code,
                                }
                            }).then(data => {
                                $Obstacle.destroy(sendBtn)
                                if (data && data.stage === 3)
                                {
                                    _this.stage = 3
                                }
                            })
                        } else
                        {
                            $Auth.$reset.send({
                                stage_3: {
                                    email: _this.staticEmail,
                                    password: _this.password,
                                }
                            }).then(done => {
                                $Obstacle.destroy(sendBtn)
                            })
                        }
                    }
                })
            }
            const errors = $Validator.getErrors()
            this.email_err = errors[ 'Email' ]
            this.pass_err = errors[ 'Password' ]
            this.code_err = errors[ 'Code' ]
        },

        resetResponse (err?: string) {
            if (this[ err ])
                this[ err ] = ''
            if (this.response)
            {
                this.response.message = ''
            }
        }
    }
})

</script>
<style lang="scss">
/* NOTE: "GenFormStyle GenFormWrapper" shared classes are found in the main "Auth" components */
</style>