import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		value: 'test'
	},
	getters: {},
	mutations: {},
	actions: {
		async auth(){
			console.log("dispatching");
			const response = await axios.get(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/user/auth`);
			console.log(response);
		}
	}
})