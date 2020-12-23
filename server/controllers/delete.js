const Category = require('../models/category');
const { Op } = require("sequelize");

exports.category = async (req, res) => {
	const category_name = req.body.label;
	const user_id = req.session.user_id;

	const categoryToDestroy = await Category.destroy({
		where: {
			[Op.and]: [
				{ user_id: user_id },
				{ name: category_name }
			]
		}
	})

	console.log(categoryToDestroy);

	return res.status(200).send({
		status: 200,
		message: `Successfully deleted ${category_name}`
	})
}

exports.snippet = (req, res) => {

}