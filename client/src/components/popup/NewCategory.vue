<template>
	<div class="new-category">
		{{category_name}}
		<Input v-model="category_name" name="category_name" type="text" label="Enter a new category name" />
		<a @click="addCategoryHandler" href="#" title="Click here to add a new category with the name you provided." class="button --secondary">Add new category</a>
	</div>
</template>

<script>
import Input from '@/components/UI/Input.vue';
import { Eventbus } from '@/plugins/event-bus.js';

	export default {
		components: {
			Input
		},
		data() {
			return {
				category_name: null
			}
		},
		methods: {
			addCategoryHandler() {
				if(this.category_name !== null) {
					this.$store.dispatch('addCategoryHandler', this.category_name);
				} else {
					console.log(this.category_name, 'category is null...')
				}

				if(this.$parent.triggerPopup) {
					this.$helpers.triggerPopup(document.querySelector('[data-popup="new_category"]'));
					Eventbus.$emit('close-addbutton');
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.button {
		margin-top: 2rem;
	}
</style>