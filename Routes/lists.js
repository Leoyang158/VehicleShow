const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');

const { vehicleSchema } = require('../schemas.js');
const Vehicle = require('../models/vehicle');


const validateVehicle = (req, res, next) => {
    const { error } = vehicleSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

// the index page, listing all the cars
router.get('/', catchAsync(async (req, res) =>{
    const cars = await Vehicle.find({})
    res.render('lists/index', {cars});
}));

// create a new vehicle 
router.get('/new', (req,res) => {
    res.render('lists/new');
})

// post the info to the following page
router.post('/',  validateVehicle, catchAsync(async (req, res) => {
    const car = new Vehicle(req.body.car);
    await car.save();
    req.flash('success', 'Successfully make a new car');
    res.redirect(`/lists/${car._id}`)
}));

// each vehicle has different id
// each id represents diff of pages 
router.get('/:id', catchAsync(async (req, res) => {
    const car = await Vehicle.findById(req.params.id).populate('reviews');
    if(!car){
        req.flash('error', 'Cannot find that vehicle');
        return res.redirect('/lists')
    }
    res.render('lists/show', { car });
}));

// reach to the edit page to edit the vehicle 
router.get('/:id/edit', catchAsync(async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    if(!car){
        req.flash('error', 'Cannot find that vehicle');
        return res.redirect('/lists')
    }
    res.render('lists/edit', { car });
}));

// updating a vehicle info
router.put('/:id',  validateVehicle, catchAsync(async (req, res) => {
    const { id } = req.params;
    const car = await Vehicle.findByIdAndUpdate(id, { ...req.body.car });
    req.flash('success', 'Successfully updated vehicle');
    res.redirect(`/lists/${car._id}`)
}));

// delete a vehicle page 
router.delete('/:id', catchAsync (async (req, res) => {
    const { id } = req.params;
    await Vehicle.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted a review');
    res.redirect('/lists');
}));

module.exports = router;