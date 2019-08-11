const express = require('express');
const mongoose = require('mongoose');
const voter = require('./controllers/voter'); 
const vote = require('./controllers/vote');
const candidate = require('./controllers/candidate');

// connecting to db
mongoose.connect("mongodb://team450:QBni1KVLaoIor4RfSV3ouCIxquWz37rTA6aQM4Jre0r8gBUukJw9mzulNR09XFJ6cK0zjrohiPkiZmGYUY0TAw%3D%3D@team450.documents.azure.com:10255/?ssl=true", { useNewUrlParser: false });

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

voter(app);
voter(app);
candidate(app);

app.get('/', function(req, res){
  res.render('home');
});

app.listen(process.env.PORT || 8080);