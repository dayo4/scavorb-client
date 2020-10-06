<template>
    <Container ownID="MC-Settings" :noSideNav="false">
        <div class="MainView xs12 sm11 md9 flex wrap j-c-center pl-4">
            <!-- All tabs go here -->
            <keep-alive>
                <component :is="activeTab"></component>
            </keep-alive>
        </div>

        <!-- Side Nav Component -->
        <VerticalNavigator :tabsList="tabsList" @tabClicked="switchTab" :activeTab="activeTab" />
    </Container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { $Profile, $Posts, $Auth } from "@/myStore"
import { $Process } from "@/plugins"


import Container from '@/components/navs/reusables/Container.vue'
import VerticalNavigator from '@/components/navs/reusables/navigators/VerticalNavigator.vue'
/* Import Tabs */
import Tab_1 from '@/components/settings/tabs/ProfileInfo.vue'
import Tab_3 from '@/components/settings/tabs/portfolio/List.vue'
import Tab_4 from '@/components/settings/tabs/Posts.vue'

@Component({
    components: {
        Container,
        VerticalNavigator,
        Tab_1,
        Tab_3,
        Tab_4
    },

    beforeRouteEnter (to, from, next) {
        next(vm => {
            if (to.query.tab)
            {
                vm.$data.switchTab(to.query.tab)
            }
            vm.$data.activeTab = 'Tab_1'
        })
    },

    computed: {
        user: () => $Auth.user,
    },
})
export default class Settings extends Vue {
    user!: any

    /* INSTANCE PROPERTIES */
    activeTab = 'Tab_1'
    sideBar = false

    tabsList = [
        { id: 1, name: 'Profile Information', icon: 'icon-user' },
        // { id: 2, name: 'Manage Bookmarks', icon: 'icon-bookmarks' },
        // { id: 5, name: 'Message Settings', icon: 'icon-mail-alt' },
        // { id: 6, name: 'Manage Preferences', icon: 'icon-resize-small' },
        // { id: 7, name: 'Profile Information', icon: 'icon-user' },
        // { id: 8, name: 'Privacy Settings', icon: 'icon-key' },
        // { id: 9, name: 'Help', icon: 'icon-help' },  
    ]

    mounted () {
        const adminTabs = [
            { id: 3, name: 'Portfolio Setup', icon: 'icon-briefcase-1' },
            { id: 4, name: 'Manage Post', icon: 'icon-doc-text' },
        ]

        if ([ 9, 10 ].includes(this.user.pr))
        {
            this.tabsList.push(...adminTabs)
        }
    }
    /* INSTANCE METHODS */
    switchTab (tab_id) {
        this.activeTab = 'Tab_' + tab_id
        if (tab_id === 3)
        {
            $Profile.$Portfolio.fetchAll({
                user_id: $Auth.user.id,
                filter: {}
            })
        }
        else if (tab_id === 4)
        {
            $Posts.$settings.fetchAll({ filter: {} }, true)
        }
    }

}
</script>
<style lang="scss" scoped>
.Wrapper {
    position: relative;
}
.MainView {
    & .Tab {
        animation: fade 0.7s;
    }
}

@include xs-only {
    .MainView {
        padding-left: 6px;
        padding-right: 50px;
    }
}
</style>