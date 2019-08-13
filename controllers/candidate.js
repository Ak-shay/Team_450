const Candidate = require('../models/candidate').Candidate;

module.exports = function(app) {
    app.get('/candidate', function(req, res){
        res.render('candidate');
    });

    app.post('/candidate', function(req, res){
        Candidate.create(req.body).then(function(candidate){
            res.render('home');
        });    
    });

    app.delete('./candidate/:id', function(req, res){
        Candidate.findOneAndRemove({_id: req.params.id}, function(candidate){
            req.send(candidate);
        });
    });
};