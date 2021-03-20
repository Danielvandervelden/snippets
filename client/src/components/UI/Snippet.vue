<template>
	<article class="snippet" :data-snippet-id="data.id">
		<strong class="snippet__name" v-html="data.name" />
		<CodeEditor view :data="JSON.parse(data.content)" />
	</article>
</template>

<script>
	import CodeEditor from '@/components/UI/CodeEditor';

	export default {
		props: {
			data: Object,
		},
		components: {
			CodeEditor
		}
	}
</script>

<style lang='scss' scoped>

</style>