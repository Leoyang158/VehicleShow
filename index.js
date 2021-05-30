const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Vehicle = require('./models/savedCar');
const request = require('request');

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

var axios = require("axios").default;
var options = {
  method: 'GET',
  url: 'https://car-data.p.rapidapi.com/cars',
  params: {limit: '10', page: '0'},
  headers: {
    'x-rapidapi-key': '20d6c5a99bmsh5f5da4f8b6aa626p101941jsn1c9e0828d976',
    'x-rapidapi-host': 'car-data.p.rapidapi.com'
  }
};
//
//////////////////////////////
const seedDB = async () =>{
    await Vehicle.deleteMany({});
    axios.request(options).then(function (response) {
        const json = response.data;
        for(let i = 0; i < 10; i++){
            let vehicle = JSON.parse(json[i]);
            const ve = new Vehicle({
                carType: '`${vehicle.type}`'
            })
            await ve.save();
        }
        // const firstVehicle = response.data[0];
        // const {id, year, make, model, type} = JSON.parse(firstVehicle);
        // res.send(id);
        // res.render('list', vehicleData)
    }).catch(function (error) {
        // console.error(error);
        res.send(error);
    });
    // const car = new Vehicle({carType: 'SUV'});
    // await car.save();

}
seedDB();

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

app.get('/list', async (req, res) =>{
    // fetch api
    // axios.request(options).then(function (response) {
    //     // console.log(response.data);
    //     // const vehicleData = ;
    //     // const obj = JSON.parse(response.data);
    //     const firstVehicle = response.data[0];
    //     const {id, year, make, model, type} = JSON.parse(firstVehicle);
    //     res.send(id);
    //     // res.render('list', vehicleData)
    // }).catch(function (error) {
    //     // console.error(error);
    //     res.send(error);
    // });
    // const vehicleList = await vehicles.find({});
    // res.send(vehicleList);
    // res.render('list', {vehicleList});

    // database
    ///////
    // // const vehicle = new Vehicle({carType: 'Honda', modelType: 'Sedan', yearModel: '2014'});
    // await vehicle.save();
    // res.send(vehicle);
    
})

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

app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})
