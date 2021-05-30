const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    carType: String,
    modelType: String,
    yearModel: String
});

module.exports = mongoose.model("Vehicle", userSchema);