<template>
	<div id="add-button-wrapper">
		<a @click="addButtonPopupHandler" id="add-button" href="#" title="Add a new snippet or category">
			<span>+</span>
		</a>

		<div id="add-button-popup">
			<ul>
				<li @click="forceUpdate" class="new-category">
					<Popup move_to_body name="new_category" label="New category" title="Add a new category">
						<NewCategory :key="componentKey" />
					</Popup>
				</li>
				<li @click="forceUpdate" id="hover_snippet_info" class="new-snippet">
					<Popup move_to_body :class="getCategories ? '' : 'disabled'" name="new_snippet" label="New snippet" title="Add a new snippet">
						<NewSnippet :key="componentKey" />
					</Popup>
					<HoverInfo name="snippet_info" location="bottom" v-if="!getCategories">
						<span>Please create at least 1 category to put your snippet in.</span>
					</HoverInfo>
				</li>
			</ul>
		</div>
		</div>
</template>

<script>
import Popup from '@/components/UI/Popup.vue';
import NewCategory from '@/components/popup/Category/NewCategory.vue';
import NewSnippet from '@/components/popup/Snippet/NewSnippet.vue';
import HoverInfo from '@/components/UI/HoverInfo.vue';
import { Eventbus } from '@/plugins/event-bus.js';

	export default {
		data() {
			return {
				componentKey: 0,
				popupOpen: false
			}
		},
		mounted() {
			Eventbus.$on('close-addbutton', () => {
				this.closeAddButton();
			})
		},
		components: {
			NewCategory,
			NewSnippet,
			Popup,
			HoverInfo
		},
		computed: {
			getCategories() {
				return this.$store.getters['getCategories'].length
			}
		},
		methods: {
			closeAddButton() {
				this.popupOpen = false;
				this.$el.classList.remove('active');
			},
			addButtonPopupHandler(e) {
				if(e) {
					e.preventDefault();
				}
				if(!this.popupOpen) {
					this.popupOpen = true;
					this.$el.classList.add('active');
				} else {
					this.popupOpen = false;
					this.$el.classList.remove('active');
				}
			},
			forceUpdate() {
				this.componentKey += 1;
			}
		}
	}
</script>

<style lang='scss' scoped>
	#add-button-wrapper {
		position: fixed;
		z-index: 1;
		bottom: 30px;
		right: 30px;
	}

	#add-button {
		color: $green;
		background-color: $blue;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		transition: all .3s ease-in-out;

		span {
			font-size: 50px;
			font-weight: 700;
		}

		.active & {
			transform: rotate(135deg);
			background-color: $brown;
			color: $red;
		}
	}

	#add-button-popup {
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
		position: absolute; 
		right: -100%;
		bottom: 0;
		transform: scale(0);
		transition: all .3s ease-in-out;
		background-color: $blue;
		color: #FFF;
		border-radius: 10px;

		&:before {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border-style: solid;
			border-width: 0 30px 30px 0;
			border-color: transparent $blue transparent transparent;
			position: absolute;
			top: calc(100%);
			right: 10px;
		}

		::v-deep ul {
			list-style: none;
			padding: 10px;	
			margin: 0;

			li {
				transition: all .15s ease-in-out;
				
				&:first-of-type {
					border-radius: 10px 10px 0 0;
				}
				
				&:last-of-type {
					border-radius: 0 0 10px 10px;
				}

				.disabled a {
					pointer-events: none;
					color: $red;
				}

				&.new-snippet {
					position: relative;
				}
			}

			a {
				padding: 10px;
				display: block;
				white-space: nowrap;
				color: #FFF;
				text-decoration: none;

				&:hover {
					text-decoration: underline;
				}
			}
		}

		.active & {
			opacity: 1;
			pointer-events: auto;
			visibility: visible;
			right: 60%;
			bottom: calc(100% + 40px);
			transform: scale(1);
		}
	}
</style>