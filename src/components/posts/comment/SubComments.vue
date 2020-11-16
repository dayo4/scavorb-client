<template>
    <!-- BODY-->
    <div
        v-if="subCommentMode"
        id="SubCommentBody"
        class="Body br2 p-2 bg-white"
        style="animation: slide-left 0.4s;"
    >
        <!-- Source of the comments -->
        <section class="SourceWrapper br2 mb-3 mr-2 mt-10 px-2">
            <div
                class="Name flex nowrap a-i-center j-c-start w-full text-left t-blue-grey bold-5 font-3"
            >
                <div
                    class="bg-blue-grey-4 shadow-"
                >{{ activeComment.user.first_name + ' ' + activeComment.user.last_name }}</div>
            </div>
            <div class="bg-blue-grey-4 shadow-4 br3">
                <!--Content Minimizer Component -->
                <Minimizer :initialHeight="120">
                    <div class="SourceContent p-3" v-html="activeComment.content"></div>
                </Minimizer>

                <span class="UserImage br5">
                    <img
                        class="br5 noselect"
                        :src="$userBaseUrl + activeComment.user.profile_image"
                        draggable="false"
                    />
                </span>
            </div>
        </section>

        <hr class="t-blue-grey shadow-8" />

        <!--Sub  Comments-->
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
                            :optPos="{ right: -70}"
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
                                    @click="del(comment.id)"
                                >
                                    <span class="icon-trash-empty t-red"></span>
                                    <span>Delete</span>
                                </a>
                                <a
                                    v-if="user && user.username !== comment.user.username"
                                    @click="reportComment(comment.id, comment.user.username)"
                                >
                                    <span class="icon-info t-red"></span>
                                    <span>Report</span>
                                </a>
                            </template>
                        </Dropdown>
                    </div>

                    <div
                        class="bg-grey-5"
                    >{{ comment.user.first_name + ' ' + comment.user.last_name }}</div>
                </div>
                <div class="shadow-2 bg-grey-5 br3">
                    <!--Content Minimizer Component -->
                    <Minimizer :initialHeight="120">
                        <div class="CommentContent p-3" v-html="comment.content"></div>
                    </Minimizer>

                    <span class="UserImage br5">
                        <img
                            class="br5 noselect"
                            :src="$userBaseUrl + comment.user.profile_image"
                            draggable="false"
                        />
                    </span>

                    <div class="Actions font-3 t-grey bold-4 p-2 noselect">
                        <span class="icon-reply">Reply</span>
                        <span class="icon-thumbs-up-alt"></span>
                        <span style="margin: 4px 0px">44</span>
                        <span class="icon-thumbs-down-alt"></span> |
                        <span class="icon-clock">{{ $moment(comment.created_at).fromNow()}}</span>
                    </div>
                </div>
            </div>
        </section>
        <section v-else>
            <h2
                class="t-blue-grey text-center text-cap font-7 mt-10 letter-space-1"
            >Reply to {{activeComment.user.first_name + ' ' + activeComment.user.last_name}}</h2>
        </section>
        <!--Sub Comments-->
    </div>
    <!-- BODY-->
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from "vue"

import { $Comments, $Auth } from "@/myStore"
import { $Validator } from "@/plugins"

export default defineComponent({
    components: {
        Minimizer: defineAsyncComponent(() => import('@/components/GlobalComponents/utils/Minimizer.vue')),
        Dropdown: defineAsyncComponent(() => import('@/components/GlobalComponents/utils/Dropdown.vue')),
    },

    props: {
        subCommentMode: { required: true, type: Boolean },
        activeComment: { required: true, type: Object },
    },

    computed: {
        user: () => $Auth.user,
        comments: () => $Comments.$SubComments.comments,
    }
})

</script>
<style lang="scss">
/* Shares same style as the main comment */
</style>