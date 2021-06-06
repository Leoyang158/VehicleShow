const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Vehicle = require('../models/vehicle');
const { vehicleSchema } = require('../schemas.js');

const validateVehicle = (req, res, next) => {
    const { error } = vehicledSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) =>{
    const cars = await Vehicle.find({})
    res.render('lists/index', {cars});
}));

router.get('/new', (req,res) => {
    res.render('lists/new');
})

router.post('/',  validateVehicle, catchAsync(async (req, res) => {
    const car = new Vehicle(req.body.car);
    await car.save();
    res.redirect(`/lists/${car._id}`)
}));

router.get('/:id', catchAsync(async (req, res) => {
    const car = await Vehicle.findById(req.params.id).populate('reviews');;
    res.render('lists/show', {car});
}));

router.get('/:id/edit', catchAsync(async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    res.render('lists/edit', { car });
}));

//
router.put('/:id',  validateVehicle, catchAsync(async (req, res) => {
    const { id } = req.params;
    const car = await Vehicle.findByIdAndUpdate(id, { ...req.body.car });
    res.redirect(`/lists/${car._id}`)
}));

// delete a vehicle page 
router.delete('/:id', catchAsync (async (req, res) => {
    const { id } = req.params;
    await Vehicle.findByIdAndDelete(id);
    res.redirect('/lists');
}));

module.exports = router;