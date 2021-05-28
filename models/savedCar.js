const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    carType:{
        type: String
    },
    modelType:{
        type: String
    },
    yearModel:{
        type: String
    }
})