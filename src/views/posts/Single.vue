<template>
    <Container ownID="MC-PostView">
        <div class="flex j-c-center mx-4">
            <div class="Wrapper xs12 sm10 md9 lg10">
                <!-- POST USER -->
                <section class="UserDetails flex a-i-center bg-white px-3 mb-2 mt-8">
                    <div></div>
                    <div class="Info flex col text-center w-full mr-2">
                        <div
                            class="font-6 bold-3 t-blue-grey--1 text-cap m-1"
                        >{{ post.user.first_name }} {{ post.user.last_name }}</div>

                        <div class="flex a-s-center">
                            <!-- <button
                                @click="$router.push({name:'user-profile', params:{username: post.user.username}})"
                                class="icon-user btn font-3 py-1 px-2 m-1 bg-pink--2 t-white br1"
                            >View Profile</button>-->
                            <button
                                v-if="user && user.id === post.user_id"
                                @click="editPost(post.slug)"
                                class="icon-edit btn a-s-center font-3 py-1 px-2 m-1 bg-pink--2 t-white br1"
                            >Edit Post</button>
                        </div>
                        <i class="t-cyan--2 font-3 p-1 b1 br3">{{ post.user.status }}</i>
                    </div>
                    <div class="Image noselect">
                        <img
                            :src="$userBaseUrl + post.user.profile_image"
                            alt="user"
                            draggable="false"
                        />
                    </div>
                </section>

                <!-- HEAD -->
                <section class="Head flex col j-c-center p-4">
                    <div
                        class="Title a-s-center font-9 bold-3 t-blue-grey text-cap text-center letter-space-1 px-8 mb-8"
                    >{{ post.title }}</div>
                    <div class="FeaturedImage a-s-center br4 p-0 noselect">
                        <img
                            class="w-full br4"
                            :src="$postBaseUrl + post.img"
                            alt="image"
                            draggable="false"
                        />
                    </div>
                </section>

                <!-- META -->
                <section class="Meta mt-2">
                    <hr />
                    <div class="m-1 t-blue-grey">
                        <b>Updated:</b>
                        {{ $moment(post.updated_at).fromNow() }}
                    </div>
                    <hr />
                    <div class="ShareIcons flex a-i-center noselect">
                        <div
                            class="icon-forward pink-gradient-btn flex a-i-center j-c-center t-white font-12 br5 bg-pink--4"
                        ></div>
                        <div class="font-7 pl-10 py-2 pr-4 br4 flex j-c-around">
                            <a
                                @mouseout="shareIconsTooltip = ''"
                                @mouseover="shareIconsTooltip = 'facebook'"
                                class="icon-facebook t-blue--2"
                            ></a>
                            <a
                                :href="`https://twitter.com/share?url=${href}`"
                                target="_blank"
                                @mouseout="shareIconsTooltip = ''"
                                @mouseover="shareIconsTooltip = 'twitter'"
                                class="icon-twitter t-cyan"
                            ></a>
                            <a
                                @mouseout="shareIconsTooltip = ''"
                                @mouseover="shareIconsTooltip = 'whatsapp'"
                                class="icon-whatsapp t-green--2"
                            ></a>
                            <a
                                @mouseout="shareIconsTooltip = ''"
                                @mouseover="shareIconsTooltip = 'reddit'"
                                class="icon-reddit t-red-1"
                            ></a>
                            <i
                                class="Tooltip font-4 text-center"
                                :class="shareIconsTooltip ? '' : 'transform'"
                            >{{ shareIconsTooltip }}</i>
                        </div>
                    </div>
                    <hr />
                    <div class="Actions flex j-c-center noselect my-1">
                        <span
                            @click="showCommentModal(post)"
                            class="icon-comment btn cyan-gradient-btn"
                        >Comments ({{post.comments}})</span>
                        <!-- <span
                            class="icon-thumbs-up-alt btn pink-gradient-btn"
                            @click="thumbUp"
                        >{{post.up}}</span>-->
                    </div>
                </section>

                <!-- BODY -->
                <section v-html="post.content" class="Body p-9"></section>

                <hr class="shadow-9" />

                <div
                    class="Divider px-8 mt-10 font-9 bold-3 t-blue-grey text-cap text-center letter-space-1"
                >Author</div>
                <!-- FOOT -->
                <section class="Foot">
                    <div class="UserDetails py-1 px-3 mb-2 mt-8">
                        <div class="Info flex col text-center w-full mr-2">
                            <div
                                class="font-6 bold-3 t-blue-grey--1 text-cap m-1"
                            >{{ post.user.first_name }} {{ post.user.last_name }}</div>
                            <div class="flex a-s-center">
                                <button
                                    @click="$router.push({name:'user-profile', params:{username: post.user.username}})"
                                    class="icon-user btn font-3 py-1 px-2 m-1 bg-pink--2 t-white br1"
                                >View Profile</button>
                                <button
                                    v-if="user && user.id === post.user_id"
                                    @click="editPost(post.slug)"
                                    class="icon-edit btn a-s-center font-3 py-1 px-2 m-1 bg-pink--2 t-white br1"
                                >Edit Post</button>
                            </div>

                            <!-- user Image and About -->
                            <div class="flex wrap sm-nowrap j-c-center a-i-center">
                                <div class="Image noselect">
                                    <img
                                        :src="$userBaseUrl + post.user.profile_image"
                                        alt="user"
                                        draggable="false"
                                    />
                                </div>

                                <!--Content Minimizer Component -->
                                <Minimizer :initialHeight="90" :closeable="false">
                                    <div class="t-cyan--3 font-4 p-1 b1 br3">{{ post.user.about }}</div>
                                </Minimizer>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <!--MAIN COMMENTS COMPONENT -->
            <Comments
                :showComments="showComments"
                :socket="socket"
                :post="activePost"
                @dismiss="showComments = false"
            />
            <!--MAIN COMMENTS COMPONENT -->
        </div>
    </Container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"

import { $Auth, $Posts, $Comments } from "@/myStore"
import { $Notify, $Process, $General, WS } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'

@Component({
    components: {
        Container,
        Comments: () => import("@/components/posts/comment/Comments.vue"),
        Minimizer: () => import('@/components/GlobalComponents/utils/Minimizer.vue')
    },
    metaInfo () {
        return $General.metaInfo(this.post.title, this.post.content, this.$postBaseUrl + this.post.img, this.href, 'Article')
    },
    computed: {
        user: () => $Auth.user,
        post: () => $Posts.$single.post,
        // content_images: () => $Posts.$single.post.content_images
    },
})
export default class PostView extends Vue {

    /* own properties */
    shareIconsTooltip = ''
    href = window.location.href
    body = document.querySelector('.Body') /* Post body element */

    /* comments properties */
    activePost: object = null
    showComments: boolean = false
    socket: SocketIOClient.Socket = null

    @Watch('$route')
    refreshProfile () {
        $Posts.$single.fetch({
            slug: this.$route.params.slug
        })
    }

    showCommentModal (post) {
        $Process.add('Setting up comments')
        this.socket = WS('/comments/fetch-' + post.id)
        this.activePost = post
        $Comments.fetchAll(this.socket, post.id, {}, true).then((data) => {
            if (data)
            {
                this.showComments = true
            }
        }).finally(() => $Process.hide())
    }

    editPost (slug) {
        $Posts.$compose.fetch({
            slug: slug
        }, true).then((data) => {
            if (data)
                this.$router.push({ path: '/compose', query: { mode: 'edit' } })
            // let route = this.$router.resolve({ path: '/compose' })
            // window.open(route.href, '_blank')
        })
    }

    thumbUp () {
        // $Posts.$single.fetch({
        //     post_id: this.$route.params.post_id
        // })
    }
}
</script>
<style lang="scss" scoped>
.Wrapper > div {
    margin-bottom: 15px;
    overflow: hidden;
    background-color: white;
}

.UserDetails {
    border-radius: 28px 100px 100px 28px;
    // min-height: 100%;
    position: relative;
    & .Image {
        position: relative;
        border: 2px solid $cyan--3;
        background-color: $cyan--3;
        border-radius: 100%;
        min-width: 65px;
        min-height: 65px;
        width: 65px;
        height: 65px;
        & img {
            min-width: 60px;
            min-height: 60px;
            width: 60px;
            height: 60px;
            border-radius: 100%;
        }
        // &::after {
        //     content: "";
        //     position: absolute;
        //     left: 10px;
        //     bottom: 10px;
        //     width: 15px;
        //     height: 15px;
        //     border-radius: 100%;
        //     border: rgba(255, 255, 255, 0.544) solid 2px;
        //     background-color: rgba(27, 150, 27, 0.945);
        // }
    }
}

.Head {
    border-radius: 100px;
    & .Title {
        border-radius: 93%;
        border-top: 2px $blue-grey-2 solid;
        padding-top: 35px;
        width: 100%;
    }
    & .FeaturedImage {
        overflow: hidden;
        width: 92%;
    }
}
.Meta {
    & .ShareIcons {
        position: relative;
        & div:first-child {
            width: 50px;
            height: 50px;
            z-index: 2;
        }
        & div:nth-child(2) {
            position: absolute;
            left: 20px;
            top: 6px;
            min-width: 250px;
            border: solid $pink--2 3px;
            z-index: 1;
            & span {
                border-radius: 50%;
                cursor: pointer;
            }
            & .Tooltip {
                position: absolute;
                content: "";
                bottom: -21px;
                left: 25%;
                min-width: 100px;
                height: 20px;
                background-color: $pink--2;
                color: white;
                border-radius: 0 0 5px 5px;
                transform: rotateX(0deg);
                transition: transform 0.1s ease-in-out;
                &.transform {
                    transform: rotateX(90deg);
                }
            }
        }
    }

    & .Actions {
        & span:first-child {
            border-radius: 28px /*  0 0 28px */;
        }
        // & span:last-child {
        //     border-radius: 0 28px 28px 0;
        // }
    }
    & hr {
        color: $blue-grey-4;
        margin: 2px;
    }
}
.Body {
    height: fit-content;
    width: 100%;
    overflow: hidden;
    & img {
        max-width: 100% !important;
    }
}

.Divider {
    border-radius: 93%;
    border-bottom: 2px $blue-grey-2 solid;
    padding-bottom: 15px;
    width: 100%;
}

.Foot {
    height: fit-content;
}

@include xs-only {
    .Head {
        & .Title {
            border-radius: 32%;
            padding: 25px 6px 6px 0px;
            width: 99%;
        }
        & .FeaturedImage {
            width: 99%;
        }
    }
}
</style>