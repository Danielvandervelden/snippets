const Category = require('../models/category');
const Snippet = require('../models/snippet');
const {
	Op
} = require("sequelize");

exports.category = async (req, res) => {
	const category_name = req.body.label;
	const category_id = req.body.id;
	const user_id = req.session.user_id;

	const snippetsToDestroy = await Snippet.destroy({
		where: {
			[Op.and]: [{
					category_id: category_id
				},
				{
					user_id: user_id
				}
			]
		}
	})

	const categoryToDestroy = await Category.destroy({
		where: {
			[Op.and]: [{
					user_id: user_id
				},
				{
					name: category_name
				}
			]
		}
	})

	return res.status(200).send({
		status: 200,
		message: `Successfully deleted ${category_name}`
	})
}
exports.snippet = (req, res) => {}