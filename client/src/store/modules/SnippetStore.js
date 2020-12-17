import axios from 'axios';

const SnippetStore = {
	state: () => ({
		categories: [{ label: 'test', url: '/test' }],
		snippets: []
	}),
	getters: {
		getCategories: state => {
			return state.categories;
		},
		
		getSnippets: state => {
			return state.snippets;
		}
	},
	mutations: {
		
	},
	actions: {
		async addCategoryHandler(commit, categoryName) {
			const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/add/category`, {
				category: categoryName
			});

			console.log(response);
		}
	}
}

export default SnippetStore;