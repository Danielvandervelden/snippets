import VueRouter from 'vue-router';
import {
	store
} from '../store/store';

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
		store.commit('setUser', { username: response.data.user, email: response.data.email })
		if(to.fullPath.indexOf(store.getters['getUser']) === -1) {
			next(`/${store.getters['getUser']}`);
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