const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const express = require('express');
const app = express.Router();

const uri =
	'mongodb+srv://pranjaljain0:Cu006bzbMitUTbcM@cluster0.gylbe.mongodb.net/Hirect?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json({ Route: 'Helper' }));

app.get('/jsonstr', (req, res) => res.json({ str: { fullName: 'PJB' } }));

app.post('/saveJob', (req, res) => res.json({ Hello: 'Workin' }));

module.exports = app;
