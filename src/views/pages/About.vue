<template>
    <Container ownID="MC-About">
        <div class="flex j-c-center">
            <div class="Logo bg-pink--2"></div>
        </div>
        <h1 class="text-center t-blue-grey">MY OWN SYMBOL</h1>

        <section class="flex j-c-center wrap">
            <section v-for="(QA, i) in QueAns" :key="i" class="xs12 sm10 md9 mb-10">
                <!-- Question -->
                <div class="Ques br2 px-4 noselect">
                    <div class="Name flex nowrap a-i-center text-left t-blue-grey bold-5 font-3">
                        <div class="bg-blue-grey-5">Anonymous X</div>
                    </div>
                    <div class="Body bg-blue-grey-5 shadow-4 br3">
                        <div class="t-blue-grey bold-4 p-4">{{ QA.Q }}</div>
                        <span class="Img br5">
                            <img class="br5" src="/defaults/usr/a.jpg" draggable="false" />
                        </span>
                    </div>
                </div>

                <!-- Answer -->
                <div class="Ans br2 px-4 noselect">
                    <div
                        class="Name flex nowrap a-i-center j-c-end text-right t-blue-grey bold-5 font-3"
                    >
                        <div class="bg-grey-5 mr-2">Adedayo Adeniyi</div>
                    </div>
                    <div class="Body shadow-2 bg-grey-5 br3">
                        <div v-html="QA.A" class="p-2 pl-4"></div>

                        <span @click="$router.push({path: '/profile/dayo'})" class="Img br5">
                            <img class="br5 noselect" src="/defaults/usr/me.jpg" draggable="false" />
                        </span>
                    </div>
                </div>
            </section>
        </section>
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
    // metaInfo () {
    //     return {
    //         // title
    //     }
    // }
})
export default class About extends Vue {

    QueAns = [
        {
            Q: 'Who are you and what do you do?',
            A: `I am a fullstack web applications developer with a drive to implement ideas in a genuine way yet minimalistic as possible. 
            The thought of moving ideas from conception to reality often hits me deep, quite relentless until a reasonable solution is derived. 
            Many run from it - it takes time and resource they claim. Well whats the purpose of time if not to lavish on what facinates you to be better?
            But above all, i understand the need to deliver results.
<p>It is a dynamic and fast-changing world, everyone here and there is looking to create a customized virtual identity either for themselves or their businesses to boost their reach beyond their local environment. And when they do, they need someone who would do it to a high standard. That's me!</p>
<p class="mb-1">From creating regular SEO responsive webpages to implementing complex business and functional ui logic for web technologies. I'm versed in presenting a genuine design and overall development services. As i've done with a number of startups building their projects.</p>
<p><b>What kind of website or web application do you need now?</b> Personal, for a hobby? for your business or vocation?. Or just need someone to work with your team part-time remotely in building your next big project.</p>
<p>We can discuss the detail <a href="/contact" class="t-blue bg-grey-3 cursor-pointer br2 p-2 no-deco" target="_blank">here. Send me a message.</p>`
        },
        // <p class="pt-1">In my time doing this, i've worked physically and remotely with a number of startup</p>
        {
            Q: 'Do you build Single Page web Applications(SPAs)',
            A: `<p>Yes! SPAs are web apps that give you a similar mobile apps experience on the web without the need to download and install on your device. Progressive, faster navigation, fully customized, and no loading between pages...</p>

            <p>A good example is <a href="/" class="t-blue bg-grey-3 cursor-pointer br2 p-2 no-deco" target="_blank">myownsymbol.com<a> created from scratch by me, both frontend and backend in Javascript technologies.</p>
            <p>Unlike most websites built on wordpress requiring mostly basic templates to setup, SPAs are most often custom built for your specific purpose and will have better overall user experience, without requiring too much more resources.<p>
            `
        },
        {
            Q: 'A question for the developer about the services rendered to the client?',
            A: 'A Response by the developer about the services rendered to the client?'
        },
    ]

    about: `
        Deep knowledge of API design principles and best practices,
        I enjoy engaging in intuitive conversations and visualization about the abstract design of nature and derive pleasure in driving the architecture of things towards perfection. 
        But i'm also definite about my missions, often not relenting until a useful solution is delivered.
    `
}
</script>
<style lang="scss" scoped>
.Logo {
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 50%;

    &::before,
    &::after {
        content: "";
        position: absolute;
        top: 47%;
        height: 4px;
        width: 65px;
        background-color: $pink--2;
    }

    &::before {
        left: -70px;
    }
    &::after {
        right: -70px;
    }
}

/* Question & Answer Styling*/
.Ques,
.Ans {
    position: relative;

    & .Img {
        position: absolute;
        top: -18px;
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
    & .Img {
        background-color: $cyan--2;
        border: solid 3px $cyan--2 /* rgba(128, 128, 128, 0.476) */;
    }
    & .Name {
        & > div {
            padding: 4px 4px 4px 46px;
            margin-left: 4px;
            width: 84%;
            border-top: solid currentColor 0.5px;
            border-radius: 0 50px 0 0;
        }
    }
    & .Body {
        border-bottom: solid $cyan--2 3px;
    }
    & .Img {
        left: -2px;
    }
}

.Ans {
    margin: 5px 5px 5px 50px;
    & .Img {
        background-color: $pink--2;
        border: solid 3px $pink--2;
        cursor: pointer;
    }
    & .Name {
        & > div {
            padding: 4px 46px 4px 4px;
            margin-right: 4px;
            border-radius: 50px 0 0 0;
            width: 84%;
            border-top: solid $pink--2 0.5px;
        }
    }
    & .Body {
        border-bottom: solid $pink--2 3px;
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