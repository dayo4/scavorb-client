<template>
    <Container ownID="MC-NewPosts" :noSideNav="false">
        <div class="flex j-c-center wrap">
            <div class="xs12 md9">
                <!-- The composer component -->
                <Composer ref="composer"></Composer>
            </div>

            <div class="xs12 md3 px-6">
                <button
                    @click="triggerImageTransformer"
                    class="btn icon-picture my-8"
                >Add Featured Image</button>
                <div
                    class="t-blue-grey--2 mb-8"
                >This is the main post image displayed at the top of the post page.</div>
                <ImageTransformer
                    @ready="addPostImage"
                    ref="imageTransformer"
                    fieldName="featuredImage"
                    :cropWidth="600"
                    :cropHeight="350"
                />
                <div class="PostImage">
                    <img
                        v-if="postImageSrc"
                        ref="postImage"
                        :src="postImageSrc.match(/^data:/) ? postImageSrc : $postBaseUrl + postImageSrc "
                        alt="post image"
                    />
                </div>

                <hr />

                <div
                    class="t-blue-grey--2 mt-10"
                >You can save, edit and update your content all you want. Hit the "Publish" button whenever you are ready to go live with it.</div>
                <button class="btn icon-publish my-9">PUBLISH</button>
            </div>
        </div>

        <div class="Actions flex j-c-center noselect my-5">
            <button
                id="saveBtn"
                ref="saveBtn"
                @click="startProcessing"
                class="icon-floppy btn cyan-gradient-btn"
            >{{ currentPost_id ? 'UPDATE' : 'SAVE NEW' }}</button>
            <span
                ref="previewBtn"
                class="btn cyan-gradient-btn"
                @click="preview(currentPost_id)"
            >PREVIEW</span>
        </div>
    </Container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

import { $Posts } from "@/myStore"
import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import Composer from "@/components/posts/new/Composer.vue"

@Component({
    components: {
        Container,
        Composer,
        ImageTransformer: () => import("@/components/uploads/ImageTransformer.vue"),
    },
    computed: {
        currentPost_id: () => $Posts.$compose.currentPost_id,
        postImageSrc: () => $Posts.$compose.featuredImage.postImageSrc
    },
})
export default class Compose extends Vue {
    postImageSrc!: any
    $refs!: {
        composer
        imageTransformer
        postImage: HTMLImageElement

        saveBtn
        previewBtn
    }

    preview (slug) {


        if (!slug)
        {
            $Notify.info('You have to Save content first before you can preview.')
            return
        }
        else
        {
            let route = this.$router.resolve({ path: 'posts-preview/' + slug })
            window.open(route.href, '_blank')
        }

    }

    triggerImageTransformer () {
        this.$refs.imageTransformer.trigger()
    }

    addPostImage (formData, base64Image) {
        $Posts.$compose.setFeaturedImage({
            postImageSrc: base64Image,
            formData
        })
    }

    startProcessing () {
        // $Obstacle.create(this.$refs.saveBtn, {
        // timer: 4000,
        this.$refs.composer.init()
        // })

    }


}
</script>
<style lang="scss" scoped>
.Actions {
    & > * {
        min-width: 120px;
        height: 40px;
    }
    & > :first-child {
        border-radius: 28px 0 0 28px;
    }
    & > :last-child {
        border-radius: 0 28px 28px 0;
    }
}

.PostImage {
    // max-width: 300px;
    height: 250px;
    & img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>