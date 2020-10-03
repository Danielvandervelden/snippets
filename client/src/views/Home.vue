<template>
	<main>
		<div class="logo-wrapper">
			<img :src="require('@/assets/logo.svg')" alt="Snippets logo image">
		</div>
		<h1>Snippets</h1>
		<span class="code">Save and copy code snippets for easier development.</span>
		<div class="button-wrapper">
			<router-link :to="`/login`" class="button --primary">Login</router-link>
			<router-link :to="`/register`" class="button --secondary">Register</router-link>
		</div>
	</main>
</template>

<script>
	export default {
		
	}
</script>

<style lang='scss' scoped>
	.logo-wrapper {
		text-align: center;
	}

	img {
		max-width: 300px;
		min-width: 200px;
		width: 50vw;
	}

	span {
		display: block;
		text-align: center;
	}

	h1 {
		text-align: center;
		animation: wave 2s ease-in-out infinite;
	}

	@keyframes wave {
		0% {
			transform: translateY(0);
		}

		50% {
			transform: translateY(10px);
		}

		100% {
			transform: translateY(0);
		}
	}
</style>