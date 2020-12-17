// import axios from 'axios';

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
			console.log(categoryName);
		}
	}
}

export default SnippetStore;