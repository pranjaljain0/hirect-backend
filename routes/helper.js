const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express.Router();
const morgan = require('morgan');
const { AffindaCredential, AffindaAPI } = require('@affinda/affinda');
const fs = require('fs');

const uri =
	'mongodb+srv://pranjaljain0:Cu006bzbMitUTbcM@cluster0.gylbe.mongodb.net/Hirect?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(
	fileUpload({
		createParentPath: true,
	})
);

app.get('/', (req, res) => res.json({ Route: 'Helper' }));

app.get('/jsonstr', (req, res) => res.json({ str: { fullName: 'PJB' } }));

app.post('/saveJob', (req, res) => res.json({ Hello: 'Workin' }));

app.post('/saveJob', (req, res) => res.json({ Hello: 'Workin' }));

app.post('/resumeParser', async (req, res) => {
	try {
		if (!req.files) {
			res.json({
				status: false,
				message: 'No file uploaded',
			});
		} else {
			let resume = req.files.resume;
			resume.mv('./uploads/' + resume.name);
			const credential = new AffindaCredential(
				'e01c296c8855ce16c59799532efff7c11ce9bd4d'
			);
			const client = new AffindaAPI(credential);
			const readStream = fs.createReadStream('./uploads/' + resume.name);
			client
				.createResume({ file: readStream })
				.then((result) => {
					console.log();
					if (result.statusCode == 200)
						res.json({
							status: true,
							message: 'File is uploaded',
							data: {
								name: resume.name,
								mimetype: resume.mimetype,
								size: resume.size,
							},
							resume: result,
						});
					if (result.statusCode == 400) {
						console.error(result);
						res.status(400).send(result);
					}
				})
				.catch((err) => {
					console.error(err);
					res.status(500).send(err);
				});
			// Can also use a URL:
		}
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});

module.exports = app;
