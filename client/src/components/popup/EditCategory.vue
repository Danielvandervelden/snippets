<template>
	<div :key="componentKey">
		{{new_category_name}}
		<h4>What would you like to rename the category to?</h4>
		<Input v-model="new_category_name" :value="new_category_name" name="new_category_name" type="text" label="New category name" />
		<div class="button-wrapper">
			<a @click="editCategory" href="#" class="button --primary">Save</a>
		</div>
	</div>
</template>

<script>
	import Input from '@/components/UI/Input';
	export default {
		data() {
			return {
				new_category_name: '',
				componentKey: 0
			}
		},
		components: {
			Input
		},
		methods: {
			async editCategory() {
				this.$parent.triggerPopup();

				try {
					await this.$store.dispatch('editCategory', {
						id: this.$store.getters['getActiveCategory'].id,
						new_category_name: this.new_category_name
					});
					
					this.$store.dispatch('fetchCategories');
					this.forceUpdate();

				} catch(err) {
					console.log(err);
				}
			},
			forceUpdate() {
				this.componentKey += 1;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.button-wrapper {
		display: flex;
		justify-content: flex-end;
		margin: 2rem 0 0 0;
	}
</style>