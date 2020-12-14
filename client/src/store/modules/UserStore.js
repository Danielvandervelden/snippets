import axios from 'axios';

const UserState = {
	state: () => ({
		user: null,
		user_email: null
	}),
	getters: {},
	mutations: {
		setUser(state, userObject) {
			state.user = userObject.username;
			state.user_email = userObject.email;
		}
	},
	actions: {
		async loginHandler(commit, user) {
			try {
				const fetchedUser = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/user/login`, { username: user.user, password: user.pass })					
				return fetchedUser.data;
			} catch(err) {
				return err.response;
			}
		}
	}
}

export default UserState;