<template>
    <Container ownID="MC-cntct">
        <h1 class="Head text-center t-blue-grey">Let's Work Together</h1>

        <!-- Contact Component -->
        <Contact></Contact>
    </Container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import Contact from '@/components/pages/Contact.vue'

@Component({
    components: {
        Container,
        Contact
    },
})
export default class About extends Vue {

}
</script>
<style lang="scss" scoped>
.Head {
    font-family: "Courgette", cursive;
    letter-spacing: 1px;
}
</style>