// const axios = require("axios");
// import axios from "axios";
const form = document.querySelector('#searchForm');
form.addEventListener('submit', async function (e){
        e.preventDefault();
        // console.log(form.elements.make.value);
        // console.log(form.elements.year.value);
        // console.log(form.elements.model.value);
        // console.log(form.elements.type.value);
        // console.log(form.elements.range.value);
        const make = form.elements.make.value;
        const year = form.elements.year.value;
        const model = form.elements.model.value;
        const type = form.elements.type.value;
        const range = form.elements.range.value;
        //suggestion type: "SUV", "Convertible", "Pickup, "Sedan"

        // fetch(`https://car-data.p.rapidapi.com/cars?limit=10&page=0${make_query}${model_query}${year_query}${type_query}`
        
        const options = {
            method: 'GET',
            url: 'https://car-data.p.rapidapi.com/cars',
            params: {limit: '4', page: '0', year: year, type: type, model: model, make: make},
            headers: {
            'x-rapidapi-key': '20d6c5a99bmsh5f5da4f8b6aa626p101941jsn1c9e0828d976',
            'x-rapidapi-host': 'car-data.p.rapidapi.com'
            }
        };
        //
        const vehicleCar = await axios.request(options).then(function (response) {
            // console.log(response.data);
            //adding the unsplash api here to abstract the picture
            // console.log(response.data)
            return response.data;

            }).catch(function (error) {
            console.error(error);
        });
    
        const container = document.querySelector('#container');
        container.innerHTML = "";
        for(let car of vehicleCar){
            // const imgApi = await axios.get(`https://api.unsplash.com/search/photos?query=${car['make']}${car['model']}${car['year']}&client_id=TFhu6RR7b5Ts2qtiboVZfSWWNjHsWx0gm12zaQZMr6I`);
            const imgApi = await axios.get(`https://api.unsplash.com/search/photos?query=${car['make']}&client_id=TFhu6RR7b5Ts2qtiboVZfSWWNjHsWx0gm12zaQZMr6I`);
            // const carImg = makeImages(imgApi);
            const carMake = car['make']; 
            const carModel = car['model'];
            const carYear = car['year'];
            const carType = car['type']; 

        // const carImg = 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fyc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80';
        // const carMake = 'Ford'; 
        // const carModel = 'Montemory';
        // const carYear = '2007';
        // const carType = 'Sedan'; 
        var entireCard = document.createElement("div");
        entireCard.classList.add("flip-card");

        var card = document.createElement('div');
        card.classList.add("flip-card-inner");

        var flipFront = document.createElement('div');
        flipFront.classList.add("flip-card-front")
        var newImg = document.createElement('img');
        newImg.classList.add('carGallery')
        newImg.src = imgApi['data']['results'][0]['urls'].raw;
        // newImg.src = carImg;
        newImg.alt = "Avatar";
        newImg.style = "width:300px;height:300px;"
        const imgLink = newImg.src;
        flipFront.appendChild(newImg);

        var carCollection = document.createElement('div');
        carCollection.classList.add("flip-card-back");
        carCollection.appendChild(document.createTextNode(carMake));

        var formHidden = document.createElement('form');
        // formHidden.setAttribute("id","hiddenForm");
        formHidden.setAttribute("method", "post");
        formHidden.setAttribute("action", "/search");

        const makeHidden = document.createElement('input');
        makeHidden.type = "hidden";
        makeHidden.name = "car[make]";
        makeHidden.value = carMake;

        const modelHidden = document.createElement('input');
        modelHidden.type = "hidden";
        modelHidden.name = "car[model]";
        modelHidden.value = carModel;

        const yearHidden = document.createElement('input');
        yearHidden.type = "hidden";
        yearHidden.name = "car[year]";
        yearHidden.value = carYear;

        const typeHidden = document.createElement('input');
        typeHidden.type = "hidden";
        typeHidden.name = "car[type]";
        typeHidden.value = carType;

        const urlHidden = document.createElement('input');
        urlHidden.type = "hidden";
        urlHidden.name = "car[url]";
        urlHidden.value = imgLink;

        const buttonInner = document.createElement('button');
        buttonInner.className = "btn btn-outline-primary";
        buttonInner.innerHTML = 'Like';

        formHidden.appendChild(makeHidden);
        formHidden.appendChild(modelHidden);
        formHidden.appendChild(yearHidden);
        formHidden.appendChild(typeHidden);
        formHidden.appendChild(urlHidden);
        formHidden.appendChild(buttonInner);

        carCollection.appendChild(formHidden);

        card.appendChild(flipFront);
        card.appendChild(carCollection);
        
        entireCard.appendChild(card);
        
        container.appendChild(entireCard)
    }  

    // const formNew = document.querySelector('#hiddenForm');
    // formNew.addEventListener('submit', async function (e){
    //     e.preventDefault();
    //     const Cmake = form.elements.hiddenMake.value;
    //     const Cyear = form.elements.hiddenYear.value;
    //     const Cmodel = form.elements.hiddenModel.value;
    //     const Ctype = form.elements.hiddenType.value;
    //     const Curl = form.elements.hiddenUrl.value;
    //     const CnewCar = new Vehicle({
    //         author: '60bfaa9f2b8c455074db2054',
    //         year: Cyear,
    //         make: Cmake,
    //         model: Cmodel,
    //         type:  Ctype,
    //         url: Curl
    //     });
    //     await CnewCar.save();
    // })
})

// const makeImages = (vehicleImg) => {
//     const img = document.createElement('IMG');
//     img.src = vehicleImg['data']['results'][0]['urls'].raw
//     document.body.append(img)
// }

