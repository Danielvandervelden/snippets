<template>
	<main>
		<Navigation />
		<AddButton />
	</main>
</template>

<script>
import Navigation from '@/components/header/Navigation.vue';
import AddButton from '@/components/UI/AddButton.vue';
	export default {
		components: {
			Navigation,
			AddButton
		}
	}
</script>

<style lang='scss' scoped>

</style>