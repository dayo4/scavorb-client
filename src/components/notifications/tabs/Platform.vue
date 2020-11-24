<template>
    <div v-show="activeTab === 'Tab-1'" class="Tab xs12 sm11 lg10">
        <h2 class="text-center t-blue-grey--1">Notifications</h2>
    </div>
</template>
<script lang="ts">
// import Vue from "vue"
import { $Auth, $Profile } from '@/myStore'
import { $Confirm } from '@/plugins'

// export default Vue.extend({
//     computed: {
//         userData: () => $Auth.userData
//     },
// })
// export default class Platform extends Vue {
//     @Prop({ required: true, type: String }) readonly activeTab: string
// }
</script>