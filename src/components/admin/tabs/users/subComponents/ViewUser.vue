<template>
    <div>
        <section>
            <h3
                class="Head flex a-i-center j-c-between shadow-1 bg-pink-1 t-white font-7 p-2 noselect br2"
            >
                <span class="Header text-up font-5">User Details</span>
                <div class="Actions flex">
                    <div class="labeled-action" @click="$emit('closeUser')">
                        <span class="icon-left-open-big font-10"></span>
                        <span>Back</span>
                    </div>
                    <!-- DROPDOWN COMPONENT-->
                    <Dropdown
                        :ownID="user.id"
                        :pos="{type: 'relative',top:6, right: 0}"
                        :optPos="{ right: 40}"
                        class="Dropdomn icon-ellipsis-vert shadow-0 btn t-white bg-blue-grey font-10"
                        style="width:30px;"
                    >
                        <!-- slots -->
                        <template v-slot:default>
                            <router-link
                                :to="{name:'user-profile', params:{username: user.username}}"
                                target="_blank"
                            >
                                <span class="icon-user"></span>
                                <span>View Profile</span>
                            </router-link>
                            <a @click="changeAccess(user.id)">
                                <span class="icon-ccw"></span>
                                <span>Change Access</span>
                            </a>
                            <a @click="modal = true">
                                <span class="icon-recycle"></span>
                                <span>Change Account Status</span>
                            </a>
                            <a v-if="isSAdmin" @click="del(user.id)">
                                <span class="icon-trash-empty t-red"></span>
                                <span>Delete</span>
                            </a>
                        </template>
                    </Dropdown>
                </div>
            </h3>

            <div class="Body t-blue-grey">
                <img
                    :src="$userBaseUrl + user.profile_image"
                    :alt="user.username"
                    class="mr-6"
                    width="150"
                    height="150"
                />
                <div class="Details ml-10 pl-5">
                    <div class="mb-4" v-for="(item, key, index) in user" :key="index">
                        <div v-if="key !== 'history'">
                            <span class="font-6 bold-4">{{key}}:</span>
                            <span class="font-5 bold-2">{{' '+item}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="History">
            <h2 class="text-center t-blue-grey--1 ml-10 pl-5">User's Account Status History</h2>

            <div v-for="(h, index) in user.history" :key="index" class="my-2 py-2">
                <h3 class>{{h.type}}</h3>
                <div>{{$moment(h.created_at).format('llll')}}</div>
                <div>{{h.reason}}</div>
            </div>
        </section>

        <!-- Account Status Update COMPONENT -->
        <AccStatusUpdate :user="user" :show="modal" @close="closeModal"></AccStatusUpdate>
    </div>
</template>
<script lang="ts">
import Vue from "vue"
import AccStatusUpdate from './AccStatusUpdate.vue'

import { $Auth, $Profile, $Admin } from '@/myStore'
import { $Confirm } from '@/plugins'

export default Vue.extend({
    components: {
        AccStatusUpdate,
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
    },
    data () {
        return {
            modal: false /* Disable Account Modal  */
        }
    },
    props: {
        user: { required: true, type: Object }
    },
    computed: {
        isSAdmin: (): boolean => $Auth.isSAdmin,
    },
    methods: {
        closeModal (refresh?: boolean) {
            this.modal = false
            if (refresh)
                this.$emit('refresh', this.user.id)
        },

        del (user_id) {
            let _this = this
            if (this.isSAdmin)
                $Confirm({
                    header: 'Delete Account',
                    message: `<b>Confirm?</b>`,
                    type: 'danger',
                    onConfirm: function () {
                        return $Admin.$users.delete(user_id).then((data) => {
                            if (data)
                            {
                                _this.$emit('closeUser', true)
                                return true
                            }
                        })
                    }

                })
        },

        changeAccess () {

        }
    }
})

</script>
<style lang="scss" scoped>
img {
    margin-top: 4px;
    min-width: 150px;
    min-height: 150px;
    border: solid rgba(175, 175, 175, 0.39) 4px;
    border-radius: 100%;
}
.History > div {
    border-bottom: 1px solid grey;
}
</style>