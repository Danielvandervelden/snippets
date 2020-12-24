<template>
	<div :id="name" class="hover-info" :class="location ? location : 'top'">
		<slot />
	</div>
</template>

<script>
	export default {
		props: ['location', 'name'],
		mounted() {
			const trigger = document.getElementById(`hover_${this.name}`)
			if(trigger) {
				trigger.addEventListener('mouseover', () => {
					this.$el.classList.add('show');
				}) 

				trigger.addEventListener('mouseout', () => {
					this.$el.classList.remove('show');
				})
			} else {
				console.error(`You didn't add a hover trigger for ${this.name}`)
			}
		}
	}
</script>

<style lang='scss' scoped>
	.hover-info {
		position: absolute;
		z-index: 10;
		left: 50%;
		transform: translate(-50%, 0);
		opacity: 0;
		pointer-events: none;
		visibility: hidden;
		transition: all .2s ease-in-out;
		background-color: #FFF;
		border: 1px solid #000;
		border-radius: 5px;
		width: 170px;
		padding: 7px;

		span {
			color: #000;
			font-size: 1.5rem;
		}

		&:before {
			content: '';
			position: absolute;
			width: 0;
			height: 0;
			border-style: solid;
		}

			&:after {
				content: '';
				position: absolute;
				width: 0;
				height: 0;
				border-style: solid;
			}

		&.show {
			opacity: 1;
			visibility: visible;
		}

		&.top {
			bottom: 100%;

			&:before {
				bottom: -15px;
				left: 50%;
				border-width: 15px 7.5px 0 7.5px;
				border-color: #000 transparent transparent transparent;
			}

			&:after {
				bottom: -14px;
				left: calc(50% + 1px);
				border-width: 14px 6.5px 0 6.5px;
				border-color: #FFF transparent transparent transparent;
			}

			&.show {
				transform: translate(-50%, -15px);
			}
		}

		&.bottom {
			top: 100%;

			&:before {
				top: -15px;
				left: 50%;
				border-width: 0 7.5px 15px 7.5px;
				border-color: transparent transparent #000 transparent;								
			}

			&:after {
				top: -14px;
				left: calc(50% + 1px);
				border-width: 0 6.5px 14px 6.5px;
				border-color: transparent transparent #FFF transparent;
			}

			&.show {
				transform: translate(-50%, 15px);
			}
		}
	}
</style>