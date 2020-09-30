<template>
    <div class="Footer bg-trans-4 pb-1" ref="Footer">
        <router-link to="/">
            <span class="icon-home"></span>
            <span>Home lllllllllllllllllllllllll</span>
        </router-link>
        <!-- <div @click="$router.back()">
			<span class="icon-left-open-big" :class="backable? 't-white' : 't-grey-1'"></span>
			<span>Back</span>
		</div>
		<div @click="$router.forward()">
			<span class="icon-right-open-big" :class="backable? 't-white' : 't-grey-1'"></span>
			<span>forward</span>
		</div>
		<div @click="scrollUp">
			<span class="icon-up-big" :class="!scrolled ? 't-grey--1':'t-white'"></span>
			<span>Scroll Up</span>
        </div>-->
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { $Navs } from '@/myStore'

@Component({
    // computed: {
    //     scrolled: () => $Navs.$container.scrolled,
    // },
})
export default class Footer extends Vue {

}
</script>
<style  lang="scss" scoped>
.Footer {
    width: 100%;
    display: flex;
    // & > * {
    // text-align: center;
    // margin-left: 10px;
    // & span {
    // 	transition: 0.5s;
    // }
    // & span:first-child {
    // 	display: block;
    // 	font-size: 25px;
    // }
    // & span:last-child {
    // 	color: white;
    // 	font-weight: bold;
    // 	display: block;
    // 	font-size: 8px;
    // }
    // }
}

// @include sm-and-down {
// 	.BottomNav {
// 		left: 31%;
// 	}
// }
// @include xs-only {
// 	.BottomNav {
// 		left: 27%;
// 	}
// }
</style>