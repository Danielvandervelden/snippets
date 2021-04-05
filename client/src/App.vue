<template>
	<router-view></router-view>
</template>

<script>
	export default {	
		mounted() {
			if(this.$store.getters['loggedIn']) {
				this.$store.dispatch('fetchCategories');
			}
		}	
	}
</script>

<style lang='scss'>
	@import '@/styles/_base.scss';
</style>