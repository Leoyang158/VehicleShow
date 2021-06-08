const express = require('express');
const router = express.Router({mergeParams: true}); 
//make sure set mergeParm to be true, to share the same params in the same file 

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const Vehicle = require('../models/vehicle');
const Review = require('../models/review');

const { reviewSchema } = require('../schemas.js');

router.post('/', validateReview, catchAsync(async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    const review = new Review(req.body.review);
    car.reviews.push(review);
    await review.save();
    await car.save();
    req.flash('success', 'Successfully make a new review');
    res.redirect(`/lists/${car._id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Vehicle.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted a review');
    res.redirect(`/lists/${id}`);
}))

module.exports = router; 