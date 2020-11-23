<template>
    <nav ref="topNav" id="TopNav" class="flex a-i-center j-c-center noselect">
        <div class="bg-gradient-1 flex a-i-center j-c-between shadow-11">
            <router-link to="/" class="Logo flex a-i-center px-4">
                <div class="logo-base logo-x-small logo-static mr-4">
                    <span>
                        <span>
                            <b>S</b>
                        </span>
                        <span></span>
                    </span>
                    <span></span>
                </div>
                <!-- <img src="/defaults/logo/scavorb.png" width="45" height="45" class="mr-4" /> -->
                <b class="hide-sm-down">scavorb</b>
            </router-link>

            <div class="SearchBox flex ml-5 pl-4 a-i-center shadow-6">
                <input
                    @focus="showSearch = true"
                    type="search"
                    placeholder="Search..."
                    class="grow hide-sm-down"
                />
                <span
                    @click="showSearch = true"
                    class="SearchIcon icon-search-2 flex a-i-center font-6 px-5"
                ></span>
                <!-- Search Component -->
                <Search :show="showSearch" @close="showSearch = false" />
            </div>

            <div class="MainNavLinks flex a-i-center">
                <!-- LINKS FOR CRAZY SMALL SCREENS  -->
                <a @click="miniScreen = !miniScreen" class="MiniScreenLink DropBtn">
                    <span class="Icon icon-th-list"></span>
                    <transition name="slide-down-fade">
                        <div
                            v-show="miniScreen === true"
                            class="Dropdown t-white bg-grey py-4 px-5 br2"
                        >
                            <router-link
                                :to="{name:link.name}"
                                v-for="(link, i) in navLinks"
                                :key="i"
                            >
                                <span :class="link.icon"></span>
                                <span>{{link.name}}</span>
                            </router-link>
                        </div>
                    </transition>
                </a>
                <!-- LINKS FOR CRAZY SMALL SCREENS  -->

                <router-link :to="{name:link.name}" v-for="(link, i) in navLinks" :key="i">
                    <span :class="link.icon"></span>
                    <span>{{link.name}}</span>
                </router-link>

                <!-- NOTIFICATIONS POPUP -->
                <!-- <notifPopup /> -->
                <!-- NOTIFICATIONS POPUP -->

                <!-- DropBtn -->
                <a @click="avatarDropdown = !avatarDropdown" class="DropBtn">
                    <img
                        :src="user ? $userBaseUrl + userData.profile_image: '/defaults/usr/0.jpg'"
                        width="46"
                        height="46"
                        draggable="false"
                    />

                    <transition name="slide-down-fade">
                        <div
                            v-show="avatarDropdown === true"
                            class="Dropdown t-white bg-grey py-4 px-5 br2"
                        >
                            <div class="flex j-c-center">
                                <img
                                    :src="user ?  $userBaseUrl + userData.profile_image: '/defaults/usr/0.jpg'"
                                    width="60"
                                    height="60"
                                    alt="image"
                                    draggable="false"
                                />
                            </div>
                            <div
                                class="text-center font-2 letter-space-2"
                            >{{ user ? '': 'Not'}} Logged In</div>
                            <div
                                v-if="user"
                                class="text-center cursor-pointer t-grey-3 font-2 letter-space-2"
                                @click="$router.push({path:'/profile/'+userData.username})"
                            >@{{ userData.username}}</div>
                            <div v-if="user" class="MoreLinks p-1">
                                <hr />
                                <router-link
                                    v-slot="{ navigate }"
                                    :to="{path:'/profile/'+userData.username}"
                                >
                                    <span @click="navigate" class="icon-user"></span>Profile
                                </router-link>
                            </div>
                            <hr />
                            <div class="MoreLinks p-1">
                                <a v-if="!user" @click="login">
                                    <span class="icon-login"></span>Login
                                </a>
                                <a v-if="user" @click="logout">
                                    <span class="icon-logout"></span>Logout
                                </a>
                            </div>
                        </div>
                    </transition>
                </a>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue"
import { $Auth, $Profile, $Navs } from '@/myStore'

import Search from '@/components/misc/Search.vue'
// import NotifPopup from '@/components/notifications/Popup.vue'

export default defineComponent({
    components: {
        // NotifPopup,
        Search
    },

    data () {
        return {
            miniScreen: false,
            avatarDropdown: false,
            showSearch: false,

            navLinks: [
                { name: 'home', icon: 'icon-home-1' },
                { name: 'contact', icon: 'icon-mail-alt' },
                { name: 'about', icon: 'icon-info' },
                { name: 'posts', icon: 'icon-doc-text' }
            ]
        }
    },
    watch: {
        $route () {
            (this.$refs.topNav as HTMLElement).classList.remove('rotated')
        }
    },
    computed: {
        user: () => $Auth.user,
        userData: (): object => $Auth.userData,
    },
    methods: {
        dropdownHandler () {
            let $this = this
            function dropdown (e: any) {
                if (!(e.target.closest('.DropBtn')))
                {
                    $this.avatarDropdown = false
                    $this.miniScreen = false
                }
            }
            document.addEventListener('click', dropdown, false)
        },

        login () {
            $Auth.$form.show()
        },
        logout () {
            $Auth.$form.logout()
        }
    },

    mounted () {
        $Navs.$top.element = this.$refs.topNav as HTMLElement
        this.dropdownHandler()
    }
})
</script>
<style lang="scss" scoped>
nav {
    position: fixed;
    right: 10px;
    left: 10px;
    top: 0;
    background-color: transparent;
    height: 52px;
    width: calc(100%-20px);
    z-index: 7;
    transition: ease 0.5s;
    &.rotated {
        transform: rotateX(90deg);
        visibility: hidden;
    }
    & a:not(.DropBtn) {
        position: relative;
        overflow: hidden;
        border-radius: 28px;
    }

    & > div {
        background-color: $cyan--4;
        width: 100%;
        height: 100%;
        border-radius: 26%;
        position: relative;
        &::before {
            content: "";
            position: absolute;
            top: 34%;
            right: -10px;
            display: block;
            width: 0;
            height: 0;
            border-top: 8px solid transparent;
            border-bottom: 8px solid transparent;
            border-left: 10px solid $cyan--2;
        }
        &::after {
            content: "";
            position: absolute;
            top: 34%;
            left: -10px;
            display: block;
            width: 0;
            height: 0;
            border-top: 9px solid transparent;
            border-bottom: 9px solid transparent;
            border-right: 10px solid $cyan--2;
        }
        & a {
            cursor: pointer;
            color: white;
            text-decoration: none;
        }
    }

    & .SearchBox {
        background-color: white;
        height: 30px;
        border-radius: 28px;
        & input {
            border: none;
            height: 30px;
        }
        //icon
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
}
.MainNavLinks {
    height: 100%;
    & a {
        padding: 7px;
        margin-right: 16px;
        white-space: nowrap;
        transition: 0.3s;
        &:not(.DropBtn):hover {
            transform: scale(1.1);
        }
        &::before {
            content: "";
            position: absolute;
            bottom: 0;
            width: 0;
            left: 50%;
            border-bottom: 3px solid transparent;
            transition: ease-in-out 0.6s;
        }
        &.router-link-exact-active::before {
            border-bottom: 3px solid rgba(255, 255, 255, 0.589);
            left: 0px;
            width: 100%;
        }
        & span:nth-child(1) {
            margin-right: 4px;
        }
        & span:nth-child(2) {
            text-transform: capitalize;
            margin-right: 4px;
        }
    }
}
.DropBtn {
    position: relative;
    padding: 0 !important;
    & img {
        margin-top: 4px;
        min-width: 46px;
        min-height: 46px;
        border: solid rgba(175, 175, 175, 0.39) 4px;
        border-radius: 100%;
    }
}
.Dropdown {
    position: absolute;
    right: 0;
    top: 60px;
    min-width: 200px;
    cursor: default;
    z-index: 5;

    & a {
        display: flex;
        flex-wrap: nowrap;
        padding: 5px;
        margin: 5px;
        transition: 0.3s;

        &:hover {
            background-color: rgba(228, 227, 227, 0.26);
        }

        & span {
            margin-right: 8px !important;
        }
    }
}

@include sm-and-down {
    nav {
        height: 48px;
    }
    .MainNavLinks {
        & a {
            padding: 5px;
            margin-right: 3px;
        }
        & > a > span:last-child {
            font-size: 14px;
        }
    }
}
@include xs-only {
    .MainNavLinks {
        & > a > span:first-child {
            font-size: 20px;
        }
        & > a > span:last-child {
            display: none;
        }
        & a {
            margin-right: 2px;
        }
    }
    .SearchBox {
        padding-left: 0px;
        height: 25px !important;
        & .SearchIcon {
            width: 40px;
            font-size: 14px !important;
        }
    }
}
@include xs-and-up {
    .MiniScreenLink {
        display: none;
    }
}
@include xxs-only {
    .MiniScreenLink {
        display: block;
        margin-right: 8px;
        & .Dropdown {
            right: -40px;
        }

        & > span {
            font-size: 24px !important;
        }
    }
    .MainNavLinks > a:not(.DropBtn) {
        display: none;
    }
}
</style>