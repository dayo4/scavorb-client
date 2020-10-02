<template>
    <Modal :condition="show" @close="close" @action="clear" RCB="icon-trash-empty">
        <!-- heading -->
        <template v-slot:heading>Your Reading Queue ({{ queue ? queue.length : 0}})</template>

        <!-- body  template -->
        <template v-slot:default>
            <section v-show="queue">
                <div
                    v-for="item in queue"
                    :key="item.id"
                    @click.stop="$router.push({path:'/posts/'+item.slug})"
                    class="Post flex a-i-center pr-4"
                >
                    <div class="PostImage flex a-i-center">
                        <img :src="item.image" draggable="false" />
                    </div>
                    <div class="Details my-1 mx-3">
                        <h5 class="m-0 font-3">{{ item.title }}</h5>
                        <!-- <p class="m-0 font-2 bold-3 t-grey">Channel Name</p> -->
                    </div>
                    <span
                        @click.stop="remove(item.id)"
                        class="icon-trash-empty t-red--2 bg-trans-1 shadow-3 font-4 br1 p-2"
                    ></span>
                </div>
            </section>
            <section v-show="!queue || queue.length === 0" class="text-center">
                <h3 class="t-grey--2">Your queue is empty.</h3>
                <p
                    class="t-grey--4"
                >Use the "Add to queue" option on posts to queue up your favourite contents for viewing later.</p>
                <div class="flex j-c-center">
                    <button class="btn" @click="goToPosts">View Posts</button>
                </div>
            </section>
        </template>

        <!-- footer action btns-->
        <template v-slot:rightBtn>Clear All</template>
    </Modal>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Modal from "@/components/GlobalComponents/utils/Modal.vue"
import { $ReadQueue } from "@/myStore"

@Component({
    components: {
        Modal
    },
    computed: {
        show: () => $ReadQueue.status,
        queue: () => $ReadQueue.queue,
    }
})
export default class GlobalNotification extends Vue {


    close () {
        $ReadQueue.hide()
    }

    remove (id) {
        $ReadQueue.remove(id)
    }

    clear () {
        $ReadQueue.clear()
    }

    goToPosts () {
        this.$router.push({ path: '/posts' })
        this.close()
    }

}
</script>
<style lang="scss" scoped>
.Post {
    position: relative;
    border-bottom: grey 1px solid;
    margin-bottom: 2px;
    &:hover {
        background-color: rgb(223, 220, 220);
        cursor: pointer;
    }
    & span {
        /* delete icon */
        position: absolute;
        right: -5px;
        top: 0;
    }
}
.PostImage {
    min-width: 80px;
    width: 80px;
    height: 60px;
    & img {
        max-width: 100%;
        max-height: 100%;
    }
}
</style>