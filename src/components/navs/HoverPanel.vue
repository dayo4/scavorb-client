<template>
    <!-- <div> -->
    <div class="HPWrapper noselect" :class="collapsed ? 'Collapsed' : ''">
        <div class="Panel bg-cyan--3">
            <div class="Head flex a-i-center j-c-center shadow-7 t-white font-6 bold-3">scavorb</div>

            <div class="Body flex wrap j-c-between mt-3 p-4">
                <div
                    v-show="!icon.auth || icon.auth === 'user' || icon.auth === 'admin' && isAdmin"
                    v-for="(icon, i) in icons"
                    :key="i"
                    class="IconWrapper m-2 text-center"
                    :class="icon.auth === 'user' && !isUser  ? 'NoHover' : ''"
                    @click="(icon.auth === 'user' && !isUser) ? unAuthClick() : click({link:icon.link, store: icon.store})"
                >
                    <router-link
                        :to="{name: icon.auth === 'user' && !isUser  ? '' : icon.link}"
                        :class="icon.auth === 'user' && !isUser  ? 't-grey-1' : 't-white'"
                    >
                        <span :class="icon.font" class="Icon"></span>
                        <span class="IconText">{{ icon.text }}</span>
                    </router-link>
                </div>
            </div>

            <div class="Body flex wrap j-c-between p-4">
                <div
                    v-for="(icon, i) in pageIcons"
                    :key="i"
                    class="IconWrapper m-2 text-center"
                    @click="click({link:icon.link})"
                >
                    <router-link :to="{name: icon.link}" class="t-white">
                        <span :class="icon.font" class="Icon"></span>
                        <span class="IconText">{{ icon.text }}</span>
                    </router-link>
                </div>
            </div>
        </div>

        <!-- Handle -->
        <span
            @click="collapsed = !collapsed"
            class="Handle pink-gradient-btn t-white font-6 shadow-3 flex a-i-center j-c-end br5"
        >
            <span class="icon-right-big" :class="collapsed ? '' : 'close'"></span>
        </span>
    </div>
    <!-- </div> -->
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { $ReadQueue, $Auth } from "@/myStore"

@Component({
    computed: {
        isUser: () => $Auth.isUser,
        isAdmin: () => $Auth.isAdmin,
    }
})
export default class HoverPanel extends Vue {
    collapsed = true


    icons = [
        { font: 'icon-sort-alt-up', text: 'Read Queue', link: '', store: '$ReadQueue' },
        { font: 'icon-bookmarks', text: 'Bookmarks', link: '', store: '', auth: 'user' },
        { font: 'icon-cog-alt', text: 'Admin', link: 'admin-dashboard', auth: 'admin' },
        { font: 'icon-plus-1', text: 'New Post', link: 'compose-post', auth: 'admin' },
        { font: 'icon-cog-1', text: 'Settings', link: 'manage-settings', auth: 'user' },
        // { font: 'icon-graduation-cap', text: 'Talent', link: '' },
        // { font: 'icon-puzzle', text: 'Puzzle', link: '' },
        // { font: 'icon-chart-line-1', text: 'Chart', link: '' },
        // { font: 'icon-address-book', text: 'Contact', link: '' },
    ]

    pageIcons = [
        { font: 'icon-youtube', text: 'YouTube', link: '' },
        { font: 'icon-mail-alt', text: 'Mail', link: 'contact' },
        { font: 'icon-info', text: 'About', link: 'about' },
        { font: 'icon-doc-text', text: 'Posts', link: 'posts' },

    ]

    /* lifecycle hooks */
    mounted () {
        this.collapse()
    }

    /* This ensures that panel will only close if target links to somewhere. */
    click ({ link, store, auth }) {
        if (link)
        {
            this.collapsed = !this.collapsed
        }
        else if (store)
        {
            this.collapsed = !this.collapsed
            if (store == '$ReadQueue')
                $ReadQueue.show()
        }
    }

    unAuthClick () {
        $Auth.$form.show({ showQuery: true, message: 'Sorry! That resource you tried to access require you to login.' })
    }

    collapse () {
        let _this = this
        function collapse (e) {
            if (!(e.target.closest('.HPWrapper')))
            {
                _this.collapsed = true
            }
        }
        window.addEventListener('click', collapse, false)
    }
}
</script>
<style lang="scss" scoped>
.HPWrapper {
    position: fixed;
    left: 0;
    top: 0;
    width: 400px;
    height: 100%;
    z-index: 8;
    transition: width 0.2s;

    & .Panel {
        overflow-y: scroll;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            #880e4f 0%,
            #006064 10%,
            #00bcd4,
            #006064 90%,
            #880e4f 100%
        );
        transition: transform 0.2s;
    }
    & .Handle {
        cursor: pointer;
        position: absolute;
        right: -25px;
        top: 70%;
        width: 60px;
        height: 60px;
        border-right: 5px solid $pink-3;
        border-left: 5px solid $pink-3;
        transition: all 0.4s;
        &:hover {
            right: -30px;
        }
        & > span {
            transition: transform 0.5s;
            &.close {
                transform: rotateZ(180deg);
            }
        }
    }

    &.Collapsed {
        width: 0px !important;
        & .Panel {
            transform: translateX(-400px);
        }
    }
}
.Head {
    height: 50px;
    text-shadow: 0px 1px 2px white;
    // border-bottom: $cyan--3 solid 3px;
    border-radius: 33%;
}
.Body {
    border-top: $cyan--3 solid 3px;
    border-radius: 10px;
}

.IconWrapper {
    flex: 0 0 auto;
    min-width: 70px;
    border-radius: 20px 20px 4px 4px;
    transition: background-color 0.5s ease;

    &:not(.NoHover):hover {
        background-color: rgba(0, 187, 212, 0.353);
        cursor: pointer;
    }

    & span {
        display: block;
        margin: 5px;
    }
    & span:first-child {
        font-size: 30px;
        text-shadow: 0px 1px 1px white;
    }
    & span:last-child {
        font-size: 12px;
        font-weight: bold;
    }
    & a {
        text-decoration: none;
    }
}

@include xs-only {
    .HPWrapper {
        max-width: calc(100% - 45px);
    }
}
</style>