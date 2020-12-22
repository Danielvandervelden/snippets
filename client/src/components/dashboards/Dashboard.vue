<template>
	<div id="dashboard">
		<component :is="`dashboard-${getActiveDashboard}`"></component>
	</div>
</template>

<script>
	import Main from './views/User';
	import UserCategory from './views/Category';

	export default {
		components: {
			'dashboard-user': Main,
			'dashboard-category': UserCategory
		},
		watch: {
			$route (to) {
				if(to.params.category) {
					this.$store.commit('setActiveDashboard', 'category');
				} else {
					this.$store.commit('setActiveDashboard', 'user');
				}
			}
		},
		computed: {
			getActiveDashboard() {
				return this.$store.getters['getActiveDashboard'];
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>