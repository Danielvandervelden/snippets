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

		async editCategory({commit, dispatch}, newCategoryObject) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/update/category`, {
					...newCategoryObject
				});

				commit('setActiveCategory', response.data);
				dispatch('fetchCategories');
				return response;
			} catch(err) {
				console.log("Error in edit category " + err);
			}
		},

		async deleteCategory({dispatch}, categoryObject) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/delete/category`, {
					...categoryObject
				})

				dispatch('fetchCategories');
				return response;
			} catch(err) {
				console.log(err.response, 'error in delete category!');
			}
		},

		async saveSnippetHandler({dispatch, getters}, snippetObject) {
			try {
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/add/snippet`, {
					...snippetObject
				});

				if(getters['getActiveCategory'].id == snippetObject.snippet_category) {
					dispatch('fetchSnippetsInCategory', getters['getActiveCategory'].id);
				}

				const count = await dispatch('editSnippetCountInCategory', {
					action: '+',
					amount: 1,
					category: Number(snippetObject.snippet_category)
				})

				console.log(count);

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
		},

		/**
		 * 
		 * @param {Object} context Nuxt/Vue's own context object
		 * @param {Object} modifications Modification object needed to alter snippet count in category which looks as follows:
		 * {
		 * 		action: '+/-',
		 * 		amount: Number (default: 1),
		 * 		category: Category ID
		 * }
		 */
		async editSnippetCountInCategory(context, modifications) {
			if(modifications.action !== "+" && modifications.action !== "-" && !modifications.action) return `action value in object should be '+' or '-', it is now ${modifications.action}`;
			if(!modifications.amount) modifications.amount = 1;
			if(!modifications.category || typeof(modifications.category) !== 'number') return 'category value of modifications object is either not filled in or of type Number'

			try {
				const response = await axios.post(`${process.env.VUE_APP_API}:${process.env.VUE_APP_PORT}/api/update/snippet_count_in_category`, modifications)

				console.log(response);
			} catch(err) {
				console.log("Error in editSnippetCountInCategory", + err);
				return err;
			}
		}
	}
}
export default SnippetStore;