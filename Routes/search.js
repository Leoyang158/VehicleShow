const express = require('express');
const router = express.Router();
const Vehicle = require('../models/vehicle');
const { isLoggedIn, isAuthor } = require('../middleware'); //cannot book new flightroute if not signed in !!!
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

router.get('/', (req, res) => {  
    res.render('info/search');
});

router.post('/', isLoggedIn, catchAsync(async(req, res) => {
    // const { year, make, model, type, url} = req.params;
    // const newCar = new Vehicle({
    //     author: req.user._id,
    //     year: '1998',
    //     make: make,
    //     model: model,
    //     type: type,
    //     url: url
    // });
    const newCar = new Vehicle(req.body.car);
    newCar.author = req.user._id;
    await newCar.save();
    req.flash('success','Successfully!');
    res.redirect("/search");
}))


module.exports = router;