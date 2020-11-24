<template>
    <Container ownID="MC-ProfileView">
        <UpperSection />

        <LowerSection />
    </Container>
</template>
<script lang="ts">
import Container from '@/components/navs/reusables/Container.vue'

import UpperSection from "@/components/profile/UpperSection.vue"
import LowerSection from "@/components/profile/LowerSection.vue"
import Vue from "vue"
import { $Profile } from "@/myStore"

export default Vue.extend({
    components: {
        Container,
        UpperSection,
        LowerSection
    },

    watch: {
        $route () {
            $Profile.fetch({ username: this.$route.params.username as string }, true)
        }
    },
    // beforeRouteUpdate(to, from, next) {
    // 	this.$store.dispatch('profile/fetch', {
    // 		username: this.$route.params.username
    // 	}).then((loaded) => {
    // 		if (loaded)
    // 		{
    // 			next()
    // 		} else
    // 		{

    // 			// store.commit('global/loading', false)
    // 			next(false)
    // 		}
    // 	})
    // 	// next()
    // },
    // beforeRouteLeave(to, from, next) {
    // 	// const answer = window.confirm(
    // 	// 	"Do you really want to leave? you have unsaved changes!"
    // 	// );
    // 	// if (answer) {
    // 	// 	next();
    // 	// } else {
    // 	// 	next(false);
    // 	// }
    // },
})
</script>
<style lang="scss" scoped>
</style>