<template>
	<div class="BottomNav bg-trans-4 pb-1" ref="bottomNav">
		<router-link to="/">
			<span class="icon-home" :class="homeRoute ? 't-grey--1' : 't-white'"></span>
			<span>Home</span>
		</router-link>
		<div @click="$router.back()">
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
		</div>
	</div>
</template>
<script lang="ts">
	import { Component, Vue, Watch } from "vue-property-decorator"
	import { $Navs } from '@/myStore'

	@Component({
		computed: {
			scrolled: () => $Navs.$container.scrolled,
		},
	})
	export default class BottomNav extends Vue {
		// scrolled!: boolean
		$refs!: {
			bottomNav: HTMLElement
		}
		homeRoute = true
		backable = true
		forwardable = true

		@Watch('$route')
		routeChanged() {
			if (this.$route.path === '/')
				this.homeRoute = true
			else
				this.homeRoute = false

			if (history.length > 0)
				this.backable = true
			else
				this.backable = false

		}

		mounted() {
			$Navs.$bottom.element = this.$refs.bottomNav
		}

		scrollUp() {
			if ($Navs.$container.scrolled)
				$Navs.$container.element.scrollTo({ top: 0, left: 0, behavior: "smooth" })
		}
	}
</script>
<style  lang="scss" scoped>
.BottomNav {
	position: fixed;
	bottom: 0;
	left: 50%;
	z-index: 7;
	margin-left: -110px;
	border-radius: 20px 20px 0 0;
	display: flex;
	& > * {
		text-align: center;
		margin-left: 10px;
		margin-right: 10px;
		cursor: pointer;
		& span {
			transition: 0.5s;
		}
		& span:first-child {
			display: block;
			font-size: 25px;
		}
		& span:last-child {
			color: white;
			font-weight: bold;
			display: block;
			font-size: 8px;
		}
	}
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