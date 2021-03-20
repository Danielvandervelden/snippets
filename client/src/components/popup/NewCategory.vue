<template>
	<div class="new-category">
		<Input :key="componentKey" v-model="category_name" :value="category_name" name="category_name" type="text" label="Enter a new category name" />
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
				componentKey: 0,
				category_name: ''
			}
		},
		methods: {
			async addCategoryHandler() {
				const response = await this.$store.dispatch('addCategoryHandler', this.category_name);
				
				if(response) { this.forceUpdate() }

				if(this.$parent.triggerPopup) {
					this.$helpers.triggerPopup(document.querySelector('[data-popup="new_category"]'));
					Eventbus.$emit('close-addbutton');
				}
			},
			forceUpdate() {
				this.componentKey += 1;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.button {
		margin-top: 2rem;
	}
</style>