<template>
    <div class="Wrapper flex j-c-center">
        <div class="xs12 sm10 md9">
            <div v-for="post in posts" :key="post.id">
                <!-- <section v-if="!post.isArticle" class="ShortPost br2 mb-3 mr-2 mt-10 px-2">
                    <div
                        class="Name flex nowrap a-i-center j-c-between w-full text-right t-blue-grey bold-5 font-3"
                    >
                        <div>
                            <Dropdown
                                :ownID="post.id"
                                :pos="{type: 'absolute', top: -13, right: 0}"
                                :optPos="{ right: -100}"
                                class="Dropdomn icon-dot-3 btn t-blue-grey font-12"
                            >
                                <template v-slot:default>
                                    <a>
                                        <span class="icon-bookmarks"></span>
                                        <span>Bookmark</span>
                                    </a>
                                    <a
                                        v-if="user && user.username === post.user.username"
                                        @click="editPost(post.id)"
                                    >
                                        <span class="icon-edit"></span>
                                        <span>Edit</span>
                                    </a>
                                    <a
                                        v-if="user && user.username === post.user.username"
                                        @click="deletePost(post.id)"
                                    >
                                        <span class="icon-trash-empty t-red"></span>
                                        <span>Delete</span>
                                    </a>
                                </template>
                            </Dropdown>
                        </div>

                        <div
                            class="bg-grey-5"
                        >{{ post.user.first_name + ' ' + post.user.last_name }}</div>
                    </div>

                    <div class="shadow-4 bg-grey-5 br3">
                        <div class="Title t-blue-grey bold-4 p-3">{{post.title}}</div>

                        <Minimizer :initialHeight="150">
                            <div class="Content p-3" v-html="post.content"></div>
                        </Minimizer>

                        <span class="UserImage br5">
                            <img
                                class="br5 noselect"
                                :src="$userBaseUrl + post.user.profile_image"
                                draggable="false"
                            />
                        </span>

                        <div class="Actions font-3 t-grey bold-3 p-2 noselect">
                            <span @click="showCommentModal(post)" class="icon-reply">Reply</span>
                            <span @click="showCommentModal(post)">{{post.comments}} Replies</span>
                            <span class="icon-thumbs-up-alt"></span>
                            <span style="margin: 4px 0px">58</span>
                            <span class="icon-thumbs-down-alt"></span> |
                            <span class="icon-clock">{{ $moment(post.created_at).fromNow()}}</span>
                        </div>
                    </div>
                </section>-->

                <!-- regular posts(ARTICLE) template-->
                <section class="Article br2 mb-3">
                    <section class="PostImage noselect mr-2">
                        <img
                            :src="post.img ? $postBaseUrl + post.img : '/defaults/4.jpg'"
                            @click="openPost(post.id, post.title)"
                            draggable="false"
                            class="br2"
                        />
                    </section>
                    <section class="Details">
                        <div
                            @click="openPost(post.id, post.title)"
                            class="cursor-pointer flex h-full w-full"
                        >
                            <img
                                :src="$userBaseUrl + post.user.profile_image"
                                width="55"
                                height="55"
                                draggable="false"
                                class="noselect"
                            />
                            <div>
                                <h5 class="font-3 my-1 mx-5 t-white">{{post.title}}</h5>
                                <p class="font-2 my-2 mx-5 t-grey-1 bold-3">
                                    <span
                                        class="mr-2 bold-5 t-grey-2"
                                    >{{ post.user.first_name + ' ' + post.user.last_name }}</span>
                                    - {{post.comments}} {{post.comments.length > 1 ? 'replies' : 'reply' }}
                                    <span
                                        class="icon-clock"
                                    >{{ $moment(post.created_at).fromNow()}}</span>
                                </p>
                            </div>
                        </div>

                        <!-- Dropdown component -->
                        <Dropdown
                            :ownID="post.id"
                            :pos="{type: 'absolute', top: 8, right: 10}"
                            class="btn icon-ellipsis-vert font-8 bg-trans-2"
                            style="width:30px;"
                        >
                            <!-- slots -->
                            <template v-slot:default>
                                <router-link :to="{path:'/posts/'+post.id}" target="_blank">
                                    <span class="icon-eye"></span>
                                    <span>Open</span>
                                </router-link>
                                <a>
                                    <span class="icon-bookmarks"></span>
                                    <span>Bookmark</span>
                                </a>
                                <a @click="addToQueue(post.id, post.img, post.title)">
                                    <span class="icon-plus-1"></span>
                                    <span>Add to queue</span>
                                </a>
                            </template>
                        </Dropdown>
                    </section>
                </section>
            </div>
        </div>

        <!--MAIN COMMENTS COMPONENT -->
        <!-- <Comments
            :showComments="showComments"
            :socket="comment_Socket"
            :post="activePost"
            @dismiss="showComments = false"
        />-->
        <!--MAIN COMMENTS COMPONENT -->
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { $ReadQueue, $Posts, $Auth } from "@/myStore"
import { $Process } from "@/plugins"

@Component({
    components: {
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
        // Comments: () => import('@/components/posts/comment/Comments.vue')
    },
    computed: {
        user: () => $Auth.user,
    }
})
export default class ListOfPost extends Vue {
    @Prop({ required: true, type: Array }) readonly posts: []

    // activePost: object = null
    // showComments: boolean = false
    // comment_Socket: SocketIOClient.Socket = null


    // showCommentModal (post) {
    //     $Process.add('Setting up comments')

    //     this.comment_Socket = WS('/comments/fetch-' + post.id)
    //     this.activePost = post
    //     $Comments.fetchAll(this.comment_Socket, post.id, {}, true).then((data) => {
    //         if (data)
    //         {
    //             this.showComments = true

    //         }
    //     }).finally(() => $Process.hide())
    // }

    openPost (post_id, title) {
        let route = this.$router.resolve({ path: '/posts/' + post_id + '_' + title })
        window.open(route.href, '_blank')
    }

    addToQueue (post_id, post_image: File, post_title: string) {
        $ReadQueue.add({
            id: post_id,
            image: post_image ? this.$postBaseUrl + post_image : '/defaults/4.jpg',
            title: post_title
        })
    }
}
</script>
<style lang="scss" scoped>
.Wrapper {
    margin: auto;
}

.Article {
    display: flex;
    height: 200px;
    background-color: rgb(45, 45, 45);

    & .PostImage {
        cursor: pointer;
        height: 100%;
        min-width: 50%;
        width: 50%;
        & img {
            height: 100%;
            width: 100%;
        }
    }
    & .Details {
        width: 100%;
        position: relative;
        padding: 8px;
        margin: 3px 2px;
        & img {
            min-width: 55px;
            border-radius: 50%;
        }
    }
}

@include xs-only {
    .Article {
        height: 330px;
        flex-wrap: wrap;

        & .PostImage {
            height: 250px;
            width: 100%;
            margin: auto;
            background-size: cover;
        }
        & .Details {
            min-height: 80px;
            margin: 0;
        }
    }
}

// .ShortPost {
//     position: relative;
//     & .Name {
//         & > div:first-child {
//             position: relative;
//             margin-left: 4px;
//             width: 12%;
//             & .Dropdomn {
//                 width: 100%;
//                 border-top: solid currentColor 0.5px;
//                 border-radius: 50px 50px 5px 5px;
//                 background-color: transparent;
//                 box-shadow: none;
//                 transition: 0.3s;
//                 &:active {
//                     background-color: rgba(173, 216, 230, 0.35);
//                 }
//             }
//         }
//         & > div:last-child {
//             padding: 4px 50px 4px 4px;
//             margin-right: 2px;
//             width: 84%;
//             border-top: solid currentColor 0.5px;
//             border-radius: 50px 0 0 0;
//         }
//     }
//     & .UserImage {
//         position: absolute;
//         right: -4px;
//         top: -18px;
//         border: solid 3px rgba(128, 128, 128, 0.476);
//         height: 50px;
//         width: 50px;

//         & img {
//             width: 100%;
//             height: 100%;
//         }
//     }
//     & .Actions {
//         & > span:not(:last-child) {
//             border-radius: 5px;
//             color: rgb(92, 189, 221);
//             padding: 4px;
//             margin: 4px;
//             cursor: pointer;
//             transition: 0.3s;

//             &:active {
//                 background-color: rgb(173, 216, 230);
//             }
//         }
//     }
// }
</style>