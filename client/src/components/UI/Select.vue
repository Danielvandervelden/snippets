<template>
	<div class="select-wrapper">
		<label v-if="label" :for="name">{{label}}</label>
		<select :value="value" @change="$emit('input', $event.target.value)">
			<option selected disabled value="null">- Select a category</option>
			<option :name="name" v-for="option in options" :key="option.value" :value="option.value">{{option.label}}</option>
		</select>
	</div>
</template>

<script>
	export default {
		props: {
			options: Array,
			name: String,
			label: String
		},
		data() {
			return {
				value: null
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