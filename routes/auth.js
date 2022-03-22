var express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const app = express.Router();
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const uri =
	'mongodb+srv://pranjaljain0:Cu006bzbMitUTbcM@cluster0.gylbe.mongodb.net/Hirect?retryWrites=true&w=majority';

app.get('/', (req, res) => res.json({ Route: 'Auth' }));

app.get('/login', (req, res) => {
	let email = req.query.email;
	let password = req.query.password;

	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: email, password: password })
				.toArray((err, results) => {
					err && res.status(400).json({ error: err, status: 0 });
					if (results.length != 1)
						res.status(401).json({ status: 0, message: 'User not found' });
					else res.status(200).json(results);
				});
			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.post('/JobSeekerSignUp', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	var fullName = req.body.fullName;
	var data = {
		accountType: 1,
		email,
		password,
		fullName,
		education: [],
		experience: [],
		certifications: [],
		savedJobs: [],
		appliedJobs: [],
	};

	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: email })
				.toArray((err, results) => {
					if (results.length === 1) {
						res.status(100).json({ status: 0, message: 'Email already found' });
					} else {
						client
							.db('Hirect')
							.collection('Users')
							.insertOne(data)
							.then((e) => {
								res.status(200).json({
									status: 1,
									message: 'User Registered',
									res: { ...e, ...data },
								});
							});
					}
				});

			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

app.post('/JobProviderSignUp', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	var fullName = req.body.fullName;
	var companyName = req.body.companyName;
	var data = {
		accountType: 0,
		email,
		password,
		fullName,
		companyName,
		jobPosts: [],
		applications: [],
	};

	MongoClient.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
		.then((client) => {
			client
				.db('Hirect')
				.collection('Users')
				.find({ email: email })
				.toArray((err, results) => {
					if (results.length === 1) {
						res.json({ status: 0, message: 'Email already found' });
					} else {
						client
							.db('Hirect')
							.collection('Users')
							.insertOne(data)
							.then((e) => {
								res.json({
									status: 1,
									message: 'User Registered',
									res: { ...e, ...data },
								});
							});
					}
				});

			return client;
		})
		.catch((error) => {
			res.status(500).json({ status: 'ERROR', err: error });
			console.log(error);
		});
});

module.exports = app;
