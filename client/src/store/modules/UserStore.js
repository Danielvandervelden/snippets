import axios from 'axios';

const UserState = {
	state: () => ({
		user: null,
		user_email: null
	}),
	getters: {
		getUser: state => {
			return state.user;
		}
	},
	mutations: {
		setUser(state, userObject) {
			state.user = userObject.username;
			state.user_email = userObject.email;
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