const {
	Sequelize,
	DataTypes
} = require('sequelize');
const db = require('../database/db');

const Snippet = db.define("Snippet", {
	user_id: {
		type: DataTypes.STRING,
		allowNull: false
	},
	category: {
		type: DataTypes.STRING,
		allowNull: false
	},
	content: {
		type: DataTypes.STRING,
		allowNull: false
	},
	date: {
		type: DataTypes.STRING,
		allowNull: false
	}
})

module.exports = Snippet;