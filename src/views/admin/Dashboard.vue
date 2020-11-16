<template>
    <Container ownID="MC-Adm" :noSideNav="false">
        <div class="MainView flex wrap j-c-center pl-4">
            <!-- All tabs go here -->
            <keep-alive>
                <component :is="activeTab"></component>
            </keep-alive>
        </div>

        <!-- Side Nav Component -->
        <VerticalNavigator :tabsList="tabsList" @tabClicked="switchTab" :activeTab="activeTab" />
    </Container>
</template>

<script>
import { defineComponent } from "vue"
import VerticalNavigator from "@/components/navs/reusables/navigators/VerticalNavigator.vue"
import Tab_1 from "@/components/admin/tabs/users/Index.vue"
import Tab_2 from "@/components/admin/tabs/System.vue"
import Container from "@/components/navs/reusables/Container.vue"

import { $Admin } from "@/myStore"

export default defineComponent({
    components: {
        VerticalNavigator,
        Container,
        Tab_1,
        Tab_2
    },

    data () {
        return {
            activeTab: "Tab_1",

            tabsList: [
                { id: 1, name: "Manage Users", icon: "icon-users-1" },
                { id: 2, name: "System Settings", icon: "icon-cog-1" },
                // { id: 3, name: "Manage Posts", icon: "icon-doc-text" },
                // { id: 4, name: "Notifications", icon: "icon-bell" }
            ]
        }
    },

    methods: {
        switchTab (tab_id) {
            this.activeTab = "Tab_" + tab_id
        }
    }
})
</script>
<style lang="scss" scoped>
.MainView {
    & .Tab {
        animation: fade 0.7s;
    }
}

@include sm-and-down {
    .MainView {
        padding-left: 6px;
        padding-right: 50px;
    }
}
</style>