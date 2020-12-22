const SnippetStore = {
	state: () => ({
		active: 'user'
	}),
	getters: {
		getActiveDashboard: state => {
			return state.active;
		}
	},
	mutations: {
		setActiveDashboard(state, dashboardName) {
			state.active = dashboardName
		}
	}
}

export default SnippetStore;