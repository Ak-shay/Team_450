const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Voter = new Schema({
    name: {
        type: String,
        required: [true, "Name of the voter  is required"]
    },

});