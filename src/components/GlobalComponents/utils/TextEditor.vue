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

import { Component, Vue, Prop, Watch } from "vue-property-decorator"

import { VueEditor, Quill } from "vue2-editor"
import ImageResize from 'quill-image-resize'
import { ImageDrop } from 'quill-image-drop-module'

import { $General } from '@/plugins'

@Component({
    components: {
        VueEditor
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
})

export default class Composer extends Vue {
    @Prop({ required: false, type: String }) initialContent: string /* longtext */
    @Prop({ required: false, type: Array }) readonly config: any[]
    @Prop({ required: false, default: false, type: Boolean }) enableImage: boolean


    content: string = ''

    @Watch('content')
    updateContent () {
        this.$emit('contentUpdated', this.content)
    }

    mounted () {
        this.content = this.initialContent
        const editor = document.getElementsByClassName('ql-editor')[ 0 ]
        editor.addEventListener('paste', $General.pasteAsPlainText, false)
    }

}
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