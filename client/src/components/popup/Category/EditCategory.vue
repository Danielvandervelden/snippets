<template>
	<div>
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
				new_category_name: ''
			}
		},
		components: {
			Input
		},
		methods: {
			async editCategory(e) {
				if(e) {
					e.preventDefault();
					e.stopPropagation();
				}

				if(this.new_category_name !== '') {
					this.$parent.triggerPopup();
			
					try {
						const response = await this.$store.dispatch('editCategory', {
							id: this.$store.getters['getActiveCategory'].id,
							new_category_name: this.new_category_name
						});

						if(response.data.code === 200) {
							this.$router.push(`/${this.$store.getters['getUser'].username}/${this.$store.getters['getActiveCategory'].url}`);
						}
					} catch(err) {
						console.log(err, 'ERROR IN EDIT CATEGORY');
					}
				} else {
					this.$helpers.message(this.$el, 'Something went wrong when trying to change the category name, please try again.')
				}
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