<template>
    <div>
        <div class="Post_Title_Container px-5 pt-5 mb-0">
            <div class="t-white bold-4 font-6">TITLE :</div>
            <div
                ref="titleInput"
                @input="setTitle"
                v-on:paste="plainText"
                class="Post_Title bg-white br4 p-5"
                contenteditable="true"
                placeholder="Enter Post Title"
            ></div>

            <div
                v-if="errors && errors['Title']"
                :class="errors && errors['Title'] ? 'vibrate' : ''"
                class="font-3 p-1 bg-white t-red br1 ml-8"
                style="width:95%;"
            >Error: {{ showError('Title') }}</div>

            <div class="t-white bold-4 font-6">SLUG :</div>
            <div
                ref="slugInput"
                @input="setSlug"
                class="Post_Title bg-white br4 p-5"
                contenteditable="true"
                placeholder="Enter Post Permalink"
            ></div>
        </div>

        <!-- editor -->
        <TextEditor
            id="main-ql-editor"
            @contentUpdated="setContent"
            :initialContent="contentToEdit ? contentToEdit.content : null"
            :config="editorConfig"
            :enableImage="true"
        ></TextEditor>
    </div>
</template>
<script lang="ts">
import { $Auth, $Posts } from '@/myStore'
import { $Process, $Notify, $Obstacle, $Validator, $General } from '@/plugins'

import { Component, Vue, Prop } from "vue-property-decorator"

@Component({
    components: {
        TextEditor: () => import('@/components/GlobalComponents/utils/TextEditor.vue')
    },
    // beforeRouteEnter(to, from, next) {
    // 	next(vm => {
    // 		if (to.query.mode === 'edit')				{
    // 			vm.$data.mode = to.query.mode
    // 		}
    // 	})
    // },

    computed: {
        user: () => $Auth.user,
        editorConfig: () => $Posts.$compose.editorConfig,
        /* These bellow only matter when editing or updating existing posts. Otherwise they'll be null */
        currentPost_id: () => $Posts.$compose.currentPost_id,
        contentToEdit: () => $Posts.$compose.contentToEdit,
    },
})

export default class Composer extends Vue {
    /* THIS COMPONENT IS USED FOR BOTH EDITING AND CREATING NEW POSTS. */
    user!: any
    currentPost_id!: string
    contentToEdit!: any /* object */

    $refs!: {
        titleInput: any
        slugInput: any
    }

    /* instance properties */
    // initialContent: string = this.contentToEdit.content || '' /* Only useful when editing existing post */
    title: string = ''
    slug: string = ''
    content: string = ''
    errors: object = null
    // mode: string = 'compose'

    /* lifecycle hooks */
    mounted () {
        if (this.contentToEdit)
        {
            this.title = this.$refs.titleInput.textContent = this.contentToEdit.title
            this.slug = this.$refs.slugInput.textContent = this.contentToEdit.slug
        }
    }

    /* instance methods */
    setTitle (e: any) {
        this.title = e.target.textContent
        if (this.errors)
        {
            this.errors[ 'Title' ] = ''
        }
    }
    setSlug (e: any) {
        this.slug = e.target.textContent
        if (this.errors)
        {
            this.errors[ 'Slug' ] = ''
        }
    }
    setContent (content: string) {
        this.content = content
    }

    showError (fieldName: string) {
        if (this.errors)
        {
            return this.errors[ 'Title' ]
        }
    }

    validate () {
        const schema = [
            {
                fieldName: 'Title',
                data: $Validator.sanitize(this.title),
                rules: {
                    required: true,
                    min: 10,
                    max: 100
                },
            },
            {
                fieldName: 'Slug',
                data: $Validator.sanitize(this.slug),
                rules: {
                    required: true,
                    min: 5,
                    max: 100
                },
            },
            {
                fieldName: 'Content',
                data: this.content,
                rules: {
                    required: true,
                },
            }
        ]
        return $Validator.validate(schema)
    }

    init () {
        if (this.validate())
        {
            $Obstacle.create('#saveBtn', {
                action: this.captureContentImages,
            })

        }
        this.errors = $Validator.getErrors()

        $Process.abort()

        if (this.errors[ 'Content' ])
        {
            $Notify.error(this.errors[ 'Content' ])
        }
        if (this.errors[ 'Slug' ])
        {
            $Notify.error(this.errors[ 'Slug' ])
        }
    }
    captureContentImages () {
        /* Before content is saved. convert all base64 image src to "file"... */
        $Process.add('Intializing...')
        const editor = document.getElementById('main-ql-editor')
        const fetchedImages = editor.getElementsByTagName('img')
        const uploadables = Array.prototype.filter.call(fetchedImages, function (img) {
            return img.src.match(/^data:/)
        })

        if (uploadables.length > 0)
        {
            // console.log(uploadables)
            let imageUrlArray: Array<string> = []
            $Process.add('Uploading Images...')
            let _this = this
            Array.prototype.forEach.call(uploadables, function (img: HTMLImageElement) {

                const canvas = document.createElement('canvas')
                canvas.width = img.width
                canvas.height = img.height
                const ctx = canvas.getContext('2d')
                ctx.drawImage(img, 0, 0, img.width, img.height)

                ctx.canvas.toBlob((blob) => {
                    const file = new File([ blob ], 'filename', {
                        type: "image/jpeg",
                    })
                    // console.log(file)
                    // imgArray.push(filename)
                    const formData = new FormData()
                    formData.append('contentImages', file)

                    $Posts.$compose.uploadImages(formData).then((data) => {
                        if (data)
                        {
                            // console.log(data)
                            const url = _this.$postBaseUrl + data.imageUrl  //${ this.user.id }/${ filename }.jpeg`		{
                            img.src = url
                            imageUrlArray.push(data.imageUrl)
                            // console.log(img)
                            if (imageUrlArray.length === uploadables.length)
                            {

                                _this.saveContent(imageUrlArray)
                            }
                        } else
                        {
                            imageUrlArray.length > 0 ? $Posts.$compose.removeImages(imageUrlArray) : null

                            $Process.abort()
                        }
                    })
                }, 'image/jpeg')
            })
        } else
        {
            $Process.add('Saving content...')
            this.saveContent()
        }

    }

    saveContent (contentImages?: any) {
        // console.log(contentImages)

        if (!this.currentPost_id)
        {
            $Posts.$compose.newPost({
                title: this.title,
                slug: this.slug.replace(/\s{2,}/g, ' ').split(' ').join('-').toLowerCase(),
                content: this.content,
                contentImages
            }).then(() => {
                $Obstacle.destroy('#saveBtn')
            })
        } else
        {
            $Posts.$compose.update({
                title: this.title,
                slug: this.slug.replace(/\s{2,}/g, ' ').split(' ').join('-').toLowerCase(),
                content: this.content,
                contentImages
            }).then(() => {
                $Obstacle.destroy('#saveBtn')
            })
        }

    }
    plainText (e: ClipboardEvent) {
        $General.pasteAsPlainText(e)
    }
}
</script>
<style lang="scss">
#main-ql-editor {
    & .ql-editor {
        min-height: 700px !important;
    }
}
.Post_Title_Container {
    border-radius: 5px 5px 0 0;
    background-color: $cyan--3;
}
.Post_Title {
    border: solid $cyan--3 4px;
}
</style>