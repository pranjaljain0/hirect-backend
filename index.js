const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

const uri =
	'mongodb+srv://pranjaljain0:Cu006bzbMitUTbcM@cluster0.gylbe.mongodb.net/Hirect?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.type('html').send(html));
app.get('/hello', (req, res) => res.json({ Hello: 'Workin' }));

app.get('/auth/login', (req, res) => {
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

app.post('/auth/JobSeekerSignUp', (req, res) => {
	var email = req.body.email;
	var password = req.body.password;
	var fullName = req.body.fullName;
	console.log({ email, password, fullName });
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
	console.log(data);

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

app.post('/auth/JobProviderSignUp', (req, res) => {
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

app.get('/getAllJobs', async (req, res) => {
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

app.post('/saveJob', (req, res) => res.json({ Hello: 'Workin' }));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
    </style>
  </head>
  <body>
    <section>
      Hello from Render!
    </section>
  </body>
</html>
`;
