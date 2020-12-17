<template>
	<div class="new-category">
		<Input v-model="category_name" name="category_name" type="text" label="Enter a new category name" />
		<a @click="addCategoryHandler" href="#" title="Click here to add a new category with the name you provided." class="button --secondary">Add new category</a>
	</div>
</template>

<script>
import Input from '@/components/UI/Input.vue';
	export default {
		components: {
			Input
		},
		data() {
			return {
				category_name: null
			}
		},
		methods: {
			addCategoryHandler() {
				this.$store.dispatch('addCategoryHandler', this.category_name);
			}
		}
	}
</script>

<style lang='scss' scoped>
	.button {
		margin-top: 2rem;
	}
</style>