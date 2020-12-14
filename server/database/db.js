const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
	port: process.env.DB_PORT
})

sequelize.authenticate().then(() => {
	console.log('Successful connection!');
})
.catch(err => {
	console.log('Error while connecting!', err);
})

module.exports = sequelize;