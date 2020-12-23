import axios from 'axios';

const SnippetStore = {
	state: () => ({
		categories: [],
		snippets: [],
		active_category: ''
	}),
	getters: {
		getCategories: state => {
			return state.categories;
		},
		
		getSnippets: state => {
			return state.snippets;
		},

		getActiveCategory: state => {
			return state.active_category;
		}
	},
	mutations: {
		setCategories(state, categories) {
			state.categories = categories;
		},
		
		setActiveCategory(state, url_param) {
			state.active_category = state.categories.find(cat => url_param === cat.url);
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

				commit('setCategories', JSON.parse(categories.data.data));
			} catch(err) {
				console.log(err, 'error!!!');
			}
		},

		async deleteCategory(context, categoryObject) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/delete/category`, {
					...categoryObject
				})

				return response;
			} catch(err) {
				console.log(err.response, 'error in delete category!');
			}
		}
	}
}

export default SnippetStore;