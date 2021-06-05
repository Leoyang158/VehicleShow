const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;
const VehicleSchema = new Schema({
    year: String,
    make: String,
    model: String,
    type: String,
    description: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

VehicleSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model("Vehicle", VehicleSchema);