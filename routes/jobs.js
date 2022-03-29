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
	'mongodb+srv://user:Un3LcjRpxTffg4Us@cluster0.r4aou.mongodb.net/Hirect?retryWrites=true&w=majority';

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
			console.error(error);
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
			console.error(error);
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
			console.error(error);
		});
});

app.post('/post', async (req, res) => {
	var email = req.body.email;
	var jobDetails = req.body.jobDetails;

	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client.db('Hirect').collection('Jobs').insertOne(jobDetails);

			client
				.db('Hirect')
				.collection('Users')
				.updateOne({ email }, { $addToSet: { jobPosts: jobDetails } })
				.then((e) => {
					res
						.status(200)
						.json({ status: 'SUCCESS', res: e, email, jobDetails });
				});
			return client;
		})
		// .then((client) => client.close())
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.error(error);
		});
});

module.exports = app;
