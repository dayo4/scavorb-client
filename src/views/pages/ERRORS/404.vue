<template>
    <div class="flex j-c-center text-center mt-10" style="margin-top: 50px;">
        <div class="notfound">
            <!-- <div class="notfound-404">
					<h1>Oops!</h1>
            </div>-->
            <h2 class="font-16">404 - Page not found</h2>
            <p>The page you are looking for could not be located!</p>
            <p>It may have been removed, had its name changed or is temporarily unavailable.</p>
            <div class="flex j-c-center">
                <button
                    @click="$router.push({path: '/'})"
                    class="icon-home btn cyan-gradient-btn m-3 font-7 p-5 br4"
                >Return Home!</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

@Component({
    // beforeRouteEnter(to, from, next) {
    // 	next(vm => {
    // 		vm.$data.preRouteQuery = to.query.data
    // 	})
    // }
})
export default class NotFound extends Vue {
    // preRouteQuery = null;
}
</script>
