//API interface 
const express = require("express");
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');

//Error Async 
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');

//validation schema 
const { vehicleSchema, reviewSchema } = require('./schemas.js');

//models MongoDB
const Vehicle = require('./models/vehicle');
const Review = require('./models/review');

//router links e
const lists = require('./Routes/lists');
const about = require('./Routes/about');
const contact = require('./Routes/contact');
const login = require('./Routes/login');
const search = require('./Routes/search');

//connecting to MongoDB 
mongoose.connect('mongodb://localhost:27017/vehicleShow', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true,
    useFindAndModify: false
});

//validation for the conenction with MongoDB
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

//Validating Schema for vehicle 
const validateVehicle = (req, res, next) => {
    const { error } = vehicledSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

////Validating Schema for review 
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//app.use different links 
app.use('/lists', lists)

app.use('/search', search)

app.use('/login', login)

app.use('/about', about)

app.use('/contact', contact)

app.get('/', (req, res) => {
    res.render('welcome')
});



app.post('/lists/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const car = await Vehicle.findById(req.params.id);
    const review = new Review(req.body.review);
    car.reviews.push(review);
    await review.save();
    await car.save();
    res.redirect(`/lists/${car._id}`);
}))

app.delete('/lists/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Vehicle.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/lists/${id}`);
}))

//this page will be presented if above webpage doesn't exist 
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
}) 


// Something can't be reached, then enter to this webpage
app.use((err, req, res, next) => {
    const {statusCode = 500, message = 'Something went wrong'} = err;
    res.status(statusCode).render('error', {err})
})

//connecting to the ports 
app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})
