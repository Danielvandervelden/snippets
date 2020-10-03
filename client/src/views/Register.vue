<template>
	<main>
		<div class="logo-wrapper">
			<img :src="require('@/assets/logo.svg')" alt="Snippets logo image">
		</div>
		<h1>Registration</h1>
		<div class="form-wrapper">
			<form action="#" method="post">
				<Input name="username" type="text" label="Username" />
				<Input name="email" type="email" label="Email" />
				<Input name="password" type="password" label="Password" />
				<Input name="password_confirm" type="password" label="Confirm password" />
			</form>
		</div>
		<div class="button-wrapper">
			<router-link class="button --secondary" :to="'/'">Go back</router-link>
			<a class="button --primary" @click="registrationHandler" href="#">Register</a>
		</div>	
	</main>
</template>

<script>
	import Input from '@/components/UI/Input.vue';
	export default {
		components: {
			Input
		}
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

	.form-wrapper {
		max-width: 700px;
		margin: 0 auto;
	}
</style>