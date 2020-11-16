<template>
    <div class="Tab xs12">
        <HorizontalNavigator
            :tabsList="tabsList"
            @tabClicked="switchTab"
            :activeTab="subActiveTab"
        />
        <div class="SubTabs flex j-c-center w-full">
            <User :activeTab="subActiveTab" />
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { $Auth, $Profile, $Admin } from '@/myStore'

import HorizontalNavigator from '@/components/navs/reusables/navigators/HorizontalNavigator.vue'

import User from './Users.vue'
export default defineComponent({
    components: {
        User,
        HorizontalNavigator
    },

    data () {
        return {
            subActiveTab: "Tab-1",
            tabsList: [
                { id: 1, name: "Users", icon: "icon-users-1" },
                { id: 2, name: "Settings", icon: "icon-cog-1" },
                { id: 3, name: "Privilege", icon: "icon-angle-double-up" },
                { id: 4, name: "Reports", icon: "icon-thumbs-down-alt" }
            ]
        }
    },

    methods: {
        switchTab (tab_id) {
            this.subActiveTab = "Tab-" + tab_id
        }
    }
})

</script>
<style lang="scss" scoped>
.SubTabs {
    & .Tab {
        animation: fade 0.7s;
    }
}
</style>