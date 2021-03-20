<template>
	<div>
		<header>
			<h1 v-html="getActiveCategory.label"></h1>
			<Popup name="delete_category" title="Click here to delete this category.">
				<template v-slot:trigger>
					<unicon name="trash-alt" fill="#D1495B"></unicon>
				</template>
				<DeleteCategory />
			</Popup>
		</header>
	</div>
</template>

<script>
	import Popup from '@/components/UI/Popup';
	import DeleteCategory from '@/components/popup/DeleteCategory';
	export default {
		components: {
			Popup,
			DeleteCategory
		},
		computed: {
			getActiveCategory() {
				return this.$store.getters['getActiveCategory'];
			}
		}	
	}
</script>

<style lang='scss' scoped>
	.button-wrapper {
		display: flex;
		justify-content: space-between;
		margin: 1rem 0 0 0;

		a + a {
			margin-left: 1rem;
		}
	}
</style>