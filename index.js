const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const voter = require('./controllers/voter'); 
const vote = require('./controllers/vote');
const candidate = require('./controllers/candidate');
const admin = require('./controllers/admin');
const Web3 = require('web3');
const app = express();

// connecting to db
// mongoose.connect("mongodb://team450:QBni1KVLaoIor4RfSV3ouCIxquWz37rTA6aQM4Jre0r8gBUukJw9mzulNR09XFJ6cK0zjrohiPkiZmGYUY0TAw%3D%3D@team450.documents.azure.com:10255/?ssl=true", { useNewUrlParser: false });
mongoose.connect('mongodb+srv://election:election@cluster0-xgqvg.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}, function(err){
// mongoose.connect('mongodb://localhost/election', {useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true}, function(err){
  if (err) throw err;
  console.log("db connected");
}); // for testing
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

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
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var account;
web3.eth.getAccounts().then((f) => {
 account = f[0];
});
abi = JSON.parse(fs.readFileSync('./Election_sol_Election.abi').toString())
address = "0x71789831d83d4C8325b324eA9B5fFB27525480b5";
// update this contract address with your contract address
contract = new web3.eth.Contract(abi,address);
candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"}

function voteForCandidate(candidate) {
 candidateName = $("#candidate").val();
 console.log(candidateName);

 contract.methods.voteForCandidate(web3.utils.asciiToHex(candidateName)).send({from: account}).then((f) => {
  let div_id = candidates[candidateName];
  contract.methods.totalVotesFor(web3.utils.asciiToHex(candidateName)).call().then((f) => {
   $("#" + div_id).html(f);
  })
 })
}

$(document).ready(function() {
 candidateNames = Object.keys(candidates);

 for(var i=0; i<candidateNames.length; i++) {
 let name = candidateNames[i];
  
 contract.methods.totalVotesFor(web3.utils.asciiToHex(name)).call().then((f) => {
  $("#" + candidates[name]).html(f);
 })
 }
});


