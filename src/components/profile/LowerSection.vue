<template>
    <div class="Wrapper">
        <div id="TabsHeader" class="TabsHeader flex a-i-center noselect shadow-8 font-2 bold-4">
            <div
                v-for="tab in tabsList"
                :key="tab.id"
                @click="switchTab(tab.id)"
                :id="'Tab_'+tab.id"
                class="cyan-gradient-btn"
                :class="currentTab == 'Tab_'+tab.id ? 'active' : ''"
            >
                <span :class="tab.icon"></span>
                <span>{{tab.name}}</span>
            </div>
        </div>

        <div id="TabsContainer" class="Tabs pb-5">
            <keep-alive>
                <component :is="currentTab"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script lang="ts">
// import DetailsTab from "@/components/profile/mainTabs/Details.vue"
import Tab_1 from "@/components/profile/mainTabs/Portfolio.vue"
import Tab_2 from "@/components/profile/mainTabs/PostsTab.vue"
// import MediaTab from "@/components/profile/mainTabs/MediaTab.vue"
import { Component, Vue } from "vue-property-decorator"
import { $Auth, $Posts, $Profile } from "@/myStore"
import { /* $ScrollLoader */ $Process, $Obstacle } from "@/plugins"

@Component({
    components: {
        // DetailsTab,
        Tab_1,
        Tab_2,
        // MediaTab
    },
    computed: {
        user: () => $Auth.user,
        profile: () => $Profile.data
    }
})
export default class ProfileLowerSection extends Vue {
    user!: any
    profile!: any

    currentTab = 'Tab_1'

    MCMV: HTMLElement = null /* root element */

    tabsList = [
        { id: 1, name: 'SCRAPBOOK', icon: 'icon-folder-open' },
        { id: 2, name: 'POSTS', icon: 'icon-doc-text' },
        // { id: 3, name: 'MEDIA', icon: 'icon-picture' },
    ]

    /* lifecycle hook */
    mounted () {
        this.handleScroll()
    }

    /* instance methods */
    switchTab (tab_id) {
        this.currentTab = 'Tab_' + tab_id
        // if (tab_id === 2 && this.profile.pr === 10)
        // {
        //     $Posts.fetchUserPosts($Profile.data.id, {}, true).then(ok => $Obstacle.create('.Tab_2')/* $Process.hide() */)
        // }
    }

    handleScroll () {
        this.MCMV = document.getElementById('MC-ProfileView') /* parent element - profile view*/
        let TopNav = document.getElementById('TopNav')
        let TabsContainer = document.getElementById('TabsContainer')
        let TabsHeader = document.getElementById('TabsHeader')
        let UpperSection = document.getElementById('UpperSection')

        let _this = this

        /* sticks the TabHeader to the top when scrolling down and replaces the main TopNav.*/
        function scroll () {
            let TabsHeaderPos = UpperSection.clientHeight + 52/* TopNav height */
            let scrollTop = _this.MCMV.scrollTop
            if (scrollTop >= TabsHeaderPos)
            {
                TabsHeader.classList.add('fixed')
                TopNav.classList.add('rotated')
                TabsContainer.style.marginTop = '47px'
            } else
            {
                TabsHeader.classList.remove('fixed')
                TopNav.classList.remove('rotated')
                TabsContainer.style.marginTop = '0'
            }
        }
        this.MCMV.addEventListener('scroll', scroll, false)

    }
}
</script>
<style lang="scss" scoped>
.TabsHeader {
    overflow-x: scroll;
    z-index: 7;
    transition: all 0.5s;
    &.fixed {
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
    }
    & > div {
        min-width: 110px;
        position: relative;
        flex: 1 1 auto;
        white-space: nowrap;
        // flex-wrap: nowrap;
        cursor: pointer;
        text-align: center;
        color: white;
        padding: 15px;
        &::before {
            content: "";
            position: absolute;
            top: 2px;
            width: 0;
            left: 50%;
            border-bottom: 3px solid transparent;
            transition: ease-in-out 0.4s;
        }
        &::after {
            content: "";
            position: absolute;
            bottom: 2px;
            width: 0;
            left: 50%;
            border-bottom: 3px solid transparent;
            transition: ease-in-out 0.4s;
        }
        &.active::after,
        &.active::before {
            border-bottom: 3px solid white;
            left: 0px;
            width: 100%;
        }

        & span:first-child {
            margin-right: 4px;
        }
    }
}
.Tabs {
    // padding: 0px 7px 10px 0px;
    & [class^="Tab-"] {
        animation: fade 0.7s;
    }
}
</style>