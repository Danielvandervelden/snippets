<template>
	<nav>
		<ul>
			<li><router-link :to="`/${getUser}`">Dashboard</router-link></li>	
			<li v-if="getCategories.length > 0">
				<span>Categories</span>
				<ul>
					<li v-for="(cat, index) in getCategories" :key="`category_${index}`">
						<router-link :to="`${getUser}/${cat.url}`">{{cat.label}}</router-link>
					</li>
				</ul>
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
		}
	}
</script>

<style lang='scss' scoped>

</style>