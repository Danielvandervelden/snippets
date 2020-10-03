import Vue from 'vue';
import App from './App.vue';

/* Router */
import VueRouter from 'vue-router';
import { router } from './router/routes';

Vue.use(VueRouter);

/* Store */
import { store } from './store/store';

/* App config */
import ConfigPlugin from './plugins/config';

Vue.use(ConfigPlugin);

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')