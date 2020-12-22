const User = require('../models/user');

exports.categories = async (req, res) => {
	const fetchedUser = await User.findByPk(req.session.user_id);

	const categories = await fetchedUser.getCategories();

	const responseArray = categories.map(cat => {
		return {
			label: cat.name,
			url: cat.name.toLowerCase().replace(/\s/, '-'),
			id: cat.id
		}
	});

	const data = JSON.stringify(responseArray);

	return res.status(200).send({
		code: 200,
		message: "Request received",
		data: data
	})
}

exports.snippets = (req, res) => {

}