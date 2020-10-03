require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {
	urlencoded,
	json
} = require('body-parser');

const db = require('./database/db');

const routes = require('./routes/routes');

const app = express();

app.use(urlencoded({
	extended: true
}));
app.use(json());
app.use(cors());

app.use('/api', routes);

const port = 3000;

db.sync()
	.then(res => {
		console.log("Sync successful!")
	})
	.catch(err => {
		console.log("Sync error", err);
	})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})