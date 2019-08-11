const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Candidate = new Schema({
    name: {
        type: String,
        required: [true, "Name of the candidate  is required"]
    },

});