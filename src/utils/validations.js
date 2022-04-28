import Joi from 'joi'

export const loginSchema = Joi.object({
    username: Joi.string().min(2).max(30).alphanum().required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
})

export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(30).alphanum().required(),
    password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    email: Joi.string().email().trim(true).required(),

})
export const massageSchema = Joi.object({
    massageText: Joi.string().min(3).max(100),
    userId: Joi.required(),
    time: Joi.string(),
    file: Joi.string()
})