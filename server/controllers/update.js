const Category = require('../models/category');

exports.category = async (req, res) => {
	const new_category_name = req.body.new_category_name;
	const id = req.body.id;
	const user_id = req.session.user_id;

	try {
		const reponse = await Category.update(
			{ name: new_category_name },
			{
				where: {
					user_id: user_id,
					id: id
				}
			}
		)

		return res.status(200).send({
			code: 200,
			message: response
		})
	} catch(err) {
		return res.status(400).send({
			code: 400,
			message: err
		})
	}
}

exports.snippet = (req, res) => {
	
}