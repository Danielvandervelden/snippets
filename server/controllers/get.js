const User = require('../models/user');
const Snippet = require('../models/snippet');

exports.categories = async (req, res) => {
	const fetchedUser = await User.findByPk(req.session.user_id);
	let categories;
	
	try {
		categories = await fetchedUser.getCategories();
	} catch {
		return res.status(401).send({
			code: 401,
			message: "Couldn't fetch categories"
		})
	}

	const responseArray = categories.map(cat => {
		return {
			label: cat.name,
			url: cat.name.toLowerCase().replace(/\s/g, '-'),
			id: cat.id
		}
	});

	const data = JSON.stringify(responseArray);

	return res.status(200).send({
		code: 200,
		message: "Request processed",
		data: data
	})
}

exports.snippets = async (req, res) => {
	// const fetchedUser = await User.findByPk(req.session.user_id);
	const category_id = req.body.category_id;
	const user_id = req.session.user_id;

	const snippets = await Snippet.findAll({
		where: {
			category_id: category_id,
			user_id: user_id
		}
	})

	return res.status(200).send({
		code: 200,
		message: "Request processed",
		data: snippets
	})
}