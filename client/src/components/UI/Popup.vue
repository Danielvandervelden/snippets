<template>
	<div>
		<a v-if="label" @click="triggerPopup" :title="title" :data-trigger="name" href="#">{{label}}</a>
		<a v-if="triggerSlot" @click="triggerPopup" :title="title" :data-trigger="name" href="#"><slot name="trigger" /></a>
		<aside :data-popup="name" class="popup">
			<div class="popup-wrapper">
				<slot />
			</div>
		</aside>
	</div>
</template>

<script>
	export default {
		props: ['name', 'label', 'title', 'move_to_body'],
		mounted() {
			/* Add an event listener to close the popup on a click on the before */
			this.$el.querySelector('.popup').addEventListener('click', e => {
				if(!this.$helpers.parent(e.target, '.popup-wrapper')) {
					this.triggerPopup(e.currentTarget.getAttribute('id'));
				}
			});

			if(this.move_to_body === "true") {
				document.body.appendChild(this.$el.querySelector('.popup'));
			}
		},
		methods: {
			triggerPopup() {
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