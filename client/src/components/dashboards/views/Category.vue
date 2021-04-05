<template>
	<div>
		<header>
			<h1 v-html="getActiveCategory.label" />
			<Popup @click="forceUpdate" move_to_body="true" name="edit_category" title="Click here to edit the category.">
				<template v-slot:trigger>
					<unicon name="pen" fill="#000000"></unicon>
				</template>
				<EditCategory :key="componentKey" />
			</Popup>
			<Popup move_to_body="true" name="delete_category" title="Click here to delete this category.">
				<template v-slot:trigger>
					<unicon name="trash-alt" fill="#D1495B"></unicon>
				</template>
				<DeleteCategory />
			</Popup>
		</header>
		<main>
			<Snippet :key="snippet.id" v-for="snippet in getSnippetsInCurrentCategory" :data="snippet" />
		</main>
	</div>
</template>

<script>
	import Popup from '@/components/UI/Popup';
	import DeleteCategory from '@/components/popup/DeleteCategory';
	import EditCategory from '@/components/popup/EditCategory';
	import Snippet from '@/components/UI/Snippet';

	export default {
		data() {
			return {
				componentKey: 0
			}
		},
		components: {
			Popup,
			DeleteCategory,
			EditCategory,
			Snippet
		},
		computed: {
			getActiveCategory() {
				return this.$store.getters['getActiveCategory'];
			},
			getSnippetsInCurrentCategory() {
				return this.$store.getters['getSnippetsInCurrentCategory'];
			}
		},
		async mounted() {
			await this.$store.dispatch('fetchSnippetsInCategory', this.$store.getters['getActiveCategory'].id);
		},
		methods: {
			forceUpdate() {
				this.componentKey += 1;
			}
		}
	}
</script>

<style lang='scss' scoped>	
	header {
		display: flex;
		align-items: center;

		h1 {
			flex-grow: 1;
			margin: 0;
		}
	}

	main {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40px;

		@media screen and (max-width: $max_break_tablet) {
			.snippet {
				@include flex(100%, 0, 0);

				+.snippet {
					margin-top: 20px;
				}
			}
		}

		@media screen and (min-width: $break_tablet) {
			.snippet {
				@include flex(calc(50% - 20px), 0, 0);

				&:nth-child(even) {
					margin-left: 20px;
				}

				&:nth-child(n+3) {
					margin-top: 20px;
				}
			}
		}
	}
</style>