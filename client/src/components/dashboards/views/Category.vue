<template>
	<div>
		<header>
			<h1 v-html="getActiveCategory.label"></h1>
			<Popup name="delete_category" title="Click here to delete this category.">
				<template v-slot:trigger>
					<unicon name="trash-alt" fill="#D1495B"></unicon>
				</template>
				<div>
					Are you sure you want to delete this category?
					<a @click="deleteCategory" class="button --primary" href="#">Yes</a>
					<a @click="closePopup" class="button --secondary" href="#">No</a>
				</div>
			</Popup>
		</header>
	</div>
</template>

<script>
	import Popup from '@/components/UI/Popup';
	export default {
		components: {
			Popup
		},
		computed: {
			getActiveCategory() {
				return this.$store.getters['getActiveCategory'];
			}
		},
		methods: {
			closePopup() {
				this.$helpers.triggerPopup(document.querySelector('[data-popup="delete_category"]'))
			},

			async deleteCategory() {
				this.closePopup();

				try {
					/* eslint-disable-next-line */
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