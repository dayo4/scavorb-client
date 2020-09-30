<template>
    <Container ownID="MC-Srv">
        <div class="Srv">
            <h1 class="text-center t-blue-grey">SERVICES I OFFER</h1>

            <section class="flex j-c-center wrap">
                <section v-for="(QA, i) in QueAns" :key="i" class="xs12 sm10 md9 mb-10">
                    <!-- Question -->
                    <div class="Ques br2 px-4 noselect">
                        <div
                            class="Name flex nowrap a-i-center text-left t-blue-grey bold-5 font-3"
                        >
                            <div class="bg-blue-grey-5">Anonymous X</div>
                        </div>
                        <div class="bg-blue-grey-5 shadow-4 br3">
                            <div class="Title t-blue-grey bold-4 p-4">{{ QA.Q }}</div>
                            <span class="Img br5">
                                <img class="br5" src="/defaults/anon.jpg" draggable="false" />
                            </span>
                        </div>
                    </div>

                    <!-- Answer -->
                    <div class="Ans br2 px-4">
                        <div
                            class="Name flex nowrap a-i-center j-c-end text-right t-blue-grey bold-5 font-3"
                        >
                            <div class="bg-grey-5 mr-2">Adney Myles</div>
                        </div>
                        <div class="shadow-2 bg-grey-5 br3">
                            <!--Content Minimizer Component -->
                            <Minimizer :initialHeight="120">
                                <div class="CommentContent p-2">{{ QA.A }}</div>
                            </Minimizer>

                            <span class="Img br5">
                                <img
                                    class="br5 noselect"
                                    src="/defaults/anon.jpg"
                                    draggable="false"
                                />
                            </span>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    </Container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'

@Component({
    components: {
        Container,
    },
})
export default class About extends Vue {

    services = [
        {
            H: '',
            B: ''
        },
    ]
}
</script>
<style lang="scss" scoped>
.Srv {
    // background-color: rgb(45, 45, 45);
    background-image: url("/defaults/pgs/p5.png");
    background-position: center;
    background-repeat: repeat;
    // background-size: cover;
}

/* Question & Answer Styling*/
.Ques,
.Ans {
    position: relative;

    & .Img {
        position: absolute;
        top: -18px;
        border: solid 3px rgba(128, 128, 128, 0.476);
        height: 50px;
        width: 50px;
        & img {
            width: 100%;
            height: 100%;
        }
    }
}

.Ques {
    margin: 25px 70px 15px 5px;
    & .Name {
        & > div {
            padding: 4px 4px 4px 46px;
            margin-left: 4px;
            width: 84%;
            border-top: solid currentColor 0.5px;
            border-radius: 0 50px 0 0;
        }
    }

    & .Img {
        left: -2px;
    }
}

.Ans {
    margin: 5px 5px 5px 50px;
    & .Name {
        & > div {
            padding: 4px 46px 4px 4px;
            margin-right: 4px;
            border-radius: 50px 0 0 0;
            width: 84%;
            border-top: solid currentColor 0.5px;
        }
    }

    & .Img {
        right: -4px;
    }
}

@include xs-only {
    .Ques {
        margin-right: 35px;
    }
    .Ans {
        margin-left: 35px;
    }
}
</style>