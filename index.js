const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const voter = require('./controllers/voter'); 
const vote = require('./controllers/vote');
const candidate = require('./controllers/candidate');
const admin = require('./controllers/admin');

const app = express();

// connecting to db
// mongoose.connect("mongodb://team450:QBni1KVLaoIor4RfSV3ouCIxquWz37rTA6aQM4Jre0r8gBUukJw9mzulNR09XFJ6cK0zjrohiPkiZmGYUY0TAw%3D%3D@team450.documents.azure.com:10255/?ssl=true", { useNewUrlParser: false });
mongoose.connect('mongodb://localhost/election', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}); // for testing
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(express.static('./public'));

admin(app);
voter(app);
vote(app);
candidate(app);

app.get('/', function(req, res){
  res.render('home');
});

app.listen(process.env.PORT || 8080);