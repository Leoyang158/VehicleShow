const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');

router.get('/register', (req, res) => {
    res.render('users/register');
});

router.post('/register', catchAsync(async (req, res) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password); //take the username and password into the database
        // console.log(registeredUser)
        req.login(registeredUser, err => { //take the user and log them in 
            if(err) return next(err);
            req.flash('success', "Welcome to Vehicle Show")
            res.redirect('/lists');
        })
    } catch (e){
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('users/login')
})

//failure message if not authenticate
router.post('/login', passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res)=> {
    req.flash('success', 'welcome back')
    const redirectUrl = req.session.returnTo || '/lists'
    delete req.session.returnTo;
    res.redirect(redirectUrl)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/lists');
})

module.exports = router;