import axios from 'axios';

const defaultState = () => ({
	categories: [],
	snippets: [],
	active_category: '',
	active_category_snippets: []
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
		},

		getSnippetsInCurrentCategory: state => {
			return state.active_category_snippets;
		}
	},
	mutations: {
		setCategories(state, categories) {
			state.categories = categories;
		},
		
		setActiveCategory(state, categoryObject) {
			state.active_category = categoryObject
		},

		setActiveCategorySnippets(state, snippetArray) {
			state.active_category_snippets = snippetArray;
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

		async editCategory(context, newCategoryObject) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/update/category`, {
					...newCategoryObject
				});

				console.log(response);
			} catch(err) {
				console.log("Error in edit category " + err);
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
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/add/snippet`, {
					...snippetObject
				});

				// dispatch('fetchSnippetsInCategory', snippetObject.snippet_category);

				return response;
			} catch(err) {
				console.log("ERROR in saveSnippetHandler: " + err);
			}
		},

		async fetchSnippetsInCategory({commit}, category_id) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/get/snippets`, {
					category_id: category_id
				});

				commit('setActiveCategorySnippets', response.data.data);
			} catch(err) {
				console.log("ERROR in fetchSnippetsFromCategory: " + err);
			}
		}
	}
}

export default SnippetStore;