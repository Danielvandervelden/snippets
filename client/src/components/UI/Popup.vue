<template>
	<div>
		<a v-if="label" @click="triggerPopup" :title="title" :data-trigger="name" href="#">{{label}}</a>
		<a v-if="triggerSlot" @click="triggerPopup" :title="title" :data-trigger="name" href="#"><slot name="trigger" /></a>
		<aside :data-popup="name" class="popup">
			<div class="popup-wrapper">
				<slot />
				<a class="close-popup" href="#" @click="triggerPopup"><unicon name="times" fill="red" /></a>
			</div>
		</aside>
	</div>
</template>

<script>
	export default {
		props: {
			name: String,
			label: String,
			title: String,
			move_to_body: {
				type: Boolean,
				defaultValue: false
			}
		},
		mounted() {
			/* Add an event listener to close the popup on a click on the before */
			this.$el.querySelector('.popup').addEventListener('click', e => {
				if(!this.$helpers.parent(e.target, '.popup-wrapper')) {
					this.triggerPopup(e.currentTarget.getAttribute('id'));
				}
			});

			if(this.move_to_body) {
				document.body.appendChild(this.$el.querySelector('.popup'));
			}
		},
		methods: {
			triggerPopup(e) {
				if(e) {
					e.preventDefault();
					e.stopPropagation();
				}
				this.$emit('click', e);
				const popup = document.querySelector(`[data-popup="${this.name}"]`);
				popup.classList.toggle('popup-active');
			}
		},
		computed: {
			triggerSlot() {
				return this.$slots['trigger'];
			}
		}
	}
</script>

<style lang='scss' scoped>
	
</style>