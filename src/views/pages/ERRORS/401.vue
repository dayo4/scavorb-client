<template>
    <div class="flex j-c-center mt-10" style="margin-top: 50px;">
        <div class="text-center">
            <!-- <div class="notfound-404">
					<h1>Oops!</h1>
            </div>-->
            <h1 class="font-16">401 - Unauthorized Access!</h1>
            <!-- <p>You may have to login again to verify your access to this resource.</p> -->
            <p>Sorry, You are not authorized to access this resource.</p>

            <div class="flex j-c-center">
                <button
                    @click="$router.push({path: '/'})"
                    class="icon-home btn cyan-gradient-btn m-3 font-7 p-5 br4"
                >Return Home!</button>
                <button
                    @click="relogin"
                    class="btn cyan-gradient-btn icon-login my-3 font-7 p-5 br4"
                >{{isUser ? 'Login Again!' : 'Login' }}</button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import Vue from "vue"
import { $Auth } from "@/myStore"

export default Vue.extend({
    // beforeRouteEnter(to, from, next) {
    // 	next(vm => {
    // 		vm.$data.preRouteQuery = to.query.data
    // 	})
    // }
    computed: {
        isUser: () => $Auth.isUser,
    },

    methods: {

        relogin () {
            $Auth.$form.logout()
            $Auth.$form.show()
        }
    }
})
</script>
