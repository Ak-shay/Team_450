const Voter = require('../models/voter');

module.exports = function(app){
    app.get('/voter', function(req, res){
        res.render('voter');
    });
    app.post('/voter', function(req, res){
        Voter.create(req.body).then(function(voter){
            res.send(voter);
        });
    });
};