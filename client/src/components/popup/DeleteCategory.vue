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
					this.$router.push(`/${this.$store.getters['getUser'].username}`)
				} catch(err) {
					console.log(err, 'ERROR IN DELETE CATEGORY');
				}
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