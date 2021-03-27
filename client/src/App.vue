<template>
	<router-view></router-view>
</template>

<script>
	export default {	
		mounted() {
			this.$store.dispatch('fetchCategories');
		}	
	}
</script>

<style lang='scss'>
	@import '@/styles/_base.scss';
</style>