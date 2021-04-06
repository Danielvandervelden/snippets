<template>
	<div class="new-category">
		{{data}}
		Please fill in the below fields to update your snippet:
		<Input v-model="name" :value="name" name="snippet_name" type="text" label="Snippet name" />
		<CodeEditor edit v-model="content" :data="JSON.parse(this.data.content)" />
		<Select :selectedValue="this.category.toString()" :key="componentKey" v-model="category" name="category_select" label="Select what category to put the snippet in." :options="getCategories" />
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
		props: {
			data: Object
		},
		mounted() {
			this.name = this.data.name;
			this.content = this.data.content;
			this.category = this.data.category_id;
			this.id = this.data.id;
		},
		data() {
			return {
				componentKey: 0,
				name: '',
				content: '',
				category: '',
				id: ''
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
			},
			forceUpdate() {
				this.componentKey += 1;
			}
		}
	}
</script>
<style lang='scss' scoped>
</style>