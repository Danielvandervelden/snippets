import axios from 'axios';

const defaultState = () => ({
	user: null,
	user_email: null
})

const UserState = {
	state: defaultState(),
	getters: {
		getUser: state => {
			return state.user;
		}
	},
	mutations: {
		setUser(state, userObject) {
			state.user = userObject.username;
			state.user_email = userObject.email;
		},

		resetUserStore(state) {
			Object.assign(state, defaultState());
		}
	},
	actions: {
		async loginHandler(context, user) {
			try {
				const fetchedUser = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/user/login`, { username: user.user, password: user.pass })
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