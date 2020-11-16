<template>
    <div class="Tab xs12">
        <h2 class="text-center t-blue-grey--1">System Settings</h2>

        <input type="checkbox" id="n" v-model="allowReg" />
        <label for="n">Allow new user registeration</label>

        <button @click="saveChanges" class="bg-pink--3 mt-10 btn">Save Settings</button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

import { $Admin, $Auth } from '@/myStore'
import { $Confirm } from '@/plugins'

export default defineComponent({

    data () {
        return {
            allowReg: null as boolean
        }
    },

    computed: {
        isSAdmin: (): boolean => $Auth.isSAdmin,
        settings: () => $Auth.sysSettings
    },

    methods: {
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
    },

    mounted () {
        this.allowReg = this.settings.allow_new_reg
    }
})

</script>
<style lang="scss" scoped>
input[type="checkbox"] {
    height: 15px;
    margin-right: 10px;
}
</style>