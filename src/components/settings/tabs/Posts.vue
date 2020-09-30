<template>
    <div class="Tab xs12 sm11 lg10">
        <h2 class="text-center t-blue-grey--1">MANAGE POSTS SETTINGS</h2>

        <!-- Posts -->
        <section>
            <h3 class="Header">YOUR POSTS</h3>

            <!-- FILTER -->
            <Dropdown
                ownID="filt"
                :text="'Filter: '+ filter"
                :optPos="{left: 50}"
                class="Options icon-search-2 btn mb-7"
            >
                <!-- slots -->
                <template v-slot:default>
                    <a @click="filterBy('All',{})">All</a>
                    <a @click="filterBy('Published', {published:true})">Published</a>
                    <a @click="filterBy('Not Published', {published:false})">Not Published</a>
                    <a @click="filterBy('Archived', {archived:true})">Archived</a>
                </template>
            </Dropdown>

            <transition name="slide-down-fade">
                <section class="TopActions flex j-c-between noselect mx-4">
                    <span
                        @click="selectAll"
                        class="btn cyan-gradient-btn"
                    >{{selectedPosts.length > 2 ? 'UnSelect All' : 'Select All'}}</span>
                    <Dropdown
                        ownID="actions"
                        text="Actions"
                        :pos="{top:0, right: 0}"
                        class="icon-hammer btn pink-gradient-btn font-4 bg-trans-2"
                    >
                        <!-- slots -->
                        <template v-slot:default>
                            <a @click="deletePosts()">
                                <span class="icon-trash-empty"></span>
                                <span>Delete</span>
                            </a>
                            <a
                                v-show="changeActions('published', false) || changeActions('archived', true)"
                                @click="publish"
                            >
                                <span class="icon-angle-double-up"></span>
                                <span>Publish</span>
                            </a>
                            <a v-show="changeActions('published', true)" @click="publish(false)">
                                <span class="icon-angle-double-down"></span>
                                <span>Unpublish</span>
                            </a>
                            <a
                                v-show="changeActions('published', true) || changeActions('published',false)"
                                @click="archive"
                            >
                                <span class="icon-archive"></span>
                                <span>Archive</span>
                            </a>
                            <a v-show="changeActions('archived', true)" @click="archive(false)">
                                <span class="icon-ccw"></span>
                                <span>Unarchive</span>
                            </a>
                        </template>
                    </Dropdown>
                </section>
            </transition>

            <section v-if="posts.length > 0" class="PostsWrapper">
                <article v-for="post in posts" :key="post.id" class="Post flex a-i-center px-4">
                    <div class="PostImage flex a-i-center">
                        <img :src="$postBaseUrl + post.img" draggable="false" />
                    </div>
                    <div class="Details my-1 mx-3">
                        <h5 class="m-0 font-3">{{ post.title }}</h5>
                    </div>

                    <span
                        @click="selectPost(post.id)"
                        :class="checkBox(post.id) ? 'icon-check-1' : ''"
                        class="CheckBox"
                    ></span>

                    <!-- Dropdown component -->
                    <Dropdown
                        :ownID="post.id"
                        :pos="{type: 'absolute', right: 10}"
                        class="Action btn icon-ellipsis-vert font-8 bg-trans-2"
                    >
                        <!-- slots -->
                        <template v-slot:default>
                            <router-link :to="{path:'/posts/'+post.id}">
                                <span class="icon-eye"></span>
                                <span>View</span>
                            </router-link>
                            <a @click="editPost(post.id)">
                                <span class="icon-edit"></span>
                                <span>Edit</span>
                            </a>
                            <a @click="deletePosts(post.id)">
                                <span class="icon-plus-1"></span>
                                <span>Delete</span>
                            </a>
                        </template>
                    </Dropdown>
                </article>
            </section>
            <section
                v-else
                class="t-blue-grey text-center bold-3 font-9 mt-8 letter-space-1"
            >You Currently Have No Posts In This Filter</section>
        </section>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import { $Posts, $Auth } from '@/myStore'
import { $Notify } from '@/plugins'

@Component({
    components: {
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
    },

    computed: {
        user: () => $Auth.user,
        posts: () => $Posts.$settings.posts,
        // count: () => this.postsCount,
    },
})
export default class ManagePosts extends Vue {
    user!: any
    posts!: object[]
    // $refs!: {
    //     dropBtnActions
    // }
    selectedPosts: string[] = []

    filter: string = 'All' /* Filters posts list */
    query = {
        filter: {}
    }

    filterBy (txt, v: object) {
        this.filter = txt
        this.query.filter = v
        $Posts.$settings.fetchAll(this.query, true)
    }
    changeActions (action: string, value: boolean) {
        if (this.query.filter[ action ] === value)
            return true
        return false
    }

    selectPost (post_id) {
        if (!this.selectedPosts.includes(post_id))
            this.selectedPosts.push(post_id)
        else
            this.selectedPosts.splice(this.selectedPosts.indexOf(post_id), 1)
    }

    checkBox (post_id): boolean {
        if (this.selectedPosts.includes(post_id))
            return true
    }

    selectAll () {
        if (this.selectedPosts.length < 2)
            this.posts.forEach((post: any) => {
                if (!this.selectedPosts.includes(post.id))
                    this.selectedPosts.push(post.id)
            })
        else
            this.selectedPosts = []
    }

    deletePosts (post_id) {
        if (post_id)
            $Posts.$settings.delete({ postsIds: [ post_id ] }).then(() => {
                $Posts.$settings.fetchAll(this.query, true)
                this.selectedPosts = []
            })
        else
            if (this.selectedPosts.length > 0)
                $Posts.$settings.delete({ postsIds: this.selectedPosts }).then(() => {
                    $Posts.$settings.fetchAll(this.query, true)
                    this.selectedPosts = []
                })
            else
                $Notify.error('No Posts selected')
    }

    editPost (post_id) {
        $Posts.$compose.fetch({
            post_id: post_id
        }).then((data) => {
            if (data)
                this.$router.push({ path: '/compose', query: { mode: 'edit' } })
        })
    }

    publish (publish: boolean = true) {
        if (this.selectedPosts.length > 0)
            $Posts.$settings.publish({
                postsIds: this.selectedPosts, published: { value: publish ? true : false }
            })
                .then(() => {
                    $Posts.$settings.fetchAll(this.query, true)
                    this.selectedPosts = []
                })
        else
            $Notify.error('No Posts selected')
    }

    archive (archive: boolean = true) {
        if (this.selectedPosts.length > 0)
            $Posts.$settings.archive({
                postsIds: this.selectedPosts, archived: { value: archive ? true : false }
            })
                .then(() => {
                    $Posts.$settings.fetchAll(this.query, true)
                    this.selectedPosts = []
                })
        else
            $Notify.error('No Posts selected')
    }

}
</script>
<style lang="scss" scoped>
section {
    margin-bottom: 35px;
}

.Header {
    font-size: 14px;
    color: $blue-grey-1;
    border-top: solid 1.5px;
    border-bottom: solid 1.5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
}

.PostsWrapper {
    max-height: 400px;
    overflow: scroll;
}
.Post {
    position: relative;
    border-bottom: grey 1px solid;
    margin-bottom: 5px;
    &:hover {
        background-color: rgb(223, 220, 220);
        cursor: pointer;
    }
    & .PostImage {
        min-width: 80px;
        width: 80px;
        height: 60px;
        & img {
            max-width: 100%;
            max-height: 100%;
        }
    }
    & .Action {
        width: 30px;
    }
    & .CheckBox {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $pink--4;
        background-color: white;
        top: -1px;
        left: 0;
        width: 17px;
        height: 17px;
        border: $pink--4 solid 1.5px;
        cursor: pointer;
    }
}
.TopActions {
    & > * {
        min-width: 120px;
        height: 35px;
    }
    & > :first-child {
        border-radius: 88% 23% 23% 88%;
    }
    & > :last-child {
        position: relative;
        border-radius: 28% 88% 88% 28%;
    }
}
</style>