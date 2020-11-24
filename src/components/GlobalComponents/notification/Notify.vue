<template>
    <transition name="slide-fade">
        <div v-show="notifs.length > 0" class="Notifier">
            <transition-group name="slide-up-fade">
                <div v-for="(Notif, index) in notifs" :key="index+'n'">
                    <h4
                        :class="Notif.type === 'error' ? 'bg-pink-5 t-red-1' : Notif.type === 'success' ? 'bg-lime-4 t-green-1':'bg-light-blue-5 t-light-blue'"
                        class="flex a-i-center j-c-between px-1 py-0 my-0 b1"
                    >
                        <div class="flex a-i-center">
                            <span class="icon-info font-10 p-1 mr-2"></span>
                            <span class="Message">{{Notif.message}}</span>
                        </div>
                        <span @click="clear(Notif)" class="icon-cancel a-s-start mr-2"></span>
                    </h4>
                </div>
            </transition-group>
        </div>
    </transition>
</template>
<script lang="ts">
import Vue from "vue"
import { $Notify } from '@/plugins'

export default Vue.extend({
    computed: {
        notifs: () => $Notify.notifs,
    },

    methods: {
        clear (notif) {
            $Notify.clear(notif)
        }
    }
})
</script>
<style lang="scss">
.Notifier {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    max-height: 100px;
    overflow-y: scroll;
    z-index: 10;
    & h4 {
        border-left: none;
        border-right: none;
    }
    & .icon-cancel {
        font-size: 30px;
        cursor: pointer;
        text-shadow: 3px 0px 2px;
    }
    & .Message {
        max-width: 90%;
    }
}
</style>