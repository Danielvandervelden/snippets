<template>
	<div class="new-category">
		Please fill in the below fields to create a new snippet:
		<Input v-model="snippet_name" :value="snippet_name" name="snippet_name" type="text" label="Snippet name" />
		<CodeEditor create v-model="snippet_content" />
		<Select :key="componentKey" v-model="snippet_category" name="category_select" label="Select what category to put the snippet in." :options="getCategories" />
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
				componentKey: 0,
				snippet_name: '',
				snippet_content: '',
				snippet_category: ''
			}
		},
		computed: {
			getCategories() {
				return this.$store.getters['getCategories'].map(cat => {
					return { label: cat.label, value: cat.id}
				});
			}
		},
		methods: {
			async saveSnippetHandler() {
				const response = await this.$store.dispatch('saveSnippetHandler', {
					snippet_name: this.snippet_name,
					snippet_content: JSON.stringify(this.snippet_content),
					snippet_category: this.snippet_category
				});

				if(response.data.code === 200) {
					this.$parent.triggerPopup();
				}

				this.$store.dispatch('fetchSnippetsInCategory', this.$store.getters['getActiveCategory'].id);
			},
			forceUpdate() {
				this.componentKey += 1;
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>