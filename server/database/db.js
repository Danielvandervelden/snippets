const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('snippets', 'root', 'root', {
	dialect: 'mysql',
	host: 'localhost',
	port: '3306'
})

sequelize.authenticate().then(() => {
	console.log('Successful connection!');
})
.catch(err => {
	console.log('Error while connecting!', err);
})

module.exports = sequelize;