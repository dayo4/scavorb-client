<template>
    <Modal :condition="show" @close="close" @action="submit" :minHeight="200" RCB="icon-check-1">
        <!-- heading -->
        <template v-slot:heading>Change Account Status</template>

        <!-- body  template -->
        <template v-slot:default>
            <!-- DROPDOWN COMPONENT-->
            <Dropdown
                :ownID="user.id"
                :text="action ? action : 'Choose An Action'"
                :pos="{top:0, right: 0}"
                class="Dropdomn icon-down-open btn t-white bg-trans-3 font-6 p-4"
            >
                <!-- slots -->
                <template v-slot:default>
                    <a v-if="!user.active">
                        <span @click="setAction('Activate')">Activate</span>
                    </a>
                    <a v-if="user.active">
                        <span @click="setAction('Deactivate')">Deactivate</span>
                    </a>
                    <a v-if="!user.blacklisted">
                        <span @click="setAction('Blacklist')">Blacklist</span>
                    </a>
                    <a v-if="user.blacklisted">
                        <span @click="setAction('Unblacklist')">Unblacklist</span>
                    </a>
                </template>
            </Dropdown>
            <h4 class="t-grey font-5 bold-4 mb-0 mt-3">Enter a Reason for the action:</h4>
            <div v-show="error" class="font-3 p-2 mb-1 bg-white t-red br1">Error: {{error}}</div>
            <div
                @input="setReason"
                class="bg-white font-5 br2 p-7"
                contenteditable="true"
                placeholder="Enter your reason"
                style="min-height: 145px; border-left: solid grey 2px;"
            ></div>
        </template>
    </Modal>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import Modal from "@/components/GlobalComponents/utils/Modal.vue"
import { $Admin, $Auth } from "@/myStore"
import { $Confirm, $Validator } from "@/plugins"

@Component({
    components: {
        Modal,
        Dropdown: () => import('@/components/GlobalComponents/utils/Dropdown.vue'),
    }
})
export default class DisableAcc extends Vue {
    @Prop({ required: true }) show: boolean
    @Prop({ required: true }) readonly user: any

    error = ''
    reason: string = ''
    action: string = ''

    close (refresh?: boolean) {
        this.$emit('close', refresh ? true : '')
        this.action = ''
        this.reason = ''
    }

    setReason (e) {
        this.reason = e.target.textContent
        if (this.error)
        {
            this.error = ''
        }
    }
    setAction (v: string) {
        this.action = v
    }

    validate () {
        const schema = [
            {
                fieldName: 'Reason',
                data: this.reason,
                rules: {
                    required: true,
                    string: true,
                    min: 20,
                    max: 500,
                },
            },
            {
                fieldName: 'Action',
                data: this.action,
                rules: {
                    required: true,
                    string: true,
                },
            }
        ]
        return $Validator.validate(schema)
    }
    submit () {
        let _this = this
        const payload = {
            user_id: this.user.id,
            actor_id: $Auth.user.id,
            action: this.action,
            reason: this.reason
        }

        if (this.validate())
        {
            $Confirm({
                header: 'Confirm your action',
                message: `<b class="t-grey--2">Are You Sure You Want To ${this.action} This Account?</b>`,
                type: 'info',
                onConfirm: function () {
                    return $Admin.$users.changeStatus(payload).then(data => {
                        if (data)
                        {
                            _this.close(true)
                            return data
                        }
                    })
                }

            })
        }
        this.error = $Validator.getErrors({ format: 'single' })
    }
}
</script>