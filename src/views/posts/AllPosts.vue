<template>
    <Container ownID="MC-AllPosts">
        <div v-show="posts" class="Cover">
            <div class="Header flex j-c-between a-i-center shadow-8 bg-white br2 mb-2 px-2">
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
            <div v-if="posts && posts.length > 0">
                <ListOfPosts :posts="posts" />
            </div>

            <div v-else class="px-10">
                <h2
                    class="t-blue-grey text-center text-cap font- mt-8 letter-space-1"
                >No Posts Published At The Moment.</h2>
            </div>

            <div v-if="posts.length < 3" class="px-10 mt-10">
                <h4
                    class="t-blue-grey text-center text-cap font- mt-8 letter-space-1"
                >More Contents Will Be Available Shortly.</h4>
            </div>
        </div>
    </Container>
</template>
<script lang="ts">
import Container from '@/components/navs/reusables/Container.vue'

import { defineComponent, defineAsyncComponent } from "vue"
import { $Posts } from "@/myStore"
import { /* $ScrollLoader, */ $Obstacle } from "@/plugins"

export default defineComponent({
    components: {
        Container,
        Dropdown: defineAsyncComponent(() => import('@/components/GlobalComponents/utils/Dropdown.vue')),
        ListOfPosts: defineAsyncComponent(() => import("@/components/posts/ListOfPosts.vue")),
    },

    data () {
        return {
            curPage: 1,
            sort: 'Newest',
            query: {
                sort: 'desc'
            }
        }
    },

    computed: {
        posts: () => $Posts.posts,
        count: () => $Posts.postsCount,
    },

    methods: {
        sortBy (txt, v: string) {
            this.query.sort = v
            this.sort = txt
            $Posts.fetchAll(this.query, true)
        },

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

    },

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
})
</script>
<style lang="scss" scoped>
.Header {
    position: relative;
    height: 50px;
    transition: 0.3s;
    z-index: 2;
}
.Cover {
    margin-bottom: 50px;
}
// .sss {
//     background-color: blue;
//     height: 200px;
// }

// .Footer {
//     position: absolute;
//     bottom: 0;
// }
</style>