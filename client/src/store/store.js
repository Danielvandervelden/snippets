import Vue from 'vue';
import Vuex from 'vuex';

import UserStore from './modules/UserStore';
import SnippetStore from './modules/SnippetStore';
import DashboardStore from './modules/DashboardStore';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		user: UserStore,
		snippet: SnippetStore,
		dashboard: DashboardStore
	},
	plugins: [createPersistedState()]
})