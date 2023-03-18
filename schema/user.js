const joi = require('joi')


const username = joi.string().alphanum().min(1).max(32).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()


exports.register_login_schema = {
    body: {
        username,
        password
    }
}
