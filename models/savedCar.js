const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    year: String,
    make: String,
    model: String,
    type: String
});

module.exports = mongoose.model("Vehicle", userSchema);