const Voter = require('../models/voter');
const Candidate = require('../models/candidate').Candidate;

module.exports = function(app) {
    app.get('/admin', function(req, res){
        var candidates = Candidate.find({});
        Voter.find({}, function(err, voters){
            if (err) throw err;
            res.render('admin', {voters: voters, candidates: candidates});
        });
    });

    app.post('/admin/:id', function(req, res){
        res.render('admin');
    });
};