const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name of the candidate  is required"]
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
    }
});

mongoose.model('Admin', AdminSchema);

module.exports = Admin;