<template>
	<div class="snippet-wrapper">
		<textarea @input="inputHandler" name="snippet" />
		<div class="snippet-actions">
			<button @click="addVariableHandler">Add variable</button>
		</div>
	</div>
</template>

<script>
	export default {

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
		margin: 1.5rem 0;
	}

	.snippet-actions {
		display: flex;
	}
</style>