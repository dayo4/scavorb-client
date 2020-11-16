<template>
    <div v-show="activeTab === 'Tab-1'" class="Tab xs12">
        <h2 class="text-center t-blue-grey--1">Manage Users</h2>

        <transition name="slide-fade">
            <section v-if="!selectedUser" class="UsersBox">
                <!-- SEARCH -->
                <section class="SearchBox flex pl-4 a-i-center shadow-6">
                    <input type="search" placeholder="Search for users..." class="grow" />
                    <span class="SearchIcon icon-search-2 flex a-i-center font-6 px-5"></span>
                </section>

                <!-- CUSTOM SORT AND PREFERENCES -->
                <section class="CustSort noselect">
                    <Dropdown
                        ownID="pages"
                        :text="'Filter: '+ filter"
                        :pos="{type:'relative',top:7, left: 5}"
                        :optPos="{left: 30}"
                        class="Options icon-search-2 btn"
                    >
                        <!-- slots -->
                        <template v-slot:default>
                            <a @click="filterBy('All Users',{})">All Users</a>
                            <a @click="filterBy('Active',{active:true})">Active</a>
                            <a @click="filterBy('Inactive',{active:false})">Inactive</a>
                            <a @click="filterBy('Blacklisted',{blacklisted:true})">Blacklisted</a>
                        </template>
                    </Dropdown>

                    <Dropdown
                        ownID="PostSort"
                        :text="'Sort By: ' + sort"
                        :pos="{type:'relative',top:7, right: 5}"
                        class="Options icon-sort-alt-up btn"
                    >
                        <!-- slots -->
                        <template v-slot:default>
                            <a @click="sortBy('Newest','desc')">Newest</a>
                            <a @click="sortBy('Oldest','asc')">Oldest</a>
                        </template>
                    </Dropdown>
                </section>

                <!-- USERS -->
                <section>
                    <h4 class="Head bg-gradient-2 flex a-i-center j-c-between noselect">
                        <div class="font-6 ml-2 mt-1 pb-1">
                            USERS
                            <span class="bg-white t-cyan--2 br2 ml-2 px-1">{{count}}</span>
                        </div>
                        <span class="icon-ellipsis-vert"></span>
                    </h4>
                    <div class="Body">
                        <div v-for="user in users" :key="user.id" class="flex a-i-center">
                            <img
                                @click="openUser(user.id)"
                                :src="$userBaseUrl+user.profile_image"
                                :alt="user.username"
                                class="mr-3 cursor-pointer"
                                width="50"
                                height="50"
                            />
                            <span class="grow">{{user.first_name}} {{user.last_name}}</span>
                            <!-- DROPDOWN COMPONENT-->
                            <Dropdown
                                :ownID="user.id"
                                :pos="{type:'relative', top:0, right: 5}"
                                :optPos="{ right: 40}"
                                class="Dropdomn icon-ellipsis-vert shadow-0 btn t-grey--1 bg-grey-2 font-10"
                                style="width:30px;"
                            >
                                <!-- slots -->
                                <template v-slot:default>
                                    <a @click="openUser(user.id)">
                                        <span class="icon-eye"></span>
                                        <span>Open</span>
                                    </a>
                                    <router-link
                                        :to="{name:'user-profile', params:{username: user.username}}"
                                        target="_blank"
                                    >
                                        <span class="icon-user"></span>
                                        <span>View Profile</span>
                                    </router-link>
                                </template>
                            </Dropdown>
                        </div>
                    </div>
                </section>
            </section>
        </transition>

        <!-- ViewUser Component -->
        <transition name="slide-fade">
            <ViewUser
                v-if="selectedUser"
                :user="selectedUser"
                @closeUser="closeUser"
                @refresh="openUser"
            />
            <!-- ViewUser Component -->
        </transition>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { $Auth, $Profile, $Admin } from '@/myStore'

import ViewUser from './subComponents/ViewUser.vue'
export default defineComponent({
    components: {
        ViewUser,
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
    },

    props: {
        activeTab: { required: true, type: String },
    },

    data () {
        return {
            selectedUser: null,

            filter: 'All Users',
            sort: 'Newest',
            query: {
                limit: 40,
                filter: {},
                sort: [ 'created_at', 'desc' ]
            }
        }
    },

    computed: {
        users: () => $Admin.$users.users,
        count: () => $Admin.$users.count
    },

    methods: {
        filterBy (txt, v: object) {
            this.query.filter = v
            this.filter = txt
            $Admin.$users.fetchAll(this.query, true)
        },

        sortBy (txt, v: string) {
            this.query.sort[ 1 ] = v
            this.sort = txt
            $Admin.$users.fetchAll(this.query, true)
        },

        openUser (user_id) {
            $Admin.$users.fetch(user_id).then(user => {
                if (user)
                    this.selectedUser = user
            })
        },

        closeUser (refresh?: boolean) {
            this.selectedUser = null
            if (refresh) $Admin.$users.fetchAll(this.query, true)
        }
    },

    mounted () {
        $Admin.$users.fetchAll(this.query, true)
    }
})
</script>
<style lang="scss" scoped>
.UsersBox {
    & img {
        margin-top: 4px;
        min-width: 50px;
        min-height: 50px;
        border: solid rgba(175, 175, 175, 0.39) 4px;
        border-radius: 100%;
    }
    & .Head {
        margin-bottom: 0;
        padding: 0;
        position: relative;
        height: 60px;
        border-radius: 3px;
        color: white;
        & > div:first-of-type {
            border-bottom: #057a8a solid 5px;
            border-radius: 33%;
        }
        & > [class^="icon-"] {
            position: absolute;
            right: 5px;
            bottom: 16px;
            font-size: 24px;
            cursor: pointer;
        }
    }
    & .Body {
        height: 500px;
        overflow-y: scroll;
        & > div {
            border-bottom: #bad4d4 solid 2px;
            & .Options {
                position: relative;
                cursor: pointer;
            }
        }
    }
}
.SearchBox {
    background-color: white;
    height: 35px;
    border-radius: 28px;
    & input {
        border: none;
        height: 35px;
    }
    & .SearchIcon {
        font-size: 24px;
        color: #0097a7;
        background-color: rgb(216, 231, 233);
        height: 100%;
        cursor: pointer;
        border: solid rgba(0, 150, 167, 0.322) 2px;
        border-radius: 28px;
    }
}
.CustSort {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}
</style>