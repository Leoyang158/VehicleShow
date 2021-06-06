const express = require('express');
const router = express.Router({mergeParams: true}); 
//make sure set mergeParm to be true, to share the same params in the same file 

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Vehicle = require('../models/vehicle');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.post('/', validateReview, catchAsync(async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    const review = new Review(req.body.review);
    car.reviews.push(review);
    await review.save();
    await car.save();
    res.redirect(`/lists/${car._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Vehicle.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/lists/${id}`);
}))

module.exports = router; 