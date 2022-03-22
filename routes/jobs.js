const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const { json } = require('express/lib/response');
const app = express.Router();
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const uri =
	'mongodb+srv://pranjaljain0:Cu006bzbMitUTbcM@cluster0.gylbe.mongodb.net/Hirect?retryWrites=true&w=majority';

app.get('/', (req, res) => res.json({ Route: 'Jobs' }));

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

app.get('/posts', async (req, res) => {
	var posts = [];
	var email = req.query.email;
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email })
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results[0].jobPosts);
				});
			return client;
		})
		// .then((client) => client.close())
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.get('/applied', async (req, res) => {
	var email = req.query.email;
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Jobs')
				.find({ email })
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

app.post('/post', async (req, res) => {
	var email = req.body.email;
	var jobDetails = req.body.jobDetails;
	console.log(jobDetails);

	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Jobs')
				.insertOne(jobDetails)
				.then((e) => {
					console.log(e);
				});

			client
				.db('Hirect')
				.collection('Users')
				.updateOne({ email }, { $addToSet: { jobPosts: jobDetails } })
				.then((e) => {
					console.log(e);
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
