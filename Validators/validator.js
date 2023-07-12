const Joi = require("joi");

const Schema = Joi.object({
        email: Joi.string().email().lowercase().required(),

        password : Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

         role : Joi.string()
           .required()
            .default("basic")

})

module.exports = Schema;
