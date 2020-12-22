const Category = require('../models/category');

exports.category = (req, res) => {
	if(req.session.user) {
		console.log(req.session);
		return Category.create({
			name: req.body.category,
			user_id: req.session.user_id
		})
		.then(() => {
			return res.status(200).send({
				code: 200,
				message: "Successfully received category name and stored in database",
				category: req.body.category
			})
		})
	} else {
		req.session.destroy();
		return res.status(401).send({
			code: 401,
			message: "Something is wrong with your session, please relogin"
		})
	}
}

exports.snippet = (req, res) => {

}