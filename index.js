const express = require("express");
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }));
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
//////////////////////////////

app.get('/', (req, res) => {
    res.render('welcome')
});

app.get('/search', (req, res) => {
    res.render('info/search')
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


app.listen(3000, () => {
    console.log('Serving app on localhost:3000')
})
