<template>
	<!-- The user has to specify the view of the code editor. There's: create, edit or view. They have slightly different options. -->
	<span v-if="!create && !edit && !view">You have to either specify if the view of the code editor is: create, edit or view</span>

	<!-- The view for "create" -->
	<div v-else-if="create" class="snippet-wrapper create">
		<textarea @input="inputHandler" :value="data" name="snippet" />
		<div class="snippet-actions">
			<button @click="addVariableHandler">Add variable</button>
		</div>
	</div>

	<div v-else-if="view" class="snippet-wrapper view">
		<textarea readonly :value="data" name="snippet" />
	</div>

	<div v-else-if="edit" class="snippet-wrapper edit">
		<textarea @input="inputHandler" :value="data" name="snippet" />
		<div class="snippet-actions">
			<button @click="addVariableHandler">Add variable</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "code-editor",
		props: {
			data: String,
			create: {
				type: Boolean,
				defaultValue: false
			},
			edit: {
				type: Boolean,
				defaultValue: false
			},
			view: {
				type: Boolean,
				defaultValue: false
			}
		},
		methods: {
			addVariableHandler() {
				const textarea = this.$el.querySelector('textarea');

				const value = textarea.value;

				textarea.value = value + '${variable_name}';
			},
			
			inputHandler(e) {
				this.$emit('input', e.target.value);
			}
		}
	}
</script>

<style lang='scss' scoped>
	textarea {
		width: 100%;
		border-radius: 4px;
		min-height: 200px;
		border: 1px solid #A1A1A1;
		padding: 7px 10px 0px;
		font-size: 1.6rem;
		resize: none;
	}

	.snippet-actions {
		display: flex;
	}

	.snippet-wrapper.view {
		position: relative;
		margin: 1.5rem 0 0;
		
		textarea {
			cursor: pointer;
		}
	}
</style>