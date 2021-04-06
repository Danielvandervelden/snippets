<template>
	<div :key="componentKey" v-if="name && type" :id="name" class="input-wrapper">
		<input :value="value" v-if="type !== 'textarea'" @input="inputHandler" @blur="blurHandler($event.target)" :name="name" :type="type" />
		<textarea :value="val" v-else-if="type === 'textarea'" @input="inputHandler" @blur="blurHandler($event.target)" :name="name" type="textarea" />
		<label v-if="label" :for="name">{{label}}</label>
	</div>
	<span v-else>You have to fill in a name and a type at the very least</span>
</template>

<script>
	export default {
		props: {
			name: String,
			type: String,
			label: String,
			value: String
		},
		data() {
			return {
				componentKey: 0
			}
		},
		watch: { 
			value: function(newValue) {
				if(newValue) {
					this.$el.querySelector('input').classList.add('active');
				}
			}
		},
		methods: {
			inputHandler(e) {
				console.log("INPUT");
				this.$emit('input', e.target.value);
			},
			blurHandler(el) {
				console.log(el.value);
				if(el.value.length > 0) {
					el.classList.add('active');
				} else {
					el.classList.remove('active');
				}
			},
			forceUpdate() {
				this.componentKey += 1;
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
					color: $blue;
				}
			}
		}

		label {
			position: absolute;
			transform: translateY(12.5px);
			left: 10px;
			top: 0;
			transition: all .15s ease-in-out;
			pointer-events: none;
			color: rgba(0, 0, 0, .7);
		}

		+ .input-wrapper {
			margin-top: 1rem;
		}
	}
</style>