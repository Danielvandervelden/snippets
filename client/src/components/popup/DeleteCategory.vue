<template>
	<div>
		<span>Are you sure you want to delete this category?</span>
		<div class="button-wrapper">
			<a @click="closePopup" class="button --secondary" href="#">No</a>
			<a @click="deleteCategory" class="button --primary" href="#">Yes</a>
		</div>
	</div>
</template>

<script>
	export default {
		methods: {
			closePopup() {
				this.$parent.triggerPopup();
			},

			async deleteCategory() {
				this.closePopup();

				try {
					await this.$store.dispatch('deleteCategory', this.$store.getters['getActiveCategory']);
					this.$store.dispatch('fetchCategories');
					this.$router.push(`/${this.$store.getters['getUser']}`)
				} catch(err) {
					console.log(err);
				}
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>