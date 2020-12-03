<template>
    <section class="flex j-c-center">
        <div class="GenFormStyle xs11 sm9 md7 z-index-1 noselect">
            <section class="TopInfo bg-blue-5 p-3 mb-7 no-deco">
                <div>Quickly send the detail of your request using the form below or talk to us through other mediums here</div>
                <div class="flex a-i-center j-c-center font-12">
                    <a
                        class="icon-mail-alt t-pink--3"
                        title="e-mail"
                        href="mailto:scavorb@gmail.com"
                    ></a>
                    <a
                        class="icon-whatsapp t-green--1"
                        title="whatsapp"
                        href="https://wa.me/message/3NSQPMZJFTDHL1"
                        target="_blank"
                    ></a>
                </div>
            </section>

            <div class="Section">
                <span class="Head">Name</span>
                <span v-show="name_err" class="Error t-red-1">{{name_err}}</span>
                <input
                    v-model="name"
                    @input="name_err=''"
                    type="text"
                    placeholder="Input your full name"
                />
            </div>

            <div class="Section">
                <span class="Head">E-mail</span>
                <span v-if="email_err" class="Error t-red-1">{{email_err}}</span>
                <i v-else class="font-2">Please ensure your E-mail is correct!</i>
                <input
                    v-model="email"
                    @input="email_err=''"
                    type="email"
                    placeholder="Input your email"
                />
            </div>

            <div class="Section">
                <span class="Head">Subject</span>
                <span v-show="subj_err" class="Error t-red-1">{{subj_err}}</span>
                <input
                    v-model="subject"
                    @input="subj_err=''"
                    type="text"
                    placeholder="Enter subject"
                />
            </div>

            <div class="Section">
                <span class="Head">Your Message</span>
                <span v-show="msg_err" class="Error t-red-1">{{msg_err}}</span>
                <div
                    ref="msgInput"
                    @input="setMsg"
                    class="TextArea bg-white font-5 br2 p-7 mt-2"
                    contenteditable="true"
                    placeholder="Type your message"
                ></div>
            </div>

            <!-- reCaptcha shows up here -->
            <transition name="expand">
                <div v-show="showCaptcha" class="mt-2">
                    <i>Please check the reCaptcha checkbox below</i>
                    <div ref="reCaptcha"></div>
                </div>
            </transition>
            <!-- reCaptcha shows up here -->

            <transition name="expand">
                <div v-if="success || error" class="mt-5">
                    <div
                        :class="error ? 'bg-pink-5 t-red-1' : 'bg-lime-4 t-green-1'"
                        class="Alert p-3 b1"
                    >{{success || error}}</div>
                </div>
            </transition>

            <!-- Send button -->
            <button
                ref="send"
                @click="send"
                class="btn cyan-gradient-btn shadow-5 font-5 br4 mt-5 m-auto noselect"
            >
                <span class="icon-forward mr-3"></span>
                <span>Send Mail</span>
            </button>
        </div>
    </section>
</template>
<script lang="ts">
import Vue from "vue"

import { $Pages } from "@/myStore"
import { $Validator, $Obstacl } from "@/plugins"

export default Vue.extend({

    data () {
        return {
            name: '',
            email: '',
            subject: '',
            msg: '',

            name_err: '',
            email_err: '',
            subj_err: '',
            msg_err: '',

            showCaptcha: false
        }
    },

    computed: {
        error: {
            get: (): string => $Pages.$mailer.error,
            set: (v: string) => $Pages.$mailer.error = v,
        },
        success: {
            get: (): string => $Pages.$mailer.success,
            set: (v: string) => $Pages.$mailer.success = v,
        }
    },

    methods: {
        setMsg (e: any) {
            this.msg = e.target.textContent
            if (this.msg_err)
            {
                this.msg_err = ''
            }
        },


        send () {
            if (this.validate())
            {
                this.showCaptcha = true

            }
        },

        validate () {
            const schema = [
                {
                    fieldName: 'Email',
                    data: this.email,
                    rules: {
                        required: true,
                        email: true,
                    }
                },
                {
                    fieldName: 'Name',
                    data: this.name,
                    rules: {
                        required: true,
                        string: true,
                        min: 3,
                        max: 50
                    }
                },
                {
                    fieldName: 'Subject',
                    data: this.subject,
                    rules: {
                        required: true,
                        string: true,
                        min: 3,
                        max: 100
                    }
                },
                {
                    fieldName: 'Message',
                    data: this.msg,
                    rules: {
                        required: true,
                        string: true,
                        min: 20,
                        max: 4000
                    }
                }
            ]

            if ($Validator.validate(schema))
            {
                return true
            }
            const errors = $Validator.getErrors()
            this.email_err = errors[ 'Email' ]
            this.name_err = errors[ 'Name' ]
            this.subj_err = errors[ 'Subject' ]
            this.msg_err = errors[ 'Message' ]
        }

    },

    mounted () {
        const _this = this
        // @ts-ignore
        if (typeof grecaptcha !== 'undefined')
        {
            // @ts-ignore
            grecaptcha.ready(() => {
                // @ts-ignore
                grecaptcha.render(this.$refs.reCaptcha, {
                    'sitekey': '6LdDQ9MZAAAAAAXOm_j-i-gaGUjqzNcIDDDyAXzw',
                    'error-callback': function (err: string) {
                        _this.error = err
                    },
                    'callback': function (token: string) {
                        $Obstacl.create(_this.$refs.send as HTMLButtonElement, {
                            action: function () {
                                $Pages.$mailer.send({
                                    name: _this.name,
                                    email: _this.email,
                                    subject: _this.subject,
                                    message: _this.msg,
                                    token: token
                                }).then((done: boolean) => {
                                    $Obstacl.destroy(_this.$refs.send as HTMLButtonElement)
                                    // @ts-ignore
                                    grecaptcha.reset()
                                    _this.showCaptcha = false
                                    if (done)
                                    {
                                        _this.name = _this.email = _this.subject = _this.msg = '';
                                        (_this.$refs.msgInput as HTMLDivElement).textContent = ''
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }
    },

    destroyed () {
        this.error = this.success = ''
    }

})


</script>
<style lang="scss">
/* NOTE: "GenFormStyle GenFormWrapper" shared classes are found in the main "Auth" components */
.TopInfo {
    border-radius: 0 0 15px 15px;
    & > a {
        font-size: 26px;
        margin-left: 10px;
        // color: white;
    }
}
.TextArea {
    min-height: 150px;
    max-height: 200px;
    border: 1px $blue-grey-3 solid;
}
</style>
