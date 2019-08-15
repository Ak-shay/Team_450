const express = require('express');

const app = express();

app.use(express.static('../public'));

app.get('/', function(req, res){
    res.sendFile('index');
});

app.listen(8595);