<template>
    <Container ownID="MC-Cnfmtn">
        <h1 class="text-center t-blue-grey">E-mail Verification</h1>

        <p
            v-if="success"
            class="icon-info bg-lime-4 t-green-1 p-3"
        >Your E-mail verification was successful, proceed to login</p>

        <p
            v-if="error"
            class="icon-info bg-lime-4 t-green-1 p-3"
        >Your E-mail verification token is expired or invalid</p>
    </Container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

// import { $Posts } from "@/myStore"
import { $Process, $Axios } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'

@Component({
    components: {
        Container,
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         if (to.params.token)
    //         {
    //             vm.$data.confirm()
    //         }
    //     })
    // },
})
export default class Cnfmtn extends Vue {
    success = false
    error = false

    mounted () {
        this.confirm()
    }

    async confirm () {
        try
        {
            const { data } = await $Axios.post("verifyEmail", {
                token: this.$route.params.token
            })
            if (data)
            {
                // console.log(data)
                this.success = true
            }
        }
        catch (e)
        {
            // console.log(e)
            this.error = false
        }
    }
}
</script>
