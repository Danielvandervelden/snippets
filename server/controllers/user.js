const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.register = (req, res) => {
	const user = {
		...req.body
	};
	const salt = 10;

	bcrypt.hash(user.password, salt).then(hash => {
			return User.create({
				username: user.username,
				email: user.email,
				password: hash
			})
		}).then(res => {
			console.log("WORKED!", res);
		})
		.catch(err => {
			console.log(err);
		})

	res.send('Working!');
}