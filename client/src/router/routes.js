import VueRouter from 'vue-router';
import { store } from '../store/store';

/* Views */
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

export const router = new VueRouter({
	routes: [{
			path: '/',
			component: Home
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/:user',
			component: User
		},
		{
			path: '/:user/:category',
			component: User
		}
	],
	mode: 'history'
});

router.beforeEach(async (to, from, next) => {
	const response = await store.dispatch('auth');
	if (response.data.code === 200) {
		store.commit('setUser', { ...response.data.user })
		if(to.fullPath.indexOf(store.getters['getUser'].username) === -1) {
			next(`/${store.getters['getUser'].username}`);
		} else {
			next();
		}
	} else {
		if(to.path.match(/(^\/)$|\/register|\/login/)) {
			next();
		} else {
			next('/');
		}
	}
})