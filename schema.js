const Joi = require('joi');
module.exports.listingSchema=Joi.object({
    listing:Joi.object({
        title:Joi.string().min(3).required(),
        description:Joi.string().min(20).required(),
        price:Joi.number().min(0).required(),
        location:Joi.string().min(5).required(),
        country:Joi.string().required(),
        image:Joi.string().allow("",null),
    }).required(),
    
})
module.exports.reviewSchema=Joi.object({
    review:Joi.object({
        rating:Joi.string().min(1).max(5).required(),
        comment:Joi.string().required(),
    }).required()
})