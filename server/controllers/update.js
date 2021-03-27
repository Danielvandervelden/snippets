const Category = require('../models/category');

exports.category = async (req, res) => {
	const new_category_name = req.body.new_category_name;
	const id = req.body.id;
	const user_id = req.session.user_id;

	try {
		const response = await Category.update(
			{ name: new_category_name },
			{
				where: {
					user_id: user_id,
					id: id
				}
			}
		)

		const category = {
			label: new_category_name,
			url: new_category_name.toLowerCase().replace(' ', '-'),
			id: id
		}

		return res.status(200).send({
			code: 200,
			message: JSON.stringify(category)
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

exports.snippet_count_in_category = async (req, res) => {
	const user_id = req.session.user_id;

	if(	req.body.action !== "+" && req.body.action !== "-" && !req.body.action ||
		!req.body.category || typeof(req.body.category) !== 'number') {
			return res.status(400).send({
				code: 400,
				message: `Either the action: "${req.body.action}" or the category: "${req.body.category} are invalid."`
			})
		}

	if(!req.body.amount) {
		req.body.amount = 1;
	}

	const category = await Category.findByPk(req.body.category);

	/* Check if the category actually belongs to the user. */
	if(category.user_id === user_id) {
		let newAmount;

		if(req.body.action === "+") {
			newAmount = category.amount_of_snippets + req.body.amount
		} else {
			newAmount = category.amount_of_snippets - req.body.amount
		}

		const response = await Category.update(
			{ amount_of_snippets: newAmount }, 
			{
				where: {
					id: req.body.category,
					user_id: user_id
				}
			}
		)

		return res.status(200).send({
			code: 200,
			message: "Request received and processed"
		})
	} else {
		res.status(400).send({
			code: 400,
			message: "Category does not belong to user"
		})
	}
}