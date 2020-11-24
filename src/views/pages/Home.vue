<template>
    <Container ownID="MC-Home bg-blue-grey--2">
        <div>
            <section class="Top flex col bg-img-masked noselect br1">
                <div class="Detail xs12 md8 noselect br1">
                    <div class="Intro text-center">
                        <div>SCAVORB</div>
                        <div>Full-stack Web Applications Development</div>
                    </div>
                    <div class="More">
                        <div>We create custom personal and business websites tailored to your needs.</div>
                        <ul>
                            UI Designs
                            <li>Have your website's UI professionally designed for maximum user experience.</li>
                        </ul>
                        <ul>
                            Single Page Applications(SPAs)
                            <li>Give your website a mobile app appearance and experience with fast page navigation.</li>
                        </ul>
                        <ul>
                            Ecommerce Development
                            <li>Render your products to the market with various e-commerce integrations.</li>
                        </ul>
                        <ul>
                            Back-end Development
                            <li>Deploy your apps with a fast back-end using powerful NodeJS frameworks.</li>
                        </ul>
                        <ul>
                            CMS Development
                            <li>Publish contents with great SEO using CMSs like Wordpress, Ghost, ...</li>
                        </ul>
                    </div>
                </div>

                <!-- image -->
                <div class="Img md4 hide-sm-down">
                    <img src="/defaults/pgs/r/a1.png" alt="intro-image" draggable="false" />
                </div>

                <!-- logo -->
                <div class="Logo flex j-c-center noselect">
                    <div class="logo-base logo-small logo-trans-2">
                        <span>
                            <span>
                                <b>S</b>
                            </span>
                            <span></span>
                        </span>
                        <span></span>
                    </div>
                </div>

                <div class="flex j-c-center">
                    <button
                        @click="callToAction"
                        class="btn pink-gradient-btn shadow-5 font-5 br4 py-7"
                    >START A PROJECT NOW</button>
                </div>
            </section>

            <div class="Divider">
                <span></span>
            </div>

            <div
                class="Quote"
            >Every person and every business deserves a virtual online profile that stands out, and We specialize in providing that.</div>

            <!-- <div v-for="(d, i) in dummy" :key="i">{{d}}</div> -->
            <section class="Section_2">
                <h2 class="text-center t-blue-grey--1">
                    <span class="icon-check-1 mr-3"></span>
                    <span>
                        Deliverables
                        <!-- <i class="font-2">What i offer</i> -->
                    </span>
                </h2>
                <div class="Tiles flex wrap j-c-center py-8">
                    <div class="flex col xs8 sm4 md3 shadow-3" v-for="(L, i) in list" :key="i">
                        <div class="noselect">
                            <img
                                :src="L.link ? L.link : '/defaults/pgs/icons/'+L.img+'.jpg'"
                                draggable="false"
                            />
                        </div>
                        <div>{{ L.text }}</div>
                        <div>{{ L.detail }}</div>
                    </div>
                </div>

                <button
                    @click="$router.push({name: 'about'})"
                    class="btn cyan-gradient-btn shadow-5 font-5 br4 mt-5 m-auto noselect"
                >
                    <span class="icon-right-big mr-3"></span>
                    <span>More About Scavorb</span>
                </button>
            </section>

            <div class="Divider">
                <span></span>
            </div>

            <div class="Quote">Meet Scavorb's creator and lead developer</div>

            <section>
                <h2 class="text-center t-blue-grey--1">
                    <!-- <span class="icon-chart-line-1 mr-3"></span> -->
                    <span>
                        Adedayo Adeniyi
                        <!-- <i class="font-2">Confident in my skills</i> -->
                    </span>
                </h2>
                <!-- <SkillChart></SkillChart> -->
                <div class="img-logo-border noselect"></div>
            </section>

            <div ref="contactCTA" class="Divider">
                <span></span>
            </div>

            <!-- <div>Industries We Serve</div> -->
            <!-- Flipper Component -->
            <!-- <Flipper></Flipper> -->
            <!-- Flipper Component -->
            <!-- <hr class="shadow-8" /> -->

            <h2 class="text-center t-blue-grey--1">
                <span class="icon-mail-alt mr-3"></span>
                <span>
                    Message Scavorb
                    <i class="font-3">Let's Get Things Done!</i>
                </span>
            </h2>
            <!-- Contact Component -->
            <Contact></Contact>
            <!-- Contact Component -->
        </div>
    </Container>
</template>
<script lang="ts">
import Vue from "vue"
// import { ghostAPI, postIndexFields, fdata } from "@/ghostContent"
// import { $Posts } from "@/myStore"
// import { $Axios } from "@/plugins"
import Container from '@/components/navs/reusables/Container.vue'
import Contact from '@/components/pages/Contact.vue'
import { $General } from '@/plugins'


// async function dd () {
//     const posts = await ghostAPI().posts.browse({
//         fields: postIndexFields
//     })
//     console.log(posts)
//     return posts
// }


export default Vue.extend({
    components: {
        Container,
        Contact,
    },

    metaInfo () {
        return $General.metaInfo('scavorb', null, 'https://www.scavorb.com/defaults/pgs/scavorb.jpg', '', 'website')
    },
    // computed: {
    //     dummy: () => fdata.tdata
    // },
    data () {
        return {
            list: [
                { img: 'resp', text: 'Fully Responsive Webpages', detail: "Designs at scavorb are expertly hand crafted, and you are delivered webpages that look and feel perfect on devices of various screen sizes." },
                { img: 'scale', text: 'Performant and Easily Scalable Apps', detail: "A successful web application should be reliable, well-planned and seemlessly accommodate growth. At scavorb, apps are designed to welcome subsequent growths without friction. And we technically avoid anything that can make our apps stuck in a hole." },
                { img: '', text: 'Concise and Readable Code', link: '/defaults/pgs/icons/clean.png', detail: "Everything that makes up your webpages' layout are structured in codes and are required to be easily understandale. At scavorb you can be rest assured." },
                { img: 'flexb', text: 'Flexible Business Logic Implementation' },
                { img: 'effect', text: 'Cost Effective Development Service', detail: "It is scavorb's uthmost priority to ensure that you get the right value for your cost." },
                { img: '', text: 'Genuine Design Customized To Your Need', link: '/defaults/logo/scavorb.png', detail: "Some people desire minimalist designs and layouts while others want it outright customized. Regardless of your requirement, scavorb is versed as presenting you with a design that simply stands out." },
            ],

            skills: [
                { text: 'JAVASCRIPT', value: 0.91, color: 'E57373' },
                { text: 'CSS & HTML', value: 0.93, color: '673ab7' },
                { text: 'TYPESCRIPT', value: 0.93, color: '42A5F5' },
                { text: 'VUEJS', value: 0.90, color: '4CAF50' },
                { text: 'NODEJS', value: 0.89, color: '8d6e63' },
                { text: 'UI DESIGN', value: 0.83, color: '4db6ac' },
                { text: 'GRAPHICS DESIGN', value: 0.7, color: '00bcd4' },
                // { text: 'PYTHON', value: 0.6, color: 'ba68c8' },
                { text: 'PHP', value: 0.65, color: '3f51b5' },
            ]

        }
    },
    methods: {
        callToAction () {
            (this.$refs.contactCTA as HTMLElement).scrollIntoView({ behavior: "smooth" })
        }
    }
})
</script>
<style lang="scss" scoped>
.Divider {
    display: flex;
    justify-content: center;
    margin: 60px 0px;
    & span {
        width: 50%;
        border-top: solid 5px $pink--4;
        border-bottom: solid 5px $cyan--4;
        box-shadow: $shadow-8;
        border-radius: 73%;
    }
}
.Quote {
    text-align: center;
    font-family: /* "Courgette", */ cursive;
    font-size: 30px;
    color: $pink-3;
    padding: 0 20px 10px 20px;
}

.Top {
    position: relative;
    min-height: 500px;
    width: 100%;
    padding-bottom: 20px;
    background-color: $blue-grey--3;
    background-image: url("/defaults/pgs/r/3.png");
    // filter: blur(3px);
    // -webkit-filter: blur(3px);
    & .Logo {
        position: absolute;
        z-index: 2;
        top: 15px;
        width: 66.66%;
    }
    &::after {
        background-color: rgba(72, 72, 72, 0.65);
    }
    & .Detail {
        z-index: 1;
        & .Intro {
            padding: 70px 0 0 0;
            & > div {
                letter-spacing: 1px;
                font-weight: bold;
            }
            & > div:nth-child(1) {
                color: rgba(204, 235, 238, 0.7);
                font-size: 35px;
            }
            & > div:nth-child(2) {
                font-family: /* "Courgette", */ cursive;
                color: $pink-5;
                font-size: 35px;
                margin-top: 25px;
            }
        }

        & .More {
            padding: 20px 0 0 0;
            letter-spacing: 1px;
            font-weight: bold;
            color: white;
            font-size: 16px;
            margin-left: 80px;

            & > ul {
                list-style: none;
                margin: 3px 0;
                padding: 5px 3px;
                background-color: rgba(0, 97, 100, 0.4);
                background: linear-gradient(
                    to right,
                    rgba(0, 131, 143, 0.4),
                    rgba(0, 97, 100, 0) 90%
                );
                border-radius: 4px;

                & li {
                    font-size: 13px;
                    font-weight: normal;
                    padding-left: 16px;
                }

                &::before {
                    content: "";
                    display: inline-block;
                    position: relative;
                    left: -15px;
                    width: 3px;
                    height: 10px;
                    border-top: 5px solid transparent;
                    border-bottom: 13px solid transparent;
                    border-right: 7px solid rgba(0, 131, 143, 0.65);
                    transform: rotateZ(55deg);
                }
            }
            & > div {
                font-family: "Courier New", Courier, monospace;
                color: $pink-3;
                margin-top: 18px;
                margin-left: -20px;
                padding-left: 10px;
                font-size: 28px;
                border-radius: 10px;
                border-left: solid 3px $pink-1;
                // -webkit-text-stroke: white 0.5px;
            }
        }
    }
    & .Img {
        //     z-index: 5;
        position: absolute;
        right: 0;
        top: 180px;
        height: 350px;
        & img {
            width: 100%;
            height: 100%;
        }
    }
    & button {
        margin-top: 40px;
        z-index: 2;
    }
}

.Section_2 {
    & .Tiles {
        & > div {
            width: 250px;
            min-height: 330px;
            // height: 400px;
            background-color: white;
            border-radius: 28px;
            margin: 0px 30px 30px 20px;
            border-top: solid 3px $cyan;
            border-bottom: solid 3px $cyan;
            & img {
                width: 90px;
                height: 90px;
            }

            & > div:first-child {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 150px;
            }
            & > div:nth-child(2) {
                padding: 2px 5px;
                text-align: center;
                font-weight: bold;
                font-size: 18px;
                color: $blue-grey;
            }
            & > div:last-child {
                padding: 10px 10px 15px 10px;
                text-align: center;
                font-weight: bold;
                font-size: 16px;
                color: $blue-grey-2;
            }
        }
    }
}

.SkillsWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
.Skills {
    overflow: hidden;
    height: 75px;
    margin: 20px 30px;
    border-bottom: solid 5px #ad1457;
    border-radius: 10px;
    & > div {
        position: relative;
        width: 150px;
        height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        overflow: hidden;
        background-color: none /* #00838f */;

        & > span:nth-child(1) {
            position: absolute;
            top: 10px;
            left: 10px;
            z-index: 2;
            border-radius: 50%;
            width: 130px;
            height: 130px;
            overflow: hidden;
            // background-color: #00838f;
            text-align: center;
            font-size: 12px;
            padding-top: 43px;
            color: white;

            & b {
                border: solid 1px;
                border-radius: 5px;
                border-bottom: none;
                padding: 1px 3px;
                letter-spacing: 0.5px;
            }
        }

        & span:nth-child(2) {
            position: absolute;
            // border-bottom: 5px solid red;
            // border-radius: 50%;
            // border-top-color: blue;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ad1457;
            background: linear-gradient(#ad1457 50%, white 50%);
        }
    }
}

@include sm-and-down {
    .Top {
        & .Logo {
            width: 100%;
        }
    }
}

@include xs-only {
    .Divider {
        & span {
            width: 70%;
        }
    }
    .Top {
        .Detail {
            & .Intro {
                & > div:nth-child(1) {
                    font-size: 26px;
                }
                & > div:nth-child(2) {
                    font-size: 28px;
                }
            }
            & .More {
                margin-left: 40px;
            }
        }
    }

    .Section_2 {
        & .Tiles {
            & > div {
                margin: 0px 8px 30px 8px;
            }
        }
    }
}
@include xxs-only {
    .Top {
        .Detail {
            // & .Intro {
            // & > div:nth-child(2) {
            // margin-top: 10px;
            // }
            // }
            & .More {
                margin-left: 20px;
                & > div:nth-child(1) {
                    margin-top: 3px;
                    font-size: 18px !important;
                }
            }
        }
    }
    .Section_2 {
        & .Tiles {
            & > div {
                flex: 0 0 91.66%;
                max-width: 91.66%;
            }
        }
    }
}
</style>