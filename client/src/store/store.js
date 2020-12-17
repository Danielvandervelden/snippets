import Vue from 'vue';
import Vuex from 'vuex';

import UserStore from './modules/UserStore';
import SnippetStore from './modules/SnippetStore';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		user: UserStore,
		snippet: SnippetStore
	}
})