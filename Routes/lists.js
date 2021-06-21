const express = require('express');
const router = express.Router();

const catchAsync = require('../utils/catchAsync');
// const ExpressError = require('../utils/ExpressError');

// const { vehicleSchema } = require('../schemas.js');
const { isLoggedIn, isAuthor, validateVehicle } = require('../middleware');
const Vehicle = require('../models/vehicle');

const lists = require('../controllers/lists');

// the index page, listing all the cars
router.route('/')
    // create a new vehicle , isLoggedIn is the middleware here to check whether the user has logged in yet
    .get(catchAsync(lists.index))
    // post the info to the following page
    .post(isLoggedIn, validateVehicle, catchAsync(lists.createVehicle))


router.get('/new', isLoggedIn, lists.renderNewForm)

router.route('/:id')
    // each vehicle has different id, and each id represents diff of pages 
    .get(catchAsync(lists.showVehile))  
    // updating a vehicle info
    .put(isLoggedIn, isAuthor, validateVehicle, catchAsync(lists.validateVehicle))
    // delete a vehicle page 
    .delete(isLoggedIn, isAuthor, catchAsync (lists.deleteVehicle));

    // reach to the edit page to edit the vehicle 
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(lists.editVehicle))

module.exports = router;