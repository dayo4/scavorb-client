<template>
    <!-- editor -->
    <VueEditor
        class="ql-editor"
        v-model="content"
        placeholder="Start typing your content..."
        :editorOptions="enableImage ? editorOptions : {}"
        :editorToolbar="config ? config : baseConfig"
    ></VueEditor>
</template>
<script lang="ts">
// import { $Auth, $Posts } from '@/myStore'
// import { $Process, $Notify, $Obstacle, $Validator } from '@/plugins'

import { defineComponent } from "vue"

import { VueEditor, Quill } from "vue2-editor"
import ImageResize from 'quill-image-resize'
import { ImageDrop } from 'quill-image-drop-module'

import { $General } from '@/plugins'

export default defineComponent({
    components: {
        VueEditor
    },
    props: {
        initialContent: { required: false, type: String },
        config: { required: false, type: Array },
        enableImage: { required: false, default: false, type: Boolean },
    },
    data () {
        return {
            content: '' as string | undefined
        }
    },
    watch: {
        content (val: string) {
            this.$emit('content-updated', val)
        }
    },
    computed: {

        editorOptions: () => {
            Quill.register('modules/imageDrop', ImageDrop)
            Quill.register('modules/imageResize', ImageResize)

            return {
                modules: {
                    imageDrop: true,
                    imageResize: { modules: [ 'Resize', 'DisplaySize', 'Toolbar' ] },
                    // handleStyles: {
                    //     backgroundColor: 'black',
                    //     border: 'none',
                    //     color: 'white'
                    // }
                }
            }
        },

        baseConfig: () => [
            [
                { header: [ false, 1, 2, 3, 4, 5, 6 ] }
            ],
            [
                { font: [] },
            ],
            [ "bold", "italic", "underline", "strike" ],
            [
                { align: "" },
                { align: "center" },
                { align: "right" },
                { align: "justify" }
            ],
            [ "blockquote", "code-block" ],
            [
                { script: "sub" },
                { script: "super" }
            ],
            [
                { list: "ordered" },
                { list: "bullet" },
                { list: "check" }
            ],
            [
                { indent: "-1" },
                { indent: "+1" }
            ],
            [
                { color: [] },
                { background: [] }
            ],
            [ "link", "video" ]
        ],

    },

    mounted () {
        this.content = this.initialContent
        const editor: HTMLElement = document.getElementsByClassName('ql-editor')[ 0 ] as any
        editor.addEventListener('paste', $General.pasteAsPlainText, false)
    }
})

</script>
<style lang="scss">
.ql-editor {
    & img {
        max-width: 100%;
    }
}
.ql-toolbar {
    background-color: $pink-5;
    border-radius: 5px 5px 0 0;
}
.quillWrapper > div:last-child {
    background-color: white;
    border-radius: 0 0 5px 5px;
}
.quillWrapper {
    background-color: $cyan--3;
    border-radius: 0 0 5px 5px;
}
</style>