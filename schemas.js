const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');
const { number } = require('joi');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
})
const Joi = BaseJoi.extend(extension)

module.exports.vehicleSchema = Joi.object({
    car: Joi.object({
        year: Joi.number().required().min(0),
        make: Joi.string().required().escapeHTML(),
        model: Joi.string().required().escapeHTML(),
        type: Joi.string().required().escapeHTML(),
        url: Joi.string().escapeHTML(),
        description: Joi.string().required().escapeHTML(),
    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().escapeHTML()
    }).required()
})
