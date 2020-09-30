<template>
    <Modal :condition="fieldName" @close="close" @action="submit" RCB="icon-check-1">
        <!-- heading -->
        <template v-slot:heading>{{ header }}</template>

        <!-- body  template -->
        <template v-slot:default>
            <div v-show="error" class="font-3 p-2 mb-1 bg-white t-red br1">Error: {{error}}</div>
            <div
                @input="setContent"
                class="bg-white font-5 br2 p-7"
                contenteditable="true"
                :placeholder="'Enter ' + fieldName"
            ></div>
        </template>

        <!-- footer action btns-->
        <template v-slot:leftBtn>CANCEL</template>
        <template v-slot:rightBtn>SUBMIT</template>
    </Modal>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Modal from "@/components/GlobalComponents/utils/Modal.vue"
import { $InputModal, $Validator } from "@/plugins"
import { $Profile } from "@/myStore"

@Component({
    components: {
        Modal
    },
    computed: {
        header: () => $InputModal.header,
        validation: () => $InputModal.validation,
        fieldName: () => $InputModal.fieldName,
    }
})
export default class GblInput extends Vue {
    header
    validation
    fieldName

    error = ''
    content = ''

    close () {
        $InputModal.set({
            header: null,
            fieldName: null,
            type: null
        })
    }

    setContent (e) {
        this.content = e.target.textContent
        if (this.error)
        {
            this.error = ''
        }
    }

    validate () {
        const schema = [
            {
                fieldName: this.fieldName,
                data: this.content,
                rules: this.validation.rules
            }
        ]
        return $Validator.validate(schema)
    }
    submit () {
        if (this.validate())
        {
            $Profile.$status.updateStatus({ status: this.content }).then(done => {
                if (done) this.close()
            })
        }
        this.error = $Validator.getErrors({ format: 'single' })

    }
}
</script>