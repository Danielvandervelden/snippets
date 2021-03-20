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

/* Axios */
import axios from 'axios';
axios.defaults.withCredentials = true;

/* Helpers */
import Helpers from './plugins/helpers';
Vue.use(Helpers);

/* Vue Unicons */
import Unicon from 'vue-unicons';
import { uniTrashAlt, uniCopy, uniPen } from 'vue-unicons/src/icons'

Unicon.add([uniTrashAlt, uniCopy, uniPen])
Vue.use(Unicon);

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')