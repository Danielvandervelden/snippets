<template>
	<main>
		<div class="logo-wrapper">
			<img :src="require('@/assets/logo.svg')" alt="Snippets logo image">
		</div>
		<h1>Registration</h1>
		<div class="form-wrapper">
			<form action="#" method="post">
				<Input v-model="user.username" :value="user.username" name="username" type="text" label="Username" />
				<Input v-model="user.email" :value="user.email" name="email" type="email" label="Email" />
				<Input v-model="user.password" :value="user.password" name="password" type="password" label="Password" />
				<Input v-model="user.password_confirm" :value="user.password_confirm" name="password_confirm" type="password" label="Confirm password" />
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
		data() {
			return {
				user: {
					username: '',
					email: '',
					password: '',
					password_confirm: ''
				}
			}
		},
		components: {
			Input
		},
		methods: {
			async registrationHandler(e) {
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

				const response = await this.$store.dispatch('registrationHandler', this.user);

				if(response.status === 200) {
					const loginResponse = await this.$store.dispatch('loginHandler', { user: this.user.username, pass: this.user.password });
					this.$store.commit('setUser', { username: loginResponse.username, email: loginResponse.email });
					this.$store.dispatch('fetchCategories');
					this.$helpers.message(document.querySelector('.form-wrapper'), response.message, 'success');
					setTimeout(() => {
						this.$router.push(`/${this.$store.getters['getUser']}`);
					}, 1000)
				} else {
					if(response.data.code === "duplicate_username") {
						this.$helpers.message(document.getElementById('username'), "This username already exists, please try a different one.");
					}

					if(response.data.code === "duplicate_email") {
						this.$helpers.message(document.getElementById('email'), "This email already belongs to a user, please use a different one or request a password reset.");
					}
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