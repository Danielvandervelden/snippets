require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { urlencoded, json } = require('body-parser');

const routes = require('./routes/routes');

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use('/api', routes);

const port = 8080;

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})