// const axios = require("axios");
// import axios from "axios";
const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e){
    e.preventDefault();
    // console.log(form.elements.make.value);
    // console.log(form.elements.year.value);
    // console.log(form.elements.model.value);
    // console.log(form.elements.type.value);
    // console.log(form.elements.range.value)
    const make = form.elements.make.value;
    const year = form.elements.year.value;
    const model = form.elements.model.value;
    const type = form.elements.type.value;
    const range = form.elements.type.value;
    //suggestion type: "SUV", "Convertible", "Pickup, "Sedan"

    // fetch(`https://car-data.p.rapidapi.com/cars?limit=10&page=0${make_query}${model_query}${year_query}${type_query}`
    
    const options = {
        method: 'GET',
        url: 'https://car-data.p.rapidapi.com/cars',
        params: {limit: '10', page: '0', year: year, type: type, model: model, make: make},
        headers: {
        'x-rapidapi-key': '20d6c5a99bmsh5f5da4f8b6aa626p101941jsn1c9e0828d976',
        'x-rapidapi-host': 'car-data.p.rapidapi.com'
        }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data);
        //adding the unsplash api here to abstract the picture
    }).catch(function (error) {
        console.error(error);
    });

      
})
