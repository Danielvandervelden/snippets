import VueRouter from 'vue-router';

/* Views */
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import { store } from '../store/store';

export const router = new VueRouter({
	routes: [
		{
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
	],
	mode: 'history'
});

router.beforeEach((to, from ,next) => {
	store.dispatch('auth');
	next();
})