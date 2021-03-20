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

	<div v-else-if="view" @click="copySnippetHandler" class="snippet-wrapper view">
		<unicon class="copy-icon" name="copy" fill="#000"></unicon>
		<span class="copy-text">Copied!</span>
		<textarea readonly @input="inputHandler" :value="data" name="snippet" />
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
			copySnippetHandler(e) {
				const textarea = e.currentTarget.querySelector('textarea');
				const wrapper = e.currentTarget;
				
				textarea.select();
				textarea.setSelectionRange(0, 999999);
				document.execCommand('copy');

				wrapper.classList.add('copied');

				setTimeout(() => { wrapper.classList.remove('copied') }, 1000)
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
		margin: 1.5rem 0 0;
		resize: none;
	}

	.snippet-actions {
		display: flex;
	}

	.snippet-wrapper.view {
		position: relative;
		
		textarea {
			cursor: pointer;
		}

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			height: 100%;
			background-color: rgba(255, 255, 255, .4);
			opacity: 0;
			pointer-events: none;
			transition: all .15s ease-in-out;
		}

		.copy-icon,
		.copy-text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			font-size: 3rem;
			opacity: 0;
			pointer-events: none;
			transition: all .15s ease-in-out;
		}

		&:hover {
			&:before {
				opacity: 1;
			}

			.copy-icon {
				opacity: 1;
			}
		}

		&.copied {
			.copy-icon {
				opacity: 0;
			}

			.copy-text {
				opacity: 1;
			}
		}
	}
</style>