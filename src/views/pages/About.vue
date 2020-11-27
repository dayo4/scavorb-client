<template>
    <Container ownID="MC-About">
        <div class="flex j-c-center pt-5 noselect">
            <div class="logo-base logo-static shadow-5">
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

        <h1
            class="Head text-center page-head-bg-grad t-blue-grey font-9 px-5 py-8"
        >A LITTLE MORE INFO</h1>

        <section class="flex j-c-center wrap">
            <section v-for="(QA, i) in QueAns" :key="i" class="xs12 sm10 md9 mb-10">
                <!-- Question -->
                <div class="Ques br2 px-4 noselect">
                    <div class="Name flex nowrap a-i-center text-left t-blue-grey bold-5 font-3">
                        <div class="bg-blue-grey-5">Anonymous</div>
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

                        <span
                            @click="$router.push({path: '/profile/dayo'})"
                            class="Img bg-img-masked-0 br5"
                        >
                            <img class="br5 noselect" src="/defaults/usr/me.jpg" draggable="false" />
                        </span>
                    </div>
                </div>
            </section>
        </section>

        <section>
            <div class="page-head-bg-grad text-center p-10 mt-10 br2 font-5">
                Care for more enquiries? Feel free to get in touch. Or if you are ready to start your project, use the button below
                <div class="flex j-c-center mt-10 mb-2">
                    <button
                        @click="$router.push({path: '/contact'})"
                        class="btn pink-gradient-btn shadow-5 br4 py-7"
                    >START A PROJECT</button>
                </div>
            </div>
        </section>

        <section class="dddddddd">
            <div>
                <img src="/defaults/pgs/r/hg/5.png" />
            </div>
            <!-- <div>
                <img src="/defaults/pgs/r/hg/6.png" />
            </div>-->
            <div>
                <img src="/defaults/pgs/r/hg/2.png" />
            </div>
            <div>
                <img src="/defaults/pgs/r/hg/3.png" />
            </div>
            <div>
                <img src="/defaults/pgs/r/hg/4.png" />
            </div>
            <div>
                <img src="/defaults/pgs/r/hg/1.png" />
            </div>
        </section>
    </Container>
</template>
<script lang="ts">
import Vue from "vue"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
import { $General } from '@/plugins'

export default Vue.extend({
    components: {
        Container,
    },
    metaInfo () {
        return $General.metaInfo({ title: 'scavorb - info' })
    },

    data () {
        return {
            QueAns: [
                {
                    Q: 'Hello, who are you?',
                    A: [ `Hi there, I am the lead developer at scavorb. A full-stack developer with a deep knowledge of UI and API design principles. At Scavorb we render websites design, web applications development and consulting services. We are specialised delivering professional, custom and result-oriented web development services while also providing objective guidance to help solve complex business challenges.
            `]
                },
                {
                    Q: 'Great, how can you be of service?',
                    A: [ `<p>You see, it is a dynamic and fast-changing world, everyone here and there is looking to create a customized virtual identity either for themselves or their businesses to boost their reach beyond their local environment. And when they do, they need someone who would do it to a high standard, engineered to their taste. This is where we come in!</p>
            <p>Everyone and every business deserves a virtual online profile that stands out, and we specialize in providing that.</p>
<p class="mb-1">From creating regular SEO responsive webpages to implementing complex business and functional ui logic for web technologies. We are versed in presenting a genuine design and overall development services. In our time doing this, we've worked physically and remotely with a number of people building their projects.</p>
<p><b>What kind of website or web application do you need now?</b> Personal, for a hobby? for your business or vocation?. Or just need someone to work with you in building your next big project. We'll be happy to get onboard in bringing your ideas to live.</p> 
<p>We can discuss the detail <a href="/contact" class="t-blue bg-grey-3 cursor-pointer br2 p-2 no-deco" target="_blank">here. Send a message.</a></p>`
                    ]
                },
                {
                    Q: 'So you build Single Page web Applications(SPAs)',
                    A: [ `<p>Yes! SPAs are web apps that give you a similar mobile apps experience on the web without the need to download and install on your device. Progressive, faster navigation, fully customized, and no boring loadings between pages...</p>

            <p>Among others built, a good example is <span class="t-blue bg-grey-3 cursor-pointer br2 p-2 no-deco">scavorb.com</span>.</p>
            <p>Unlike most traditional websites setup on wordpress and the likes, SPAs are most often more custom built for your specific purpose and will have better overall user experience, without requiring much more resources.<p>
            <p>Likewise we create wordpress websites if it's what you need, and there are ways to still take advantage of it's CMS functionalities in SPAs. Whether personal or ecommerce websites.<p>
            `
                    ]
                },
                //     {
                //         Q: 'Would you be available to work alongside our team on private projects?',
                //         A: [ `<p>Yes! Depending on the kind of project I can be available, if you send me the detail. 
                // I've worked collaboratively with people. from creating app pages, designing UI, to building APIs. </p>
                // <p>Whether you need me as your frontend developer or nodejs backend engineer, I'll be glad to join you in achieving your targets.<p>
                // `
                //         ]
                //     },

            ]

        }
    },
})

</script>
<style lang="scss" scoped>
.Title {
    margin: 6px 0 40px 0;
    font-size: 16px;
    font-weight: bold;
}

.Head {
    font-family: /* "Courgette", */ cursive;
    letter-spacing: 1px;
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

.dddddddd {
    height: 700px;
    position: relative;

    & > div {
        position: absolute;
        & img {
            // height: 600px;
        }
    }

    & > div:nth-child(1) {
        left: 100px;
        bottom: 20px;
        transform: rotateZ(-10deg) rotateY(40deg) rotateX(45deg);
    }
    & > div:nth-child(2) {
        left: 100px;
        bottom: 200px;
        transform: rotateZ(-10deg) rotateY(40deg) rotateX(45deg);
    }
    & > div:nth-child(3) {
        left: 150px;
        bottom: 200px;
        transform: rotateZ(-10deg) rotateY(40deg) rotateX(45deg);
    }
    & > div:nth-child(4) {
        left: 200px;
        bottom: 300px;
        transform: rotateZ(-10deg) rotateY(40deg) rotateX(45deg);
    }
    & > div:nth-child(5) {
        left: 300px;
        bottom: 400px;
        transform: rotateZ(-10deg) rotateY(40deg) rotateX(45deg)
            translateX(-100px) translateY(280px);
    }
    // & > div:nth-child(6) {
    //     left: 400px;
    //     bottom: 450px;
    //     transform: rotateZ(-10deg) rotateY(40deg) rotateX(45deg)
    //         translateX(-100px) translateY(250px);
    // }
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
