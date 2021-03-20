import axios from 'axios';

const defaultState = () => ({
	categories: [],
	snippets: [],
	active_category: ''
})

const SnippetStore = {
	state: defaultState(),
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
		},

		resetSnippetState(state) {
			Object.assign(state, defaultState());
		}
	},
	actions: {
		async addCategoryHandler({dispatch}, categoryName) {
			try {
				await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/add/category`, {
					category: categoryName
				});

				dispatch('fetchCategories');
				return true
				
			} catch(err) {
				console.log(err.reponse);
				return false;
			}
		},

		async fetchCategories({commit}) {
			try {
				const categories = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/get/categories`);

				commit('setCategories', JSON.parse(categories.data.data));
			} catch(err) {
				console.log(err, 'Error while fetching categories.');
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
		},

		async saveSnippetHandler(context, snippetObject) {
			try {
				return await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/add/snippet`, {
					...snippetObject
				});
			} catch(err) {
				console.log("ERROR:" + err);
			}
		}
	}
}

export default SnippetStore;