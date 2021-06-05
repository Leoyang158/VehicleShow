const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
// const { campgroundSchema, reviewSchema } = require('./schemas.js');
// const catchAsync = require('./utils/catchAsync');
const methodOverride = require('method-override');
const Vehicle = require('./models/vehicle');
// const request = require('request');
// const { RSA_NO_PADDING } = require("constants");
// const catchAsync = require('./utils/catchAsync')
// const ExpressError = require('./utils/ExpressError');
// const session = require('express-session');
// const flash = require('connect-flash');
// const passport = require('passport')
// const LocalStrategy = require('passport-local')
// const User = require('./models/user')

mongoose.connect('mongodb://localhost:27017/vehicleShow', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// app.use(session(sessionConfig))
// app.use(flash())
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => {
    res.render('welcome')
});

app.get('/lists', async (req, res) =>{
    const cars = await Vehicle.find({})
    res.render('lists/index', {cars});
})

app.get('/lists/new', (req,res) => {
    res.render('lists/new');
})

app.post('/lists', async (req, res) => {
    const car = new Vehicle(req.body.car);
    await car.save();
    console.log("Here")
    res.redirect(`/lists/${car._id}`)
})

app.get('/lists/:id', async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    res.render('lists/show', {car});
})

app.get('/lists/:id/edit', async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    res.render('lists/edit', { car });
})

app.put('/lists/:id', async (req, res) => {
    const { id } = req.params;
    const car = await Vehicle.findByIdAndUpdate(id, { ...req.body.car });
    res.redirect(`/lists/${car._id}`)
});

app.delete('/lists/:id', async (req, res) => {
    const { id } = req.params;
    await Vehicle.findByIdAndDelete(id);
    res.redirect('/lists');
})

/////
app.get('/search', (req, res) => {  
    res.render('Info/search')
});

app.post('/search', (req, res) => {
    // res.render('info/search')
    res.send(req.body)
    // const { password, username } = req.body
    // res.send(password)
    // res.send(username)
});

// app.post('/lists', catchAsync(async (req, res, next) => {
//     // try{
//     // const newCar = new Vehicle(req.body.list);
//         // console.log(newCar);
//     // await newCar.save();
//     res.redirect('/lists');

//     // } catch (e) {
//     //     next(e);
//     // }
//     // await newCar.save();
//     // res.redirect(`/lists/${newCar._id}`);
// }))

app.get('/login', (req, res) =>{
    // res.send("Login")
    res.render('Info/login')
})

app.get('/about', (req, res) =>{
    res.render('Info/about')
})

app.get('/contact', (req, res) =>{
    res.render('Info/contact')
})

// app.post('/campgrounds/:id/reviews', catchAsync(async (req, res) => {
//     res.send("You made it");
// }))

app.all('*', (req, res, next) => {
    // res.send("404!!!")
    next(new ExpressError('Page Not Found', 404))
}) //this page will be presented if above webpage doesn't exist 

app.use((err, req, res, next) => {
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).render('error', {err})
    // res.send("Something went wrong");
})
app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})
