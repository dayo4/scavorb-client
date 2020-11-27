<template>
    <Container ownID="MC-cntct">
        <h1 class="Head page-head-bg-grad text-center t-blue-grey py-8">Let's Get Things Done</h1>

        <!-- Contact Component -->
        <Contact></Contact>
    </Container>
</template>
<script lang="ts">
import Vue from "vue"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import Contact from '@/components/pages/Contact.vue'
import { $General } from '@/plugins'

export default Vue.extend({
    components: {
        Container,
        Contact
    },
    metaInfo () {
        return $General.metaInfo({ title: 'Reach out' })
    },
})
</script>
<style lang="scss" scoped>
.Head {
    font-family: /* "Courgette", */ cursive;
    letter-spacing: 1px;
}
</style>