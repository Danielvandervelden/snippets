const Category = require('../models/category');
const Snippet = require('../models/snippet');
const User = require('../models/user');

exports.category = async (req, res) => {
	if(req.session.user) {
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
	if(req.session.user) {
		return Snippet.create({
			name: req.body.snippet_name,
			content: req.body.snippet_content,
			user_id: req.session.user_id,
			category_id: req.body.snippet_category			
		})
		.then(() => {
			return res.status(200).send({
				code: 200,
				message: "Successfully created snippet and stored in database",
				category: req.body.snippet_name
			})
		})
		.catch(e => {
			return res.status(400).send({
				code: 400,
				message: "Something went wrong...",
				error: e
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