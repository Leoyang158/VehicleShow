const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const VehicleSchema = new Schema({
    year: String,
    make: String,
    model: String,
    type: String,
    description: String,
    // reviews: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Review'
    //     }
    // ]
});

module.exports = mongoose.model("Vehicle", VehicleSchema);