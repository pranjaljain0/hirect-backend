const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const app = express.Router();
const morgan = require('morgan');
var multer = require('multer');
const upload = multer({});

const uri =
	'mongodb+srv://pranjaljain0:Cu006bzbMitUTbcM@cluster0.gylbe.mongodb.net/Hirect?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(upload.array());

app.get('/', (req, res) => res.json({ Route: 'Helper' }));

app.get('/jsonstr', (req, res) => res.json({ str: { fullName: 'PJB' } }));

app.post('/saveJob', (req, res) => res.json({ Hello: 'Workin' }));

app.post('/resumeParser', upload.single('file'), async (req, res) => {
	console.log(req.files);
	try {
		if (!req.files) {
			console.log('if');
			res.json({
				status: false,
				message: 'No file uploaded',
			});
		} else {
			let resume = req.files.resume;
			console.log('Else');
			resume.mv('./uploads/' + resume.name);

			const credential = new AffindaCredential(
				'e01c296c8855ce16c59799532efff7c11ce9bd4d'
			);
			const client = new AffindaAPI(credential);
			const readStream = fs.createReadStream('./uploads/' + resume.name);

			client
				.createResume({ file: readStream })
				.then((result) => {
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
				})
				.catch((err) => {
					res.status(500).send(err);
				});

			// Can also use a URL:
		}
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = app;
