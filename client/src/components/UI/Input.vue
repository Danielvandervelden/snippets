<template>
	<div v-if="name && type" :id="name" class="input-wrapper">
		<input v-if="type !== 'textarea'" @input="inputHandler" @blur="blurHandler($event)" :name="name" :type="type" />
		<textarea v-else-if="type === 'textarea'" @input="inputHandler" @blur="blurHandler($event)" :name="name" type="textarea" />
		<label v-if="label" :for="name">{{label}}</label>
	</div>
	<span v-else>You have to fill in a name and a type at the very least</span>
</template>

<script>
	export default {
		props: ['name', 'type', 'label'],
		methods: {
			inputHandler(e) {
				this.$emit('input', e.target.value);
			},
			blurHandler(e) {
				if(e.currentTarget.value.length > 0) {
					e.currentTarget.classList.add('active');
				} else {
					e.currentTarget.classList.remove('active');
				}
			}
		}
	}
</script>

<style lang='scss'>
	.input-wrapper {
		position: relative;
		width: 100%;
		transition: all .15s ease-in-out;

		input {
			width: 100%;
			border-radius: 4px;
			min-height: 4.5rem;
			border: 1px solid #A1A1A1;
			padding: 7px 10px 0px;
			font-size: 1.6rem;
			
			&:focus,
			&.active {
				+ label {
					transform: translateY(0px);
					font-size: 1rem;
				}
			}
		}

		label {
			position: absolute;
			transform: translateY(12.5px);
			left: 10px;
			transition: all .15s ease-in-out;
			pointer-events: none;
		}

		+ .input-wrapper {
			margin-top: 1rem;
		}
	}
</style>