const Joi = require('joi');

module.exports.vehicleSchema = Joi.object({
    vehicle: Joi.object({
        year: Joi.number().required().min(0),
        make: Joi.string().required(),
        type: Joi.string().required(),
        description: Joi.string().required(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})
