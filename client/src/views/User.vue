<template>
	<main>
		<Navigation />
		<AddButton />
		<Dashboard />
	</main>
</template>

<script>
import Navigation from '@/components/header/Navigation.vue';
import AddButton from '@/components/UI/AddButton.vue';
import Dashboard from '@/components/dashboards/Dashboard.vue';
	export default {
		components: {
			Navigation,
			AddButton,
			Dashboard
		}
	}
</script>

<style lang='scss' scoped>

</style>