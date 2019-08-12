const Candidate = require('../models/candidate').Candidate;
const Voter = require('../models/voter');

module.exports = function(app) {

    app.get('/vote', function(req, res){
        Candidate.find({}, function(err, data){
            if (err) throw err;
            res.render('vote', {candidates: data});
        });
    });

    app.post('/vote', function(req, res){
        Voter.find({voter_id: req.body.voter_id}, function(err, voter){
            if (err) throw err;
            console.log(voter[0].voted);
            if (voter[0].voted) {
                console.log("not voted");
                if (voter[0].can_vote === true) {
                    Candidate.find({_id: req.body.id}, function(err, candidate){
                        if (err) throw err;
                        console.log(candidate);
                        voter[0].vote_to = candidate;
                        voter[0].voted = true;
                        var votes = candidate.vote_count++;
                        candidate.updateOne({vote_count:votes});
                        res.send("voted");
                    });
                }
                else{
                    res.send('You are not eligible to vote.')
                };
            };
        });
    });

};