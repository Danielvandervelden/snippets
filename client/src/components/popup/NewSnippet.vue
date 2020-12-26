<template>
	<div class="new-category">
		Please fill in the below fields to create a new snippet:
		<Input v-model="snippet_name" name="snippet_name" type="text" label="Snippet name" />
		<CodeEditor v-model="snippet_content" />
		<Select v-model="snippet_category" name="category_select" label="Select what category to put the snippet in." :options="getCategories" />
		<button @click="saveSnippetHandler">Save snippet</button>
	</div>
</template>

<script>
import Input from '@/components/UI/Input.vue';
import CodeEditor from '@/components/UI/CodeEditor.vue';
import Select from '@/components/UI/Select.vue';
	export default {
		components: {
			Input,
			Select,
			CodeEditor
		},
		data() {
			return {
				snippet_name: null,
				snippet_content: null,
				snippet_category: null
			}
		},
		computed: {
			getCategories() {
				return this.$store.getters['getCategories'].map(cat => cat.label);
			}
		},
		methods: {
			async saveSnippetHandler() {
				const response = await this.$store.dispatch('saveSnippetHandler', {
					snippet_name: this.snippet_name,
					snippet_content: JSON.stringify(this.snippet_content),
					snippet_category: this.snippet_category
				});

				console.log(response);
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>