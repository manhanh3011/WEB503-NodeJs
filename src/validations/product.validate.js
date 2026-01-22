import Joi from "joi";

const schema = Joi.object({
    name: Joi.string().required().max(200),
    price: Joi.number().required().min(0),
    description: Joi.string().required(),
});

export default schema;