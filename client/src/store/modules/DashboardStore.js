const defaultState = () => ({
	active: 'user'
})

const SnippetStore = {
	state: defaultState(),
	getters: {
		getActiveDashboard: state => {
			return state.active;
		}
	},
	mutations: {
		setActiveDashboard(state, dashboardName) {
			state.active = dashboardName
		},

		resetDashboardState(state) {
			Object.assign(state, defaultState());
		}
	}
}

export default SnippetStore;