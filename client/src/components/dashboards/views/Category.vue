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
		<main>
			<Snippet :key="snippet.id" v-for="snippet in getSnippetsInCurrentCategory" :data="snippet" />
		</main>
	</div>
</template>

<script>
	import Popup from '@/components/UI/Popup';
	import DeleteCategory from '@/components/popup/DeleteCategory';
	import Snippet from '@/components/UI/Snippet';

	export default {
		components: {
			Popup,
			DeleteCategory,
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
	
	main {
		display: flex;
		flex-wrap: wrap;
		margin-top: 40px;

		@media screen and (max-width: $max_break_desktop) {
			.snippet {
				@include flex(100%, 0, 0);

				+.snippet {
					margin-top: 20px;
				}
			}
		}

		@media screen and (min-width: $break_desktop) {
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