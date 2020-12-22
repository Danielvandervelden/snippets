const {
	Sequelize,
	DataTypes
} = require('sequelize');
const db = require('../database/db');

const Snippet = db.define("snippet", {
	content: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {underscored: true})

module.exports = Snippet;