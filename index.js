const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Vehicle = require('./models/savedCar');
const request = require('request');
const { RSA_NO_PADDING } = require("constants");
const catchAsync = require('./utils/catchAsync')
const ExpressError = require('./utils/ExpressError');

mongoose.connect('mongodb://localhost:27017/vehicleShow', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('welcome')
});

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

app.get('/lists', async (req, res) =>{
    const cars = await Vehicle.find({})
    res.render('lists/list', {cars});
})

app.get('/lists/new', (req,res) => {
    res.render('lists/new');
})

app.post('/lists', catchAsync(async (req, res, next) => {
    // try{
    // const newCar = new Vehicle(req.body.list);
        // console.log(newCar);
    // await newCar.save();
    res.redirect('/lists');

    // } catch (e) {
    //     next(e);
    // }
    // await newCar.save();
    // res.redirect(`/lists/${newCar._id}`);
}))

//////////////////////////////////////////////////////
app.get('/lists/:id', async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    res.render('lists/show', {car});
})

app.get('/lists/:id/edit', async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    res.render('lists/edit', { car });
})

// app.put('/lists/:id', async (req, res) => {
//     const { id } = req.params;
//     const car = await Veehicle.findByIdAndUpdate(id, { ...req.body.list });
//     res.redirect(`/lists/${list._id}`)
// });

// app.delete('/lists/:id', async (req, res) => {
//     const { id } = req.params;
//     await Vehicle.findByIdAndDelete(id);
//     res.redirect('/lists');
// })
///////////////////////////////////////////////////////

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

app.post('/campgrounds/:id/reviews', catchAsync(async (req, res) => {
    res.send("You made it");
}))

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
