const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const app = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ Route: 'Profile' }));

app.get('/all', async (req, res) => {
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Jobs')
				.find({})
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results);
				});
			return client;
		})
		// .then((client) => client.close())
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

module.exports = app;
