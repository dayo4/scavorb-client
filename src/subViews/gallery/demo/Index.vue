<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator"

import { $General } from '@/plugins'


export default class Demo extends Vue {

    // created () {
    //     $General.appMode = 2
    // }
}

</script>