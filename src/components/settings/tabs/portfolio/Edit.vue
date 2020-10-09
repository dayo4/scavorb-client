<template>
    <div>
        <h2 class="text-center t-blue-grey--1">{{projectToView ? 'EDIT' :'NEW' }} PORTFOLIO PROJECT</h2>

        <h3 class="flex a-i-center shadow-1 j-c-between bg-pink-1 t-white font-7 p-2 noselect br2">
            <span class="font-5">{{projectToView ? 'EDIT PROJECT' :'CREATE NEW' }}</span>
            <div class="Actions flex">
                <div class="labeled-action" @click="$emit('back')">
                    <span class="icon-left-open-big font-10"></span>
                    <span>Back</span>
                </div>
            </div>
        </h3>

        <!-- STATUS -->
        <section v-if="projectToView">
            <h3 class="Header">CHANGE STATUS</h3>
            <span
                class="icon-info bg-blue-5 p-3"
            >Only active projects will be visible in your profile. New projects are "Active" by default.</span>

            <Dropdown
                ownID="id"
                :text="active ? 'Active' : 'Inactive'"
                :pos="{type: 'relative',top:0, right: 0}"
                class="Dropdomn icon-down-open btn t-white bg-trans-3 font-6 p-4 mt-4"
            >
                <!-- slots -->
                <template v-slot:default>
                    <a>
                        <span @click="changeStatus(1)">Active</span>
                    </a>
                    <a>
                        <span @click="changeStatus(0)">Inactive</span>
                    </a>
                </template>
            </Dropdown>
        </section>

        <!-- TITLE -->
        <section>
            <h3 class="Header">PROJECT/WORK TITLE</h3>
            <span v-if="errors && errors['Title']" class="t-red p-1 my-1">{{errors['Title']}}</span>
            <div
                ref="titleInput"
                @input="setTitle"
                v-on:paste="plainText"
                class="bg-white br4 p-5"
                contenteditable="true"
                placeholder="Enter Post Title"
            ></div>
        </section>

        <!-- DETAIL -->
        <section>
            <h3 class="Header">PROJECT/WORK DETAILS</h3>
            <div
                class="icon-info bg-blue-5 p-3 mb-2"
            >Full detail of the project or work experience. You can edit or design as much as you want taking advantage of the editor. You can embed link to videos but images will be discarded.</div>
            <span v-if="errors && errors['Detail']" class="t-red p-1 my-1">{{errors['Detail']}}</span>
            <!-- editor -->
            <TextEditor @contentUpdated="setDetail" :initialContent="initialDetail"></TextEditor>
            <div class="p-3">Count:{{charCount}}</div>
        </section>

        <!-- Save all changes -->
        <div class="flex j-c-between">
            <div class="flex">
                <button @click="saveChanges" class="bg-pink--3 mt-4 mr-5 btn">Save Project</button>
                <button @click="$emit('back')" class="bg-cyan--3 mt-4 btn">Back</button>
            </div>
            <button
                v-if="projectToView"
                @click="deleteProject(projectToView.id)"
                class="bg-red--3 mt-4 mr-5 btn"
            >Delete Project</button>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import { $Auth, $Profile } from '@/myStore'
import { $Confirm, $Validator, $General } from '@/plugins'

@Component({
    components: {
        TextEditor: () => import('@/components/GlobalComponents/utils/TextEditor.vue'),
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
    },

    computed: {
        editorConfig: () => $Profile.$Portfolio.editorConfig,
    },
})
export default class PtfEdit extends Vue {
    @Prop({ required: false, type: Object }) readonly projectToView: any

    $refs!: {
        titleInput
    }
    initialDetail: string = this.projectToView ? this.projectToView.detail : '' /* Only useful when viewing existing project detail */
    title = ''
    detail = ''
    active: number = null /* project active status. 0 or 1 */

    charCount = 0

    errors: object = null /* Records validation errors  */

    /* LC Hook */
    mounted () {
        if (this.projectToView)
        {
            this.active = this.projectToView.active
            this.title = this.$refs.titleInput.textContent = this.projectToView.title
        }
    }

    /* Instance Methods */
    setTitle (e: any) {
        this.title = e.target.textContent
        if (this.errors)
        {
            this.errors[ 'Title' ] = ''
        }
    }

    setDetail (content: string) {
        this.detail = content
        this.charCount = content.length
        if (this.errors)
        {
            this.errors[ 'Detail' ] = ''
        }
    }

    validate () {
        const schema = [
            {
                fieldName: 'Title',
                data: $Validator.sanitize(this.title),
                rules: {
                    required: true,
                    string: true,
                    min: 3,
                    max: 100
                },
            },
            {
                fieldName: 'Detail',
                data: this.detail,
                rules: {
                    required: true,
                    min: 100,
                    // max: 2000
                },
            }
        ]
        return $Validator.validate(schema)
    }
    saveChanges () {

        if (this.validate())
        {
            if (!this.projectToView)
            {
                $Profile.$Portfolio.create({
                    title: this.title,
                    detail: this.detail
                }).then(done => {
                    if (done)
                        this.$emit('back', true /* To refresh list upon completed */)
                })
            } else
            {
                $Profile.$Portfolio.update({
                    id: this.projectToView.id,
                    title: this.title,
                    detail: this.detail,
                    active: this.active
                }).then(done => {
                    if (done)
                        this.$emit('back', true)
                })
            }
        }
        this.errors = $Validator.getErrors()
    }

    changeStatus (status: number /* 1=true, 0=false */) {
        this.active = status
    }
    deleteProject (project_id) {
        let _this = this
        $Confirm({
            header: 'Delete Project',
            message: `<b class="t-grey--2">Are You Sure You Want To delete this Project?</b>`,
            type: 'danger',
            onConfirm: function () {
                return new Promise(function (resolve) {
                    $Profile.$Portfolio.delete(project_id).then(data => {
                        if (data)
                        {
                            _this.$emit('back', true /* To refresh list upon deletion */)
                            resolve(data)
                        }
                    })
                })
            }

        })
    }

    plainText (e: ClipboardEvent) {
        $General.pasteAsPlainText(e)
    }
}

</script>
<style lang="scss" scoped>
.Header {
    font-size: 14px;
    color: $blue-grey-1;
    border-top: solid 1.5px;
    border-bottom: solid 1.5px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
}

div[contenteditable="true"] {
    max-height: 250px;
}
div[contenteditable="true"],
input {
    border: solid 2px rgba(128, 128, 128, 0.591);
    border-radius: 4px;
    padding: 5px;
}

section {
    margin-bottom: 35px;
}
</style>