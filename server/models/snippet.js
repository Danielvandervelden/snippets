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
	},
	copied: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	}
}, {underscored: true})

module.exports = Snippet;