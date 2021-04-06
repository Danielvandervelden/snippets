<template>
	<div class="select-wrapper">
		<label v-if="label" :for="name">{{label}}</label>
		<select :value="value" @change="$emit('input', $event.target.value)">
			<option selected disabled value="null">- Select an option</option>
			<option :name="name" v-for="option in options" :key="option.value" :selected="isSelected(option.value)" :value="option.value">{{option.label}}</option>
		</select>
	</div>
</template>

<script>
	export default {
		props: {
			options: Array,
			name: String,
			label: String,
			selectedValue: String
		},
		data() {
			return {
				value: null
			}
		},
		methods: {
			isSelected(value) {
				if(!this.selectedValue) {
					return false
				} else if(value.toString() === this.selectedValue) {
					return true
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	.select-wrapper {
		margin: 1rem 0;

		select {
			width: 100%;
			border-radius: 4px;
			min-height: 4.5rem;
			border: 1px solid #A1A1A1;
			padding: 10px 7px;
			font-size: 1.6rem;
		}
	}
</style>