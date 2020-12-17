const Category = require('../models/category');

exports.category = (req, res) => {
	if(req.session.user) {
		return res.status(200).send({
			code: 200,
			message: "Successfully received category name",
			category: req.body.category
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