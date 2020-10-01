<template>
    <Container ownID="MC-AllPosts">
        <div
            v-show="posts"
            class="Header flex j-c-between a-i-center shadow-8 bg-white br2 mb-2 px-2"
        >
            <Dropdown
                ownID="pages"
                :text="'Go to Page: '+ curPage"
                :optPos="{right: -30}"
                class="font-3 btn bg-trans-3 noselect"
            >
                <!-- slots -->
                <template v-slot:default>
                    <a v-for="num in Math.floor(count/10 + 1)" :key="num">
                        <span @click="page(num)">{{num}}</span>
                    </a>
                </template>
            </Dropdown>

            <Dropdown
                ownID="PostSort"
                :text="'Sort By: ' + sort"
                class="icon-sort-alt-up font-3 btn bg-trans-3 noselect"
            >
                <!-- slots -->
                <template v-slot:default>
                    <a @click="sortBy('Newest','desc')">
                        <span class="icon-down-open"></span>
                        <span>Newest</span>
                    </a>
                    <a @click="sortBy('Oldest', 'asc')">
                        <span class="icon-up-open"></span>
                        <span>Oldest</span>
                    </a>
                </template>
            </Dropdown>
        </div>

        <!-- ListOfPosts Component -->
        <div class="postList">
            <ListOfPosts :posts="posts" />
        </div>

        <!--		<div v-else>
			<h2 class="t-blue-grey text-center text-cap font-9 mt-8 letter-space-1">No Posts Found!.</h2>
        </div>-->
    </Container>
</template>
<script lang="ts">
import Container from '@/components/navs/reusables/Container.vue'

import { Component, Vue, Prop } from "vue-property-decorator"
import { $Posts } from "@/myStore"
import { /* $ScrollLoader, */ $Obstacle } from "@/plugins"

@Component({
    components: {
        Container,
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
        ListOfPosts: () => import("@/components/posts/ListOfPosts.vue"),
    },
    computed: {
        posts: () => $Posts.posts,
        count: () => $Posts.postsCount,
    }
})
export default class AllPost extends Vue {

    curPage: number = 1
    sort: string = 'Newest'
    query = {
        sort: 'desc'
    }

    /* LC Hooks */
    mounted () {
        // let _this = this
        // $ScrollLoader('#MC-AllPosts').init(async function () {
        //     return await $Posts.fetchAll(_this.query).then(data => {
        //         if (data)
        //             return data
        //     })
        // })
        $Obstacle.create('#MC-AllPosts', {
            pageLoader: true
        })
        $Posts.fetchAll({}, true).then(ok => $Obstacle.destroy('#MC-AllPosts'))
        // this.$gtag.event('login', { method: 'Google' })
    }

    /* instance methods */
    sortBy (txt, v: string) {
        this.query.sort = v
        this.sort = txt
        $Posts.fetchAll(this.query, true)
    }

    page (n: number) {
        let query = {
            offset: n * 10 - 10, /* 10 is the default offset value */
            sort: this.query.sort
        }
        if (n != this.curPage)
            $Posts.fetchAll(query, true).then(loaded => {
                if (loaded) this.curPage = n
            })
    }
}
</script>
<style lang="scss" scoped>
.Header {
    position: relative;
    height: 50px;
    transition: 0.3s;
    z-index: 2;
}
.sss {
    background-color: blue;
    height: 200px;
}

.Footer {
    position: absolute;
    bottom: 0;
}
</style>