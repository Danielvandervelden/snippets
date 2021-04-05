import axios from 'axios';

const defaultState = () => ({
	user: null,
	loggedIn: false
})

const UserState = {
	state: defaultState(),
	getters: {
		getUser: state => {
			return state.user;
		},
		loggedIn: state => {
			return state.loggedIn
		}
	},
	mutations: {
		setUser(state, userObject) {
			state.user = userObject;
			state.loggedIn = true;
		},

		resetUserStore(state) {
			Object.assign(state, defaultState());
		}
	},
	actions: {
		async loginHandler({ dispatch }, user) {
			try {
				const fetchedUser = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/user/login`, { username: user.user, password: user.pass })
				
				if(fetchedUser.data.code == 200) {
					dispatch('fetchCategories');
				}

				return fetchedUser.data;
			} catch(err) {
				return err.response;
			}
		},

		async logoutHandler({commit}) {
			commit('resetUserStore');
			commit('resetSnippetState', null, { root: true });
			commit('resetDashboardState', null, { root: true });

			window.localStorage.removeItem('vuex');

			const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/user/logout`);
			
			return response;
		},

		async auth() {
			try {
				return await axios.get(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/user/auth`)
			} catch(err) {
				return err.response;
			}
		},
		async registrationHandler(context, user) {
			try {
				return await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/user/register`, {
					...user
				});

			} catch(err) {
				return err.response;
			}
		}
	}
}

export default UserState;