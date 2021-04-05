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

	const hashPassword = await bcrypt.hash(user.password, salt);

	try {
		const createdUser = await User.create({
			username: user.username,
			email: user.email,
			password: hashPassword
		})

		return res.status(200).send({
			message: "User has been successfully created, logging you in instantly...",
			code: "success"
		})
	} catch(err) {
		console.log(err);
		return res.status(500).send({
			message: "Something went wrong on the server, please try again later",
			code: "server_error",
			error: err
		});
	}
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

	/* Then we find the user in the database, depending on if it's an email or username we search in different columns */
	const fetchedUser = await User.findOne({
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

	if(!fetchedUser) {
		return res.status(500).send({
			message: "User/password combination is not correct.",
			code: "user_not_found"
		})
	}

	/* Apparently we found a user, now we are going to check the passwords. */
	try {
		await bcrypt.compare(user.password, fetchedUser.password);

		const returnedUser = {
			username: fetchedUser.username,
			email: fetchedUser.email,
			id: fetchedUser.id
		}

		req.session.email = fetchedUser.email;
		req.session.user = fetchedUser.username;
		req.session.user_id = fetchedUser.id;

		return res.status(200).send({
			code: 200,
			message: "Gothu fam, logging you in...",
			user: returnedUser
		})
	}
	catch(err) {
		console.log(err);
		req.session.destroy();
		return res.status(401).send({
			message: "User/password combination is not correct.",
			code: "user_not_found"
		});
	}
}

exports.auth = (req, res) => {
	if(req.session.user) {
		return res.status(200).send({
			code: 200,
			message: "Succesfully authorized",
			user: {
				username: req.session.user,
				email: req.session.email,
				id: req.session.user_id
			}
		})
	} else {
		return res.status(200).send({
			code: 401,
			message: "Not logged in"
		})
	}
}

exports.logout = async (req, res) => {
	if(req.session) {
		await req.session.destroy(() => {
			return res.clearCookie('snippet_session', { path: '/' }).status(200).send({
				code: 200,
				message: "Successfully logged out",
				code: "logout_successful"
			})
		}
	)} else {
		return res.status(500).send({
			code: 401,
			message: "No session there to begin with",
			code: "no_session"
		})
	}
}