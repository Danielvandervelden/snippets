<template>
	<nav id="navigation">
		<ul>
			<li><router-link :to="`/${getUser.username}`">Dashboard</router-link></li>	
			<li v-if="getCategories.length > 0">
				<span>Categories</span>
				<ul class="submenu">
					<li v-for="(cat, index) in getCategories" :key="`category_${index}`">
						<router-link :to="`/${getUser.username}/${cat.url}`">{{cat.label}}</router-link>
					</li>
				</ul>
			</li>	
			<li>
				<a @click="logoutHandler" href="#" title="Click here to logout of your account.">Logout</a>
			</li>
		</ul>	
	</nav>
</template>

<script>
	export default {
		computed: {
			getCategories() {
				return this.$store.getters['getCategories']
			},
			getUser() {
				return this.$store.getters['getUser'];
			}
		},
		methods: {
			async logoutHandler() {
				const response = await this.$store.dispatch('logoutHandler');
				if(response.data.code === 'logout_successful') {
					this.$router.push('/');
				}
			}
		}
	}
</script>

<style lang='scss' scoped>
	nav {
		position: fixed;
		z-index: 5;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100vw;
		background-color: #FFF;
		box-shadow: 0 0 5px rgba(0, 0, 0, .4);

		ul {
			list-style: none;
		}

		> ul {
			@include container();
			display: flex;

			> li {
				position: relative;
				padding: 1.4rem 1rem;
				cursor: pointer;

				> * {
					text-decoration: none;
					color: $red;
				}

				+ li {
					margin-left: 1.6rem;
				}

				&:hover {
					> .submenu {
						opacity: 1;
						pointer-events: auto;
						transform: translateY(0);
					}
				}
			}
		}

		.submenu {
			opacity: 0;
			pointer-events: none;
			transform: translateY(-5px);
			top: 100%;
			left: 0;
			position: absolute;
			min-width: 100%;
			background-color: #FFF;
			transition: all .15s ease-in-out;
			padding: 1rem 1.6rem;
			box-shadow: 0 5px 5px rgba(0, 0, 0, .4);

			a {
				white-space: nowrap;
			}
		}
	}
</style>