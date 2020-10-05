<template>
    <Container ownID="MC-Home bg-blue-grey--2">
        <section class="Top noselect br3">
            <div class="Intro">
                <div>Adedayo Adeniyi</div>
                <div>A Fullstack Web Applications Developer</div>
            </div>
            <div class="More">
                <div>I develop and implement custom web software solutions tailored to your needs.</div>
                <div>Frontend Development</div>
                <div>Backend Development</div>
                <div>UI Designs</div>
                <div>Single Page Applications(SPAs)</div>
                <div>Ecommerce Development</div>
                <div>Wordpress Development</div>
            </div>

            <div class="Img">
                <img src="/defaults/usr/me.jpg" alt="profile image" draggable="false" />
                <!-- <div class="Icon" @click="$router.push({path: '/profile/dayo'})"> -->
                <span
                    @click="$router.push({path: '/profile/dayo'})"
                    class="Icon b1 shadow-4"
                >View Profile</span>
                <!-- </div> -->
                <!-- <div class="Icon" @click="$router.push({path: '/profile/dayo'})">
                    <span class="flex a-i-center j-c-center">
                        <span class="icon-user"></span>
                    </span>
                    <span>View Profile</span>
                </div>-->
            </div>
        </section>

        <hr class="shadow-8" />
        <section class="Section_2">
            <h2 class="text-center t-blue-grey--1">
                <span class="icon-chart-line-1 mr-3"></span>
                <span>
                    Deliverables
                    <!-- <i class="font-2">Few</i> -->
                </span>
            </h2>
            <div class="Tiles flex wrap j-c-center py-8">
                <div class="shadow-3" v-for="(L, i) in list" :key="i">
                    <div>
                        <img
                            :src="L.link ? L.link : '/defaults/pgs/icons/'+L.img+'.jpg'"
                            draggable="false"
                        />
                    </div>
                    <div>{{ L.text }}</div>
                </div>
            </div>

            <button
                @click="$router.push({name: 'about'})"
                class="btn cyan-gradient-btn shadow-5 font-5 br4 mt-5 m-auto noselect"
            >
                <span class="icon-right-big mr-3"></span>
                <span>More Info</span>
            </button>
        </section>

        <hr class="shadow-8" />
        <section>
            <h2 class="text-center t-blue-grey--1">
                <span class="icon-chart-line-1 mr-3"></span>
                <span>
                    Skills Chart
                    <i class="font-2">Few</i>
                </span>
            </h2>
            <SkillChart></SkillChart>
        </section>
        <hr class="shadow-8" />
        <!-- Flipper Component -->
        <!-- <Flipper></Flipper> -->
        <!-- Flipper Component -->
        <!-- <hr class="shadow-8" /> -->

        <h2 class="text-center t-blue-grey--1">
            <span class="icon-mail-alt mr-3"></span>
            <span>
                Message Me
                <i class="font-3">I'm available</i>
            </span>
        </h2>
        <!-- Contact Component -->
        <Contact></Contact>
        <!-- Contact Component -->
    </Container>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"

// import { $Posts } from "@/myStore"
// import { $Notify, $Obstacle } from "@/plugins"

import Container from '@/components/navs/reusables/Container.vue'
// import Flipper from '@/components/pages/Flipper.vue'
import Contact from '@/components/pages/Contact.vue'
import SkillChart from '@/components/pages/SkillChart.vue'

@Component({
    components: {
        Container,
        // Flipper,
        Contact,
        SkillChart
    },
})
export default class Home extends Vue {

    list = [
        { img: 'resp', text: 'Fully Responsive Webpages' },
        { img: 'scale', text: 'Progressive and Easily Scalable Apps' },
        { img: 'clean', text: 'Clean and Readable Code' },
        { img: 'flexb', text: 'Flexible Business Logic Implementation' },
        { img: 'effect', text: 'Cost Effective Development Service' },
        { img: 'effect', text: 'Genuine Design Customized To Your Need', link: '/defaults/logo/scavorb.png' },
    ]
}
</script>
<style lang="scss" scoped>
.Top {
    position: relative;
    height: 500px;
    width: 100%;
    background-color: $blue-grey--3;
    // background-image: url("/defaults/pgs/cd.jpg");
    background-image: url("/defaults/pgs/prfcv1.jpg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // filter: blur(3px);
    // -webkit-filter: blur(3px);

    & .Intro {
        width: calc(100% - 160px);
        padding: 30px 0 0 20px;
        & > div {
            padding: 15px 6px;
            letter-spacing: 1px;
            font-weight: bold;
            border-radius: 28px;
            border-left: solid 5px $pink-1;
            text-shadow: 0 0 40px black, 0 0 30px black, 0 0 60px black;
        }
        & > div:nth-child(1) {
            color: $cyan-3;
            font-size: 28px;
            max-width: 260px;
        }
        & > div:nth-child(2) {
            color: $pink-5;
            font-size: 35px;
            margin-top: 30px;
            max-width: 700px;
        }
    }

    & .More {
        padding: 20px 0 0 0;
        letter-spacing: 1px;
        font-weight: bold;
        text-shadow: 0 0 20px black, 0 0 30px black, 0 0 60px black;
        color: white;
        font-size: 14px;
        margin-left: 80px;

        & > div {
            margin: 3px 0;
            &:not(:first-child):before {
                content: "";
                display: inline-block;
                position: relative;
                left: -15px;
                width: 3px;
                height: 10px;
                border-top: 5px solid transparent;
                border-bottom: 13px solid transparent;
                border-right: 7px solid $cyan--3;
                transform: rotateZ(55deg);
            }
        }
        & > div:nth-child(1) {
            // text-shadow: none;
            color: $pink-3;
            margin-left: -10px;
        }
    }

    & .Img {
        position: absolute;
        right: -27px;
        top: 90px;
        box-shadow: 0 0 20px $cyan;
        background-color: $cyan--4;
        background: linear-gradient(
            to right,
            $blue-grey-5 15%,
            $cyan--4 40%,
            $cyan 60%,
            $cyan--4 90%
        );
        border-radius: 50% 4% 4% 50%;
        width: 150px;
        height: 150px;
        & img {
            width: 150px;
            height: 150px;
            min-width: 150px;
            min-height: 150px;
            border-radius: 50% 4% 4% 50%;
            border: solid transparent 9px;
            transition: all 0.5s;
        }
        & .Icon {
            position: absolute;
            bottom: 57px;
            left: -40px;
            cursor: pointer;
            font-weight: bold;
            border-radius: 8px;
            color: $cyan--3;
            background-color: $blue-grey-5;
            transition: 0.4s;
            text-align: center;
            padding: 1px 5px;
            width: 60px;
            font-size: 14px;
            &:hover {
                background-color: $cyan--3;
                color: $blue-grey-5;
            }
            &:active {
                background-color: $cyan--1;
            }
        }
    }
}

.Section_2 {
    & .Tiles {
        & > div {
            width: 150px;
            height: 230px;
            background-color: white;
            border-radius: 28px;
            margin: 0px 30px 30px 20px;
            border-top: solid 3px $cyan;
            border-bottom: solid 3px $cyan;
            & img {
                width: 60%;
                height: 60%;
            }

            & > div:first-child {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 150px;
            }
            & > div:last-child {
                padding: 2px 5px;
                text-align: center;
                font-weight: bold;
                font-size: 18px;
                color: $blue-grey;
            }
        }
    }
}

@include xs-only {
    .Top {
        height: 600px;
        & .Intro {
            width: calc(100% - 120px);
            padding: 30px 0 0 2px;
            & > div:nth-child(1) {
                font-size: 26px;
            }
            & > div:nth-child(2) {
                font-size: 28px;
                margin-top: 10px;
                max-width: 700px;
            }
        }
        & .More {
            margin-left: 40px;
        }

        & .Img {
            width: 120px;
            height: 120px;
            & img {
                width: 120px;
                height: 120px;
                min-width: 120px;
                min-height: 120px;
                border: solid transparent 7px;
            }
            & .Icon {
                bottom: 40px;
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
</style>