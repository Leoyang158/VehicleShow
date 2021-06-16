const express = require('express');
const router = express.Router();
const Veicle = require('../models/vehicle');
const { isLoggedIn } = require('../middleware'); //cannot book new flightroute if not signed in !!!

router.get('/', (req, res) => {  
    res.render('Info/search')
});


router.post('/', isLoggedIn, async(req, res) => {

    // const newCar = new Vehicle(req.body.flightroute); //saving using different attributes 
    // await newCar.save();
    // req.flash('success','Successfully!');
    res.redirect("/");
    // res.render('info/search')
    // res.send(req.body)
    // // const { password, username } = req.body
    // // res.send(password)
    // // res.send(username)
});


module.exports = router;