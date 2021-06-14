const mongoose = require('mongoose');
const Vehicle = require('../models/vehicle');
const request = require('request');

mongoose.connect('mongodb://localhost:27017/vehicleShow', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const options = {
    method: 'GET',
    url: 'https://car-data.p.rapidapi.com/cars',
    qs: {limit: '10', page: '0'},
    headers: {
      'x-rapidapi-key': '20d6c5a99bmsh5f5da4f8b6aa626p101941jsn1c9e0828d976',
      'x-rapidapi-host': 'car-data.p.rapidapi.com',
      useQueryString: true
    }
};

// request(options, function (error, response, body) {
// if (error) throw new Error(error);
// const cars = JSON.parse(body);
// });
request(options, function (error, response, body) {
	if (error) throw new Error(error);
    const cars = JSON.parse(body);
    const seedDB = async () => {
        await Vehicle.deleteMany({});
        for(let car of cars){
                // console.log(car.make);
            const vehicle = new Vehicle({
                author: '60bfaa9f2b8c455074db2054',
                year: car.year,
                make: car.make,
                model: car.model,
                type:  car.type
            });
            await vehicle.save();
        }
    }
    seedDB().then(() => {
        mongoose.connection.close();
    })
});

