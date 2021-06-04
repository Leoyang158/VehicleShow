const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    year: String,
    make: String,
    model: String,
    type: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model("Vehicle", userSchema);