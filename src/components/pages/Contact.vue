<template>
    <section class="flex j-c-center">
        <div class="GenFormStyle xs11 sm9 md7">
            <section class="TopInfo icon-info bg-blue-5 p-3 mb-3 no-deco">
                Send me the detail of your request using the form below or talk to me through other medium
                <a
                    class="icon-mail-alt t-pink--3"
                    href="mailto:scavorb@gmail.com"
                ></a>
            </section>

            <div class="Section">
                <span class="Head py-6 px-8">Name</span>
                <span v-show="name_err" class="Error t-red-1">{{name_err}}</span>
                <input
                    v-model="name"
                    @input="name_err=''"
                    type="text"
                    placeholder="Input your full name"
                />
            </div>

            <div class="Section">
                <span class="Head py-6 px-8">E-mail</span>
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
                <span class="Head py-6 px-8">Subject</span>
                <span v-show="subj_err" class="Error t-red-1">{{subj_err}}</span>
                <input
                    v-model="subject"
                    @input="subj_err=''"
                    type="text"
                    placeholder="Enter subject"
                />
            </div>

            <div class="Section">
                <span class="Head py-6 px-8">Your Message</span>
                <span v-show="msg_err" class="Error t-red-1">{{msg_err}}</span>
                <div
                    ref="msg"
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
import { Component, Vue } from "vue-property-decorator"

import { $Pages } from "@/myStore"
import { $Validator, $Obstacle } from "@/plugins"

@Component({
    computed: {
        error: {
            get: () => $Pages.$mailer.error,
            set: (v) => $Pages.$mailer.error = v,
        },
        success: {
            get: () => $Pages.$mailer.success,
            set: (v) => $Pages.$mailer.success = v,
        }
    }
})
export default class Contact extends Vue {
    error!: string
    success!: string
    $refs!: {
        reCaptcha
        msg
        send
    }
    name = ''
    email = ''
    subject = ''
    msg = ''

    name_err = ''
    email_err = ''
    subj_err = ''
    msg_err = ''

    showCaptcha = false

    mounted () {
        let _this = this
        // @ts-ignore
        grecaptcha.ready(() => {
            // @ts-ignore
            grecaptcha.render(this.$refs.reCaptcha, {
                'sitekey': '6LdDQ9MZAAAAAAXOm_j-i-gaGUjqzNcIDDDyAXzw',
                'error-callback': function (err) {
                    _this.error = err
                },
                'callback': function (token: string) {
                    $Obstacle.create(_this.$refs.send, {
                        icon: '',
                        action: function () {
                            $Pages.$mailer.send({
                                name: _this.name,
                                email: _this.email,
                                subject: _this.subject,
                                message: _this.msg,
                                token: token
                            }).then(done => {
                                $Obstacle.destroy(_this.$refs.send)
                                // @ts-ignore
                                grecaptcha.reset()
                                _this.showCaptcha = false
                                if (done)
                                {
                                    _this.name = _this.email = _this.subject = _this.msg = ''
                                    _this.$refs.msg.textContent = ''
                                }
                            })
                        }
                    })
                }
            })
        })
    }
    beforeDestroy () {
        this.error = this.success = ''
    }

    setMsg (e) {
        this.msg = e.target.textContent
        if (this.msg_err)
        {
            this.msg_err = ''
        }
    }


    send () {
        if (this.validate())
        {
            this.showCaptcha = true

        }
    }

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

}
</script>
<style lang="scss">
.TopInfo {
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
