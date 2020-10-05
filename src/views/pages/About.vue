<template>
    <Container ownID="MC-About">
        <div class="flex j-c-center pt-5 noselect">
            <div class="logo-base shadow-5">
                <span>
                    <span>
                        <b>S</b>
                    </span>
                    <span></span>
                </span>
                <span></span>
            </div>
        </div>
        <div class="Title text-center t-blue-grey">SCAVORB</div>

        <h1 class="Head text-center t-blue-grey font-8">JUST A LITTLE MORE ABOUT ME</h1>

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
                <div class="Ans br2 px-4 noselect" v-for="(ans, i) in QA.A" :key="i">
                    <div
                        class="Name flex nowrap a-i-center j-c-end text-right t-blue-grey bold-5 font-3 mt-10"
                    >
                        <div class="bg-grey-5 mr-2">Adedayo Adeniyi</div>
                    </div>
                    <div class="Body shadow-2 bg-grey-5 br3">
                        <div v-html="ans" class="p-4 pl-4"></div>

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
            Q: 'Hello, who are you?',
            A: [ `I am a fullstack web applications developer with a deep knowledge of UI/API design principles and overall business logic abstraction. Have a knack to want to know how the whole of a thing works and a drive to implement ideas in a genuine way yet minimalistic as possible. 
            But above all, i understand the need to deliver results. 
            I enjoy working both personally and in a team.
            `]
        },
        {
            Q: 'Great, what do you do?',
            A: [ `<p>You see, it is a dynamic and fast-changing world, everyone here and there is looking to create a customized virtual identity either for themselves or their businesses to boost their reach beyond their local environment. And when they do, they need someone who would do it to a high standard, engineered to their taste. This is where i come in!</p>
<p class="mb-1">From creating regular SEO responsive webpages to implementing complex business and functional ui logic for web technologies. I'm versed in presenting a genuine design and overall development services. In my time doing this, i've worked physically and remotely with a number of people building their projects.</p>
<p><b>What kind of website or web application do you need now?</b> Personal, for a hobby? for your business or vocation?.  Or you are a company/agency looking to hire more talents for your course. Or just need someone to work with your team part-time remotely in building your next big project. I'll be happy to get onboard in bringing your ideas to live.</p> 
<p>We can discuss the detail <a href="/contact" class="t-blue bg-grey-3 cursor-pointer br2 p-2 no-deco" target="_blank">here. Send me a message.</a></p>`
            ]
        },
        {
            Q: 'So you build Single Page web Applications(SPAs)',
            A: [ `<p>Yes! SPAs are web apps that give you a similar mobile apps experience on the web without the need to download and install on your device. Progressive, faster navigation, fully customized, and no boring loadings between pages...</p>

            <p>A good example is <span class="t-blue bg-grey-3 cursor-pointer br2 p-2 no-deco">scavorb.com</span> created from scratch by me, both frontend and backend in Javascript technologies.</p>
            <p>Unlike most traditional websites built on wordpress requiring mostly basic templates to setup and with , SPAs are most often custom built for your specific purpose and will have better overall user experience, without requiring too much more resources.<p>
            <p>Likewise i create wordpress websites if it's what you need. Whether personal or ecommerce websites.<p>
            `
            ]
        },
        {
            Q: 'Would you be available to work alongside our team on private projects?',
            A: [ `<p>Yes! Depending on the kind of project I can be available, if you send me the detail. 
            I've worked collaboratively with people. from creating app pages, designing UI, to building APIs. </p>
            <p>Whether you need me as your frontend developer or nodejs backend engineer, I'll be glad to join you in achieving your targets.<p>
            `
            ]
        },

    ]

}
</script>
<style lang="scss" scoped>
.Title {
    margin: 6px 0 40px 0;
    font-size: 16px;
    font-weight: bold;
}

.Head {
    margin-bottom: 30px;
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

/*     about: `loves exploring deeper the nature of things and experimenting with different strategies. A kind of deep analysis which had being quite a problem forever hamstringing me from putting things out there. But going into programming had recently given me a chance to get things done.
learning programming had recently helped me 
            The thought of moving ideas from conception to reality often hits me deep, quite relentless until a reasonable solution is derived. 
            Many run from it - it takes time and resource they claim. Well whats the purpose of time if not to lavish on what facinates you to be better?

        Deep knowledge of API design principles and best practices,
        I am a fullstack web developer who loves exploring deeper the nature of things and experimenting with different strategies. I enjoy engaging in intuitive conversations and visualization about the abstract design of nature and derive pleasure in driving the architecture of things towards perfection. 
        I'm often quite definite about missions, not relenting until a useful solution is delivered.`
 */