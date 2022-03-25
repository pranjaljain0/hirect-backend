const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express.Router();
const morgan = require('morgan');
const { AffindaCredential, AffindaAPI } = require('@affinda/affinda');
const fs = require('fs');
const { Axios, default: axios } = require('axios');

const uri =
	'mongodb+srv://pranjaljain0:Cu006bzbMitUTbcM@cluster0.gylbe.mongodb.net/Hirect?retryWrites=true&w=majority';
var pdfco =
	'pranjaljain0697@gmail.com_5c3bb5c374866adaffb3cc8992c823bb6348c52321f0b9aa03e9cd03eacb4ee2dfc79655';
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
			var resume = req.files.resume;
			var email = req.body.email;
			console.log(resume.name);
			console.log(email);

			MongoClient.connect(uri, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
				.then((client) => {
					client
						.db('Hirect')
						.collection('Users')
						.updateOne({ email: email }, { $set: { resumeName: resume.name } })
						.then((resp) =>
							res
								.status(200)
								.json({ status: 1, message: 'updated succesfully', resp })
						);

					return client;
				})

				.catch((error) => {
					res.status(500).json({ status: 'ERROR', err: error });
					console.error(error);
				});
			// var bodyFormData = new FormData();
			// bodyFormData.append('resume', resume);
			// axios({
			// 	method: 'post',
			// 	url: 'https://api.pdf.co/v1/file/upload',
			// 	headers: {
			// 		'x-api-key': pdfco,
			// 	},
			// 	data: resume,
			// });

			// resume.mv('./uploads/' + resume.name);
			// const credential = new AffindaCredential(
			// 	'e01c296c8855ce16c59799532efff7c11ce9bd4d'
			// );
			// const client = new AffindaAPI(credential);
			// const readStream = fs.createReadStream('./uploads/' + resume.name);
			// client
			// 	.createResume({ file: readStream })
			// 	.then((result) => {
			// 		console.log();
			// 		if (result.statusCode == 200)
			// 			res.json({
			// 				status: true,
			// 				message: 'File is uploaded',
			// 				data: {
			// 					name: resume.name,
			// 					mimetype: resume.mimetype,
			// 					size: resume.size,
			// 				},
			// 				resume: result,
			// 			});
			// 		if (result.statusCode == 400) {
			// 			console.error(result);
			// 			res.status(400).send(result);
			// 		}
			// 	})
			// 	.catch((err) => {
			// 		console.error(err);
			// 		res.status(500).send(err);
			// 	});
			// Can also use a URL:
		}
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});

module.exports = app;
