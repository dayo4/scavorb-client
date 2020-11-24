<template>
    <div class="Tab xs12 sm11 lg10">
        <h2 class="text-center t-blue-grey--1">MANAGE ACCOUNT INFORMATION</h2>

        <!-- Name -->
        <section>
            <h3 class="Header">NAME</h3>
            <span v-if="errors.name" class="t-red p-1 my-1">{{errors.name}}</span>
            <div class="my-2">
                <label for="first_name" class="mr-5">First Name</label>
                <input name="first_name" type="text" @input="errors.name = ''" v-model="first_name" />
            </div>
            <div class="my-2">
                <label for="last_name" class="mr-5">Last Name</label>
                <input name="last_name" type="text" @input="errors.name = ''" v-model="last_name" />
            </div>
            <transition name="slide-fade">
                <button
                    v-if="first_name !== userData.first_name || last_name !== userData.last_name"
                    class="bg-pink--3 mt-4 btn"
                    @click="saveName"
                >Save Name</button>
            </transition>
        </section>

        <!-- About -->
        <section>
            <h3 class="Header">About</h3>
            <span v-if="errors.about" class="t-red p-1 my-1">{{errors.about}}</span>
            <div>
                <div
                    ref="about"
                    v-on:paste="plainText"
                    @input="setAbout"
                    contenteditable="true"
                    placeholder="About you.."
                ></div>
            </div>
            <transition name="slide-fade">
                <button
                    v-if="about !== '' && about !== userData.about"
                    @click="saveAbout"
                    class="bg-pink--3 mt-4 btn"
                >Save Changes</button>
            </transition>
        </section>

        <!-- Password -->
        <section>
            <h3 class="Header">Password</h3>
            <button @click="changePassword = !changePassword" class="btn">Change Password</button>
            <span v-if="errors.password" class="t-red p-1 my-2">{{errors.password}}</span>
            <transition name="slide-fade">
                <div class="my-2" v-if="changePassword">
                    <label for="old_password" class="mr-5">Old Password</label>
                    <input
                        @input="errors.password = ''"
                        name="old_password"
                        type="password"
                        v-model="oldPassword"
                        placeholder="Enter old password"
                    />
                </div>
            </transition>
            <transition name="slide-fade">
                <div class="my-2" v-if="changePassword">
                    <label for="new_password" class="mr-5">New Password</label>
                    <input
                        @input="errors.password = ''"
                        name="new_password"
                        type="password"
                        v-model="newPassword"
                        placeholder="Enter new password"
                    />
                </div>
            </transition>
            <transition name="slide-fade">
                <button
                    v-if="newPassword.length >= 6"
                    @click="savePassword"
                    class="bg-pink--3 mt-4 btn"
                >Save New Password</button>
            </transition>
        </section>

        <!-- Date of birth -->
        <!-- <section>
            <h3 class="Header">Date of Birth</h3>
            <p>Your date of birth here</p>
            <button class="btn">Change Date of Birth</button>
            <div class="my-2">
                <label for="dob" class="mr-5">
                    Date of
                    birth
                </label>
                <input name="dob" type="date" v-model="first_name.value" />
            </div>
            <button
                v-if="date_of_birth !== ''"
                @click="saveDOB"
                class="bg-pink--3 mt-4 btn"
            >Save Changes</button>
        </section>-->

        <div v-if="user && user.pr != 10" class="flex j-c-between">
            <button
                @click="deactivateAccount"
                class="btn p-6 shadow-4 my-10"
                style="background-color: #bf360c;"
            >Deactivate Account</button>
            <button @click="deleteAccount" class="btn bg-pink--4 p-6 shadow-4 my-10">Delete Account</button>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue"
import { $Auth, $Profile } from '@/myStore'
import { $Confirm, $Validator, $General } from '@/plugins'

export default Vue.extend({
    // components: {},

    data () {
        return {
            changeNames: false,
            changeAbout: false,
            changePassword: false,
            // changeDOB : false,


            first_name: '',
            last_name: '',
            oldPassword: '',
            newPassword: '',
            about: '',
            // date_of_birth : '',

            errors: {
                name: '',
                about: '',
                password: ''
            }
        }
    },

    computed: {
        user: () => $Auth.user,
        userData: () => $Auth.userData
    },

    methods: {
        saveName () {
            const schema = [
                {
                    fieldName: 'First Name',
                    data: this.first_name,
                    rules: { required: true, string: true, min: 2, max: 20, pattern: /^[a-zA-Z]$/ },
                    message: { pattern: 'Name may only contain letters' }
                },
                {
                    fieldName: 'First Name',
                    data: this.last_name,
                    rules: { required: true, string: true, min: 2, max: 20, pattern: /^[a-zA-Z]$/ },
                    message: { pattern: 'Name may only contain letters' }
                },
            ]

            if ($Validator.validate(schema))
            {
                $Profile.$settings.editName({
                    first_name: this.first_name,
                    last_name: this.last_name,
                })
            }
            const error = $Validator.getErrors({ format: 'single' })
            this.errors.name = error
        },

        setAbout (e: any) {
            this.about = e.target.textContent
            if (this.errors.about)
            {
                this.errors.about = ''
            }//10.121.32.3  SHA256:5Bwm5o3lezLXjccI9qwfyL6TW92tWlFyP0cUseGD3Ek dayorx68g@cs-6000-devshell-vm-6b2290c6-db32-4783-a9bc-0b6272f1c1b6
        },

        saveAbout () {
            const schema = [
                {
                    fieldName: 'About',
                    data: this.about,
                    rules: { required: true, string: true, min: 15, max: 1000 }
                },
            ]

            if ($Validator.validate(schema))
            {
                $Profile.$settings.editAbout({
                    about: this.about,
                })
            }
            const error = $Validator.getErrors({ format: 'single' })
            this.errors.about = error
        },

        savePassword () {
            const schema = [
                {
                    fieldName: 'Old Password',
                    data: this.oldPassword,
                    rules: { required: true, string: true, min: 8, max: 50 }
                },
                {
                    fieldName: 'New Password',
                    data: this.newPassword,
                    rules: { required: true, string: true, min: 8, max: 50 }
                },
            ]

            if ($Validator.validate(schema))
            {
                $Profile.$settings.changePassword({
                    old_password: this.oldPassword,
                    new_password: this.newPassword
                }).then((data) => {
                    if (data)
                    {
                        this.oldPassword = ''
                        this.newPassword = ''
                        this.changePassword = false
                    }
                })
            }
            const error = $Validator.getErrors({ format: 'single' })
            this.errors.password = error
        },

        deactivateAccount () {
            $Confirm({
                header: 'Deactivate Account',
                // message: `Your account will be deactivated for 30days, after which it will be parmanetly deleted.
                // 	<br>
                // 		<i>You can simply login anytime within this period to reactivate your account.</i>
                // 		<br>
                // 		<b>Are you sure you want to do delete your Account?</b>`,
                message: `<b>Are you sure you want to deactivate your Account?</b>`,
                type: 'danger',
                onConfirm: function () {
                    return $Profile.$settings.deactivateAccount().then(data => {
                        if (data)
                        {
                            $Auth.$form.logout()
                            return data
                        }
                    })
                }
            })
        },

        deleteAccount () {
            $Confirm({
                header: 'Delete Account',
                // message: `Your account will be deactivated for 30days, after which it will be parmanetly deleted.
                // 	<br>
                // 		<i>You can simply login anytime within this period to reactivate your account.</i>
                // 		<br>
                // 		<b>Are you sure you want to do delete your Account?</b>`,
                message: `Your account will be parmanetly deleted.
				<br>
					<b>Are you sure you want to delete your Account?</b>`,
                type: 'danger',
                onConfirm: function () {
                    return $Profile.$settings.deleteAccount().then(data => {
                        if (data)
                        {
                            $Auth.$form.logout()
                            return data
                        }
                    })
                }
            })
        },

        plainText (e: ClipboardEvent) {
            $General.pasteAsPlainText(e)
        }

    },

    mounted () {
        this.first_name = this.userData.first_name,
            this.last_name = this.userData.last_name,
            (this.$refs.about as HTMLDivElement).textContent = this.about = this.userData.about
    }
})

</script>
<style lang="scss" scoped>
.Header {
    font-size: 14px;
    color: $blue-grey-1;
    border-top: solid 1.5px;
    border-bottom: solid 1.5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
}

div[contenteditable="true"] {
    max-height: 250px;
}
div[contenteditable="true"],
input {
    border: solid 2px rgba(128, 128, 128, 0.591);
    border-radius: 4px;
    padding: 5px;
}

section {
    margin-bottom: 35px;
}
</style>