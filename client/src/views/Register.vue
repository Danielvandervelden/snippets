<template>
	<main>
		<div class="logo-wrapper">
			<img :src="require('@/assets/logo.svg')" alt="Snippets logo image">
		</div>
		<h1>Registration</h1>
		<div class="form-wrapper">
			<form action="#" method="post">
				<Input v-model="user.username" name="username" type="text" label="Username" />
				<Input v-model="user.email" name="email" type="email" label="Email" />
				<Input v-model="user.password" name="password" type="password" label="Password" />
				<Input v-model="user.password_confirm" name="password_confirm" type="password" label="Confirm password" />
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
	import axios from 'axios';

	export default {
		data() {
			return {
				user: {
					username: undefined,
					email: undefined,
					password: undefined,
					password_confirm: undefined
				}
			}
		},
		components: {
			Input
		},
		methods: {
			registrationHandler(e) {
				e.preventDefault();
				
				/* Check if any of the values equal to undefined */
				if(Object.entries(this.user).some(([key, value]) => !key || value === undefined)) {
					Object.entries(this.user).forEach(([key, value]) => {
						if(value === undefined) this.$helpers.message(this.$helpers.parent(document.querySelector(`input[name="${key}"]`), '.input-wrapper'), 'Please fill in this value');
					})
					return;
				}

				/* Then check if the passwords match */
				if(this.user.password !== this.user.password_confirm) {
					this.$helpers.message(document.getElementById('password'), 'Please make sure the passwords match!');
					this.$helpers.message(document.getElementById('password_confirm'), 'Please make sure the passwords match!');
					return;
				}

				axios.post(`${this.$appConfig.base_url}/api/user/register`, {
					...this.user
				})
				.then(() => {					
					this.$store.dispatch('loginHandler', { user: this.user.username, pass: this.user.password })
					.then(response => {
						this.$store.commit('setUser', { username: response.username, email: response.email });
						this.$helpers.message(document.querySelector('.form-wrapper'), response.message, 'success');
						setTimeout(() => {
							this.$router.push(`/${this.$store.getters['getUser']}`);
						}, 1000)
					})
				})
				.catch(err => {
					if(err.response.data.code === "duplicate_username") {
						this.$helpers.message(document.getElementById('username'), "This username already exists, please try a different one.");
					}

					if(err.response.data.code === "duplicate_email") {
						this.$helpers.message(document.getElementById('email'), "This email already belongs to a user, please use a different one or request a password reset.");
					}
				})
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