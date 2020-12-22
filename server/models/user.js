const {
	Sequelize,
	DataTypes
} = require('sequelize');
const db = require('../database/db');

const User = db.define("user", {
	username: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {underscored: true})

module.exports = User;