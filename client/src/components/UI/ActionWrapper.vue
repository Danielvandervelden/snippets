<template>
	<div class="action-wrapper">
			{{data}}
			<div class="action-wrapper__actions">
			<unicon @click="copySnippetHandler" class="copy-icon" name="copy" fill="#000"></unicon>
			<Popup move_to_body @click="forceUpdate" name="edit-snippet">
				<template v-slot:trigger><unicon class="edit-icon" name="pen" fill="#000"></unicon></template>
				<EditSnippet :key="componentKey" :data="data" />
			</Popup>
			<Popup move_to_body @click="forceUpdate" name="delete-snippet">
				<template v-slot:trigger><unicon class="delete-icon" name="trash-alt" fill="#000"></unicon></template>
				<DeleteSnippet :data="data" :key="componentKey" />
			</Popup>
			<span class="copy-text">Copied!</span>
		</div>
	</div>
</template>

<script>
	import Popup from '@/components/UI/Popup';
	import EditSnippet from '@/components/popup/Snippet/EditSnippet';
	import DeleteSnippet from '@/components/popup/Snippet/DeleteSnippet';
	export default {
		props: {
			data: Object
		},
		components: {
			Popup,
			EditSnippet,
			DeleteSnippet
		},
		data() {
			return {
				componentKey: 0
			}
		},
		methods: {
			copySnippetHandler(e) {
				e.preventDefault();
				e.stopPropagation();
				const textarea = e.currentTarget.querySelector('textarea');
				const wrapper = e.currentTarget;
				
				textarea.select();
				textarea.setSelectionRange(0, 999999);
				document.execCommand('copy');

				wrapper.classList.add('copied');

				setTimeout(() => { wrapper.classList.remove('copied') }, 1000)
			},
			forceUpdate() {
				this.componentKey += 1;
			}
		}
	}
</script>

<style lang='scss' scoped>
	.action-wrapper {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition: all .2s ease-in-out;
		display: flex;
		align-items: center;
		justify-content: center;

		&:before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: block;
			background-color: rgba(255, 255, 255, 0.3);
			transition: all .2s ease-in-out;
			opacity: 0;
			cursor: pointer;
		}

		&:hover,
		&:hover:before {
			opacity: 1;
		}

		&__actions {
			position: relative;
			z-index: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		[class*="icon"] {
			cursor: pointer;

			::v-deep svg {
				transition: all .2s ease-in-out;
			}
		}

		.delete-icon {
			&:hover ::v-deep svg {
				fill: $red;
			}
		}

		.edit-icon {
			&:hover ::v-deep svg {
				fill: $blue;
			}
		}

		.copy-icon {
			&:hover ::v-deep svg {
				fill: $purple;
			}
		}
	}

	.copy-text {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 3rem;
		opacity: 0;
		pointer-events: none;
		transition: all .2s ease-in-out;
	}
</style>