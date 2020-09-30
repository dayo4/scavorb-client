<template>
    <a @click="show = !show" class="DropBtn Notif">
        <span class="icon-bell"></span>

        <transition name="slide-down-fade">
            <div v-show="show" class="Popup br1 shadow-2 bg-white">
                <div class="bold-3 t-blue-grey--2 p-3">{{ user ? '' : 'Guest ' }} Notifications</div>

                <hr />
                <div class="t-blue-grey p-3">There are no new notifications for you at the moment!</div>
                <!-- <hr />

                <div class="p-3">
                    <router-link
                        to="/notifications"
                        class="icon-eye t-light-blue"
                    >See all notifications</router-link>
                </div>-->
            </div>
        </transition>
    </a>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { $Auth } from '@/myStore'
import { $Confirm } from '@/plugins'

@Component({
    components: {},

    computed: {
        user: () => $Auth.user,
        userData: () => $Auth.userData
    },
})
export default class Platform extends Vue {
    // @Prop({ required: true }) show: boolean

    show = false

    updated () {
        this.dropdownHandler()
    }

    dropdownHandler () {
        let $this = this
        function dropdown (e) {
            if (!(e.target.closest('.Notif')))
            {
                $this.show = false
            }
        }
        document.addEventListener('click', dropdown, false)
    }
}
</script>
<style lang="scss" scoped>
.Notif {
    position: relative;
}
.Popup {
    position: absolute;
    top: 40px;
    right: -60px;
    cursor: default;
    min-width: 280px;
    min-height: 90px;
    max-height: 300px;
    z-index: 5;

    & hr {
        margin: 0 3px;
    }
    & > div {
        max-width: 100%;
        white-space: pre-wrap;
        text-align: center;
    }
    & a {
        text-decoration: none;
    }
}
</style>