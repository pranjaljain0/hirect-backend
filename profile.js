var express = require('express');
const app = express.Router();
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ Route: 'Profile' }));

app.get('/get/id', (req, res) => {
	console.log(req.query._id);
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ _id: req.query._id })
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results);
				});
			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.get('/get/email', (req, res) => {
	console.log(req.query.email);
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: req.query.email })
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results);
				});
			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.post('/add/appliedJobs/', (req, res) => {
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: req.query.email })
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results[0].appliedJobs);
				});
			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.post('/add/savedJobs/', (req, res) => {
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: req.query.email })
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results[0].appliedJobs);
				});
			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.get('/get/appliedJobs/', (req, res) => {
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: req.query.email })
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results[0].appliedJobs);
				});
			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.get('/get/savedJobs/', (req, res) => {
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: req.query.email })
				.toArray((err, results) => {
					err && res.status(400).json(err);
					res.status(200).json(results[0].savedJobs);
				});
			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.post('/update', (req, res) => {
	var email = req.body.email;
	var updatedDoc = req.body.updatedDoc;
	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.updateOne({ email: email }, { $set: { ...updatedDoc } })
				.then((resp) =>
					res
						.status(200)
						.json({ status: 1, message: 'updated succesfully', resp })
				);

			const body = {
				_id: '623192c1ed9b39426bdda760',
				accountType: 1,
				email: 'p@g.com',
				password: '123',
				fullName: 'pj',
				education: [
					{
						name: 'A',
						start: '2021',
						end: '2023',
					},
				],
				experience: [],
				certifications: [],
				savedJobs: [],
				appliedJobs: [],
			};

			return client;
		})
		// .then((client) => client.close())
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

module.exports = app;
