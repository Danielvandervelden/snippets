const {
	Sequelize,
	DataTypes
} = require('sequelize');
const db = require('../database/db');

const Category = db.define("Category", {
	user_id: {
		type: DataTypes.STRING,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
})

module.exports = Category;