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
        Candidate.findOne({_id:req.body.id}, function(err, candidate){
            if (err) throw err;
            Voter.countDocuments({voter_id: req.body.voter_id}, function(err, count){
                if (count > 0) {
                    Voter.findOne({voter_id: req.body.voter_id}, function(err, voter){
                        if (err) throw err;
                        if (voter.can_vote === true){
                            if (voter.voted === false) {
                                console.log("cand: "+candidate);
                                console.log("voter:" + voter);
                                console.log(req.body.id);
                                console.log(req.body.voter_id);
                                Voter.findOneAndUpdate({voter_id: req.body.voter_id }, {voted: true,vote_to: candidate}, {new:true}, function(err, data){
                                    if (err) throw err;
                                    console.log(data);
                                });
                                Candidate.findOneAndUpdate({_id:req.body.id}, {vote_count: candidate.vote_count+1}, {new:true}, function(err, data){
                                    if (err) throw err;
                                    console.log(data);
                                });
                                console.log("voted");
                                res.render('home');
                            }
                            else {
                                console.log("You have voted");
                                res.render('home');
                            };   
                        }
                        else {
                            console.log("you are not eligble to vote.");
                            res.render('home');
                        };
                    });
                }
                else{
                    console.log("Voter not found");
                    res.render('home');
                };
            });
        });
    });
};