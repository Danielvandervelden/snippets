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
			async $route (to) {
				console.log(to.params);
				if(to.params.category) {
					this.$store.commit('setActiveDashboard', 'category');
					this.$store.commit('setActiveCategory', this.$store.getters['getCategories'].find(cat => to.params.category === cat.url));
					await this.$store.dispatch('fetchSnippetsInCategory', this.$store.getters['getActiveCategory'].id);
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