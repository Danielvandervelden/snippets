const User = require('../models/user');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
	/* Spread out the user properties we get from the requst body */
	const user = {
		...req.body
	};

	/* Should not be happening, but if, for whatever reason, we don't get all the k/v pairs we need... */
	if(!user.username || !user.password || !user.email) {
		return res.status(500).send({
			message: "Did not get all the fields, try again",
			code: "not_all_fields_filled"
		})
	}

	/* First check if username already exists in the database */
	const usernameExistsInDb = await User.findOne({
		where: {
			username: user.username
		}
	});

	/* Throw an error if it does */
	if (usernameExistsInDb) {
		return res.status(500).send({
			message: "Username already exists!",
			code: 'duplicate_username'
		});
	}

	/* Then check if the email already exists in the database */
	const emailExistsInDb = await User.findOne({
		where: {
			email: user.email
		}
	})

	/* If it does, throw an error. */
	if (emailExistsInDb) {
		return res.status(500).send({
			message: "Email already exists!",
			code: 'duplicate_email'
		});
	}

	/* Otherwise, salt the password and store all the info in the database. */
	const salt = 10;
	bcrypt.hash(user.password, salt).then(hash => {
			return User.create({
				username: user.username,
				email: user.email,
				password: hash
			})
		}).then(() => {
			return res.status(200).send({
				message: "User has been successfully created, logging you in instantly...",
				code: "success"
			})
		})
		.catch(err => {
			return res.status(500).send({
				message: "Something went wrong on the server, please try again later",
				code: "server_error"
			});
		})
}

exports.login = async (req, res) => {
	const user = {
		...req.body
	}

	/* Should not be happening, but if, for whatever reason, we don't get the info we need... */
	if(!user.username || !user.password) {
		return res.status(500).send({
			message: "Did not get all the fields, try again",
			code: "not_all_fields_filled"
		})
	}

	/* Let's see if the user, whether it's a username or email address, exists */
	const email = user.username.indexOf(/@/) === -1 ? false : true;

	/* Then we find the user in the database, depending on if it's an email or username we search in different columns */

	let fetchedUser = await User.findOne({
		where: {
			[Op.or]: [
				{
					username: user.username
				},
				{
					email: user.username
				}
			]
		}
	});

	/* Can't find the user.... */
	if(!fetchedUser) {
		return res.status(500).send({
			message: "User/password combination is not correct.",
			code: "user_not_found"
		})
	}

	/* Apparently we found a user, now we are going to check the passwords. */
	const match = await bcrypt.compare(user.password, fetchedUser.password);

	if(match) {
		req.session.email = fetchedUser.email;
		req.session.user = fetchedUser.username;

		return res.status(200).send({
			code: 200,
			message: "Gothu fam, logging you in...",
			username: fetchedUser.username,
			email: fetchedUser.email
		});
	} else {
		req.session.destroy();
		return res.status(401).send({
			message: "User/password combination is not correct.",
			code: "user_not_found"
		});
	}
}

exports.auth = async (req, res) => {
	if(req.session.user) {
		res.status(200).send({
			code: 200,
			message: "Succesfully authorized",
			user: req.session.user,
			email: req.session.email
		})
	} else {
		res.status(200).send({
			code: 401,
			message: "Not logged in"
		})
	}
}