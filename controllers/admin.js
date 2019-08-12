const Voter = require('../models/voter');
const Candidate = require('../models/candidate').Candidate;

module.exports = function(app) {
    app.get('/admin', function(req, res){
        var candidates = Candidate.find({});
        Voter.find({can_vote: false}, function(err, voters){
            if (err) throw err;
            res.render('admin', {voters: voters, candidates: candidates});
        });
    });

    app.post('/admin/voterverify/:id', function(req, res){
        Voter.findOneAndUpdate({voter_id: req.params.id}, {can_vote:true}, function(err, voter){
            if (err) throw err;
            console.log('updated' + voter);
        });
    });
};