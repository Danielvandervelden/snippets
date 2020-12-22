import axios from 'axios';

const SnippetStore = {
	state: () => ({
		categories: [{ label: 'test', url: '/test', id: '1' }],
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
		setCategories(state, categories) {
			console.log(categories, "I'm here!");
			state.categories = categories;
		}
	},
	actions: {
		async addCategoryHandler({dispatch}, categoryName) {
			try {
				await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/add/category`, {
					category: categoryName
				});

				dispatch('fetchCategories');
				
			} catch(err) {
				console.log(err.reponse);
			}
		},

		async fetchCategories({commit}) {
			try {
				const categories = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/get/categories`);
				console.log(categories.data.data);

				commit('setCategories', JSON.parse(categories.data.data));
			} catch(err) {
				console.log(err, 'error!!!');
			}
		}
	}
}

export default SnippetStore;