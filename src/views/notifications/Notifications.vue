<template>
	<Container ownID="MC-Notif">
		<div class="MainView xs12 sm11 flex wrap j-c-center pl-4">
			<!-- All tabs go here -->
			<Plaform :activeTab="activeTab" />
			<System :activeTab="activeTab" />
		</div>

		<!-- Side Nav Component -->
		<VerticalNavigator :tabsList="tabsList" @tabClicked="switchActiveTab" :activeTab="activeTab" />
	</Container>
</template>
<script lang="ts">
	import { Component, Vue, Prop } from "vue-property-decorator"
	import { $ReadQueue, $Posts, $Comments, $Auth } from "@/myStore"
	import { WS, $Process } from "@/plugins"
	import VerticalNavigator from '@/components/navs/reusables/navigators/VerticalNavigator.vue'
	import Container from '@/components/navs/reusables/Container.vue'

	@Component({
		components: {
			VerticalNavigator,
			Container,
			Plaform: () => import(/* webpackChunkName: "minimizer" */ '@/components/notifications/tabs/Platform.vue'),
			System: () => import(/* webpackChunkName: "minimizer" */ '@/components/notifications/tabs/System.vue'),
			Dropdown: () => import(/* webpackChunkName: "dropdown" */ '@/components/GlobalComponents/utils/Dropdown.vue'),
			Comments: () => import(/* webpackChunkName: "comments" */"@/components/posts/comment/Comments.vue")
		},
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if (to.query.tab)
				{
					vm.$data.activeTab = to.query.tab
				}
				vm.$data.activeTab = 'Tab-1'
			})
		},
		computed: {
			user: () => $Auth.user,
		}
	})
	export default class Notifications extends Vue {

		activeTab = 'Tab-1'

		tabsList = [
			{ id: 1, name: 'Platform', icon: 'icon-user' },
			{ id: 2, name: 'System Notifications', icon: 'icon-doc-text' },
			{ id: 3, name: 'Settings', icon: 'icon-mail-alt' },
		]

		switchActiveTab(tab_id) {
			this.activeTab = 'Tab-' + tab_id
		}
	}
</script>
<style lang="scss" scoped>
.MainView {
	& .Tab {
		animation: fade 0.7s;
	}
}

@include xs-only {
	.MainView {
		padding-left: 6px;
		padding-right: 50px;
	}
}
</style>