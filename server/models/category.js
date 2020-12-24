const {
	Sequelize,
	DataTypes
} = require('sequelize');
const db = require('../database/db');

const Category = db.define("category", {
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	amount_of_snippets: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	}
}, {underscored: true});

module.exports = Category;