<template>
    <transition name="slide-fade">
        <div v-if="showComments" class="CommentsModal modal flex a-i-center j-c-center">
            <div class="Content xs12 sm9 md7 lg6">
                <!-- HEADER-->
                <h3
                    class="Head flex a-i-center j-c-between bg-white t-blue-grey font-7 p-2 my-0 noselect"
                >
                    <span
                        class="Header text-up font-5"
                    >Comments ({{subCommentMode ? subCommentCount : commentCount}})</span>
                    <div class="Actions flex">
                        <div class="labeled-action" @click="goBack">
                            <span class="icon-left-open-big"></span>
                            <span>Back</span>
                        </div>
                        <div class="labeled-action" @click="scrollUp">
                            <span class="icon-up-big"></span>
                            <span>Scroll Up</span>
                        </div>
                        <div class="labeled-action" @click="close">
                            <span class="icon-off t-pink-2"></span>
                            <span>Close</span>
                        </div>
                    </div>
                </h3>
                <!-- HEADER-->

                <hr class="my-2" />
                <!-- BODY-->
                <div
                    v-show="!subCommentMode"
                    ref="CommentBody"
                    class="Body MainComment br2 p-2 bg-white"
                >
                    <!-- Source of the comments -->
                    <!-- <section class="SourceWrapper br2 mb-3 mr-2 mt-10 px-2">
                        <div
                            class="Name flex nowrap a-i-center j-c-start w-full text-left t-blue-grey bold-5 font-3"
                        >
                            <div
                                class="bg-blue-grey-4"
                            >{{ post.user.first_name + ' ' + post.user.last_name }}</div>
                        </div>
                        <div class="bg-blue-grey-4 shadow-4 br3">
                            <div class="Title t-blue-grey bold-4 p-3">{{post.title}}</div>

                            <Minimizer :initialHeight="120">
                                <div class="SourceContent p-3" v-html="post.content"></div>
                            </Minimizer>

                            <span class="UserImage br5">
                                <img
                                    class="br5 noselect"
                                    :src="$userBaseUrl + post.user.profile_image"
                                    draggable="false"
                                />
                            </span>
                        </div>
                    </section>-->

                    <hr class="t-blue-grey shadow-8" />

                    <!--Major  Comments-->
                    <section class="Comments" v-if="comments.length > 0">
                        <div
                            v-for="comment in comments"
                            :key="comment.id"
                            class="CommentWrapper br2 mb-3 mr-2 mt-10 px-2"
                        >
                            <div
                                class="Name flex nowrap a-i-center j-c-between w-full text-right t-blue-grey bold-5 font-3"
                            >
                                <div>
                                    <!-- DROPDOWN COMPONENT-->
                                    <Dropdown
                                        :ownID="comment.id"
                                        :optPos="{ right: -100}"
                                        class="Dropdomn icon-dot-3 btn t-blue-grey font-12"
                                    >
                                        <!-- slots -->
                                        <template v-slot:default>
                                            <router-link
                                                v-if="!user || user.username !== comment.user.username"
                                                :to="{name:'user-profile', params:{username: comment.user.username}}"
                                            >
                                                <span class="icon-user"></span>
                                                <span>Profile</span>
                                            </router-link>
                                            <a
                                                v-if="user && user.username === comment.user.username"
                                                @click="edit(comment.id)"
                                            >
                                                <span class="icon-edit"></span>
                                                <span>Edit</span>
                                            </a>
                                            <a
                                                v-if="user && user.username === comment.user.username"
                                                @click="delete(comment.id)"
                                            >
                                                <span class="icon-trash-empty t-red"></span>
                                                <span>Delete</span>
                                            </a>
                                            <a
                                                v-if="user && user.username !== comment.user.username"
                                                @click="report(comment.id, comment.user.username)"
                                            >
                                                <span class="icon-info t-red"></span>
                                                <span>Report</span>
                                            </a>
                                        </template>
                                    </Dropdown>
                                </div>

                                <div
                                    class="bg-grey-5 mr-2"
                                >{{ comment.user.first_name + ' ' + comment.user.last_name }}</div>
                            </div>
                            <div class="shadow-2 bg-grey-5 br3">
                                <!--Content Minimizer Component -->
                                <Minimizer :initialHeight="120">
                                    <div class="CommentContent p-2" v-html="comment.content"></div>
                                </Minimizer>

                                <span class="UserImage br5">
                                    <img
                                        class="br5 noselect"
                                        :src="$userBaseUrl + comment.user.profile_image"
                                        draggable="false"
                                    />
                                </span>

                                <div class="Actions font-3 t-grey bold-2 p-2 noselect">
                                    <span @click="replies(comment, true)" class="icon-reply">Reply</span>
                                    <span @click="replies(comment)">{{comment.comments}} Replies</span>
                                    <span class="icon-thumbs-up-alt"></span>
                                    <span style="margin: 4px 0px">544</span>
                                    <span class="icon-thumbs-down-alt"></span> |
                                    <span
                                        class="icon-clock"
                                    >{{ $moment(comment.created_at).fromNow()}}</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section v-else>
                        <h2
                            class="t-blue-grey text-center text-cap font-7 mt-5 letter-space-1"
                        >Be The First To Post A Comment</h2>
                    </section>
                    <!--Major Comments-->
                </div>

                <!--Sub Comments-->
                <SubComments
                    ref="SubCommentsComponent"
                    :activeComment="activeSubComment"
                    :subCommentMode="subCommentMode"
                />
                <!--Sub Comments-->
                <!-- BODY-->
                <hr class="my-2" />

                <!-- FOOTER-->
                <div class="Foot flex a-i-center bg-white mb-1 br2">
                    <div
                        ref="Input"
                        @input="input"
                        class="Input p-5"
                        contenteditable="true"
                        placeholder="Post A Public Comment..."
                    ></div>
                    <span
                        @click="send"
                        class="Send icon-right-open-big flex a-i-center j-c-center btn pink-gradient-btn shadow-3 bold-5 font-9"
                    ></span>
                </div>
                <!-- FOOTER-->
            </div>
        </div>
    </transition>
</template>
<script lang="ts">
import Vue from "vue"

import { $Comments, $Posts, $Auth } from "@/myStore"
import { $Validator, $Obstacl, WS } from "@/plugins"

export default Vue.extend({
    components: {
        Minimizer: () => import('@/components/GlobalComponents/utils/Minimizer.vue'),
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
        SubComments: () => import("@/components/posts/comment/SubComments.vue"),
    },

    props: {
        showComments: { required: true, type: Boolean },
        post: { required: true } as any, /* current post which's comment is being viewed */
        socket: { required: true,/* SocketIOClient.Socket  */ } as any, /* An instance of the comments socket connection */
    },

    data () {
        return {
            /* Major comments properties */
            commentContent: '',

            /* Sub comments properties */
            subCommentMode: false,
            activeSubComment: null,  /* object */
            subComment_Socket: null //as SocketIOClient.Socket


        }
    },

    computed: {
        user: () => $Auth.user,

        // post: () => $Posts.$single.post,
        // user: () => $Posts.$single.post.user,

        comments: () => $Comments.comments,
        commentCount: () => $Comments.commentCount,
        subCommentCount: () => $Comments.$SubComments.commentCount,
    },

    methods: {
        replies (comment: any, focusInput: boolean = false) {
            this.subComment_Socket = WS('/subComments/fetch-' + comment.id)

            if (this.user && focusInput)
                (this.$refs.Input as HTMLDivElement).focus()
            $Comments.$SubComments.fetchAll(this.subComment_Socket, comment.id, {}, true).then((data) => {
                if (data)
                {
                    this.activeSubComment = comment
                    this.subCommentMode = true
                }
            })
        },

        input (event) {
            // console.log(event)
            if (this.user)
                this.commentContent = event.target.textContent
        },

        send () {
            if (this.user)
            {

                const schema = [
                    {
                        fieldName: 'Comment',
                        data: this.commentContent,
                        rules: {
                            required: true,
                            string: true,
                        }
                    }
                ]

                if ($Validator.validate(schema))
                    if (!this.subCommentMode)
                        $Comments.new({ post_id: this.post.id, comment: this.commentContent }).then(sent => {
                            if (sent)
                            {
                                this.socket.emit('newComment')
                                this.commentContent = '';
                                (this.$refs.Input as HTMLDivElement).textContent = ''
                            }
                        })
                    else
                        $Comments.$SubComments.new({ comment_id: this.activeSubComment.id, comment: this.commentContent }).then(sent => {
                            if (sent)
                            {
                                this.subComment_Socket.emit('newComment')
                                this.commentContent = '';
                                (this.$refs.Input as HTMLDivElement).textContent = ''
                            }
                        })
                // else
                // console.log($Validator.getErrors())
            }
        },

        edit (comment_id) {

        },
        del (comment_id) {

        },
        report (comment_id, username: string) {

        },

        /* Misc Actions */
        scrollUp () {
            if (this.subCommentMode === true)
                document.getElementById('SubCommentBody').scrollTo({ top: 0, left: 0, behavior: "smooth" })
            else
                (this.$refs.CommentBody as HTMLDivElement).scrollTo({ top: 0, left: 0, behavior: "smooth" })
        },

        goBack () {
            if (this.subCommentMode)
            {
                this.subComment_Socket.close()
                this.subCommentMode = false
            }
            else
                this.close()
        },

        close () {
            if (this.subCommentMode)
            {
                this.subComment_Socket.close()
                this.subCommentMode = false
            }

            this.$emit('dismiss')
            this.socket.close()
        }

    },

    updated () {
        if (!this.user)
        {
            let _this = this
            $Obstacl.create('.CommentsModal .Foot', {
                text: 'You must login to reply. Click to login',
                icon: 'icon-shield',
                animate: false,
                onClick: function () {
                    _this.goBack()
                    $Auth.$form.show()/* login */
                }
            })
        }
    }

})
    // $refs!: {
    //     SubCommentsComponent: any /* for reference to the component's methods */
    //     CommentBody: HTMLElement
    //     Input: HTMLDivElement
    // }

</script>
<style lang="scss" >
.CommentsModal {
    & > .Content {
        height: 100vh;
        & .Head {
            border-radius: 8px 8px 0 0;
            & .Header {
                max-width: 85%;
                overflow-x: hidden;
            }
        }
        & .Body {
            height: calc(100vh - 110px);
            overflow-y: scroll;

            & .SourceWrapper {
                position: relative;
                & .Name {
                    & > div {
                        padding: 4px 4px 4px 46px;
                        margin-left: 4px;
                        width: 84%;
                        border-top: solid currentColor 0.5px;
                        border-radius: 0 50px 0 0;
                    }
                }

                & .UserImage {
                    position: absolute;
                    left: -2px;
                    top: -18px;
                    border: solid 3px rgba(128, 128, 128, 0.476);
                    height: 50px;
                    width: 50px;
                    & img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            & .CommentWrapper {
                position: relative;
                & .Name {
                    & > div:first-child {
                        position: relative;
                        margin-left: 4px;
                        width: 12%;
                        & .Dropdomn {
                            width: 100%;
                            border-top: solid currentColor 0.5px;
                            border-radius: 50px 50px 5px 5px;
                            background-color: transparent;
                            box-shadow: none;
                            transition: 0.3s;
                            &:active {
                                background-color: rgba(173, 216, 230, 0.35);
                            }
                        }
                    }
                    & > div:last-child {
                        padding: 4px 46px 4px 4px;
                        margin-right: 4px;
                        width: 84%;
                        border-top: solid currentColor 0.5px;
                        border-radius: 50px 0 0 0;
                    }
                }

                & .UserImage {
                    position: absolute;
                    right: -4px;
                    top: -18px;
                    border: solid 3px rgba(128, 128, 128, 0.476);
                    height: 50px;
                    width: 50px;
                    & img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            & .Comments {
                & .Actions {
                    & > span:not(:last-child) {
                        border-radius: 3px;
                        color: rgb(92, 189, 221);
                        padding: 4px;
                        margin: 4px;
                        cursor: pointer;
                        transition: 0.3s;

                        &:active {
                            background-color: rgba(173, 216, 230, 0.45);
                        }
                    }
                }
            }
        }

        & .Foot {
            border: solid 1px $pink--3;
            & .Input {
                width: calc(100% - 45px);
            }
            & .Send {
                width: 35px;
                height: 35px;
            }
        }
    }
}

.MainComment {
    animation: slide-right 0.4s;
}
</style>