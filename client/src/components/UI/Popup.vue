<template>
	<div>
		<a @click="triggerPopup" :title="title" :data-trigger="name" href="#">{{label}}</a>
		<aside :data-popup="name" class="popup">
			<div class="popup-wrapper">
				<slot />
			</div>
		</aside>
	</div>
</template>

<script>
	export default {
		props: ['name', 'label', 'title'],
		mounted() {
			/* Add an event listener to close the popup on a click on the before */
			this.$el.querySelector('.popup').addEventListener('click', e => {
				if(!this.$helpers.parent(e.target, '.popup-wrapper')) {
					this.triggerPopup(e.currentTarget.getAttribute('id'));
				}
			});

			document.body.appendChild(this.$el.querySelector('.popup'));
		},
		methods: {
			triggerPopup() {
				const popup = document.querySelector(`[data-popup="${this.name}"]`);
				popup.classList.toggle('popup-active');
			}
		}
	}
</script>

<style lang='scss' scoped>

</style>