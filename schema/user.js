const joi = require('joi')


const username = joi.string().alphanum().min(1).max(32).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.register_login_schema = {
    body: {
        username,
        password
    }
}


const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()

exports.update_userInfo_schema = {
    body: {
        id,
        nickname,
        email: user_email
    }
}


exports.update_user_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
