<template>
	<article class="snippet" :data-snippet-id="data.id">
		<strong class="snippet__name" v-html="data.name" />
		<div class="snippet__content">
			<CodeEditor view :data="JSON.parse(data.content)" />
			<ActionWrapper :data="data" />
		</div>
	</article>
</template>

<script>
	import CodeEditor from '@/components/UI/CodeEditor';
	import ActionWrapper from '@/components/UI/ActionWrapper';

	export default {
		props: {
			data: Object,
		},
		components: {
			CodeEditor,
			ActionWrapper
		}
	}
</script>

<style lang='scss' scoped>
	.snippet {
		&__content {
			position: relative;
		}
	}
</style>