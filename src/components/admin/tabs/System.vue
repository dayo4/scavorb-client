<template>
    <div class="Tab xs12">
        <h2 class="text-center t-blue-grey--1">System Settings</h2>

        <input type="checkbox" id="n" v-model="allowReg" />
        <label for="n">Allow new user registeration</label>

        <button @click="saveChanges" class="bg-pink--3 mt-10 btn">Save Settings</button>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"

import { $Admin, $Auth } from '@/myStore'
import { $Notify, $Confirm } from '@/plugins'

@Component({
    computed: {
        isSAdmin: () => $Auth.isSAdmin,
        settings: () => $Auth.sysSettings
    },
})
export default class SystemSettings extends Vue {

    settings!: any
    isSAdmin!: boolean

    allowReg: boolean = null

    mounted () {
        this.allowReg = this.settings.allow_new_reg
    }

    saveChanges () {
        let _this = this
        if (this.isSAdmin)
            $Confirm({
                header: 'Save Settings',
                message: `<b>Confirm?</b>`,
                type: 'info',
                onConfirm: function () {
                    return $Admin.$system.update({
                        allow_new_reg: _this.allowReg
                    }).then(done => {
                        if (done)
                        {
                            $Auth.getSysSettings()
                            return done
                        }
                    })
                }

            })
    }
}
</script>
<style lang="scss" scoped>
input[type="checkbox"] {
    height: 15px;
    margin-right: 10px;
}
</style>