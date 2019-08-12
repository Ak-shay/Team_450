const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const candidate = require('./candidate');

const CandidateSchema = candidate.CandidateSchema;

const VoterSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name of the voter  is required"]
    },
    adhaar: {
        type: Number,
        required: [true, "adhaar is neccary"]
    },
    voter_id: {
        type: String,
        required: [true, "voter id card is neccessary"]
    },
    age: {
        type: Number,
        required: [true, "age is required"]
    },
    can_vote: {
        type: Boolean,
        default: false
    },
    voted: {
        type: Boolean,
        default: false 
    },
    vote_to: {
        type: CandidateSchema
    }
});

const Voter = mongoose.model('Voter', VoterSchema);

module.exports = Voter;