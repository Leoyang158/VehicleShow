const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/vehicleShow', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// app.use(methodOverride('_method'));
///////////////////////////////
// var axios = require("axios").default;
// var options = {
//   method: 'GET',
//   url: 'https://car-data.p.rapidapi.com/cars',
//   params: {limit: '10', page: '0'},
//   headers: {
//     'x-rapidapi-key': '20d6c5a99bmsh5f5da4f8b6aa626p101941jsn1c9e0828d976',
//     'x-rapidapi-host': 'car-data.p.rapidapi.com'
//   }
// };
//
async function getCars(){
    fetch("https://car-data.p.rapidapi.com/cars?limit=10&page=0", { // &year=2000
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "20d6c5a99bmsh5f5da4f8b6aa626p101941jsn1c9e0828d976",
        "x-rapidapi-host": "car-data.p.rapidapi.com"
    }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}

//////////////////////////////

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

app.get('/list', (req, res) =>{
    // axios.request(options).then(function (response) {
    //     // console.log(response.data);
    //     res.send(response.data);
    // }).catch(function (error) {
    //     // console.error(error);
    //     res.send(error);
    // });
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
