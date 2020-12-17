<template>
	<main>
		<div class="logo-wrapper">
			<img :src="require('@/assets/logo.svg')" alt="Snippets logo image">
		</div>
		<h1>Login</h1>
		<div class="form-wrapper">
			<form action="#" method="post">
				<Input v-model="user" name="user" type="text" label="Username or E-mail address" />
				<Input v-model="password" name="password" type="password" label="Password" />
			</form>
		</div>
		<div class="button-wrapper">
			<router-link class="button --secondary" :to="'/'">Go back</router-link>
			<a class="button --primary" @click="loginHandler" href="#">Login</a>
		</div>	
	</main>
</template>

<script>
	import Input from '@/components/UI/Input.vue';

	export default {
		components: {
			Input
		},
		data() {
			return {
				user: null,
				password: null
			}
		},
		methods: {
			async loginHandler(e) {
				e.preventDefault();
				if(!this.user || !this.password) {
					this.$helpers.message(document.querySelector('.form-wrapper'), 'Please fill in all the fields.')
				}

				const response = await this.$store.dispatch('loginHandler', {user: this.user, pass: this.password});
				if(response.code === 200) {
					this.$store.commit('setUser', { username: response.username, email: response.email });
					this.$helpers.message(document.querySelector('.form-wrapper'), response.message, 'success');
					setTimeout(() => {
						this.$router.push(`/${this.$store.getters['getUser']}`);
					}, 1000)
				}
			}
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