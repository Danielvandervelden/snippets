require('dotenv').config();

/* Packages */
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const {	urlencoded,	json } = require('body-parser');
const SequelizeStore = require("connect-session-sequelize")(session.Store)

/* Files */
const db = require('./database/db');
const routes = require('./routes/routes');

db.sync()
	.then(res => {
		console.log("Sync successful!")
	})
	.catch(err => {
		console.log("Sync error", err);
	})

/* Relations */
const User = require('./models/user');
const Snippet = require('./models/snippet');

User.hasMany(Snippet);

/* Instances */
const app = express();

const seqStore = new SequelizeStore({
	db: db,
	expiration: 24 * 60 * 60 * 1000
});

app.use(session({
	secret: 'f3829fj3j21j892p3fh(P#J*(J*(F',
	store: seqStore,
	resave: true,
	saveUninitialized: true
}))

app.use(urlencoded({
	extended: true
}));
app.use(json());
app.use(cors({
	origin: [
		process.env.DEV_URL,
		process.env.PROD_URL
	],
	credentials: true,
	exposedHeaders: ['set-cookie']
}));

app.use('/api', routes);

const port = 3000;



app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})