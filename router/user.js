const express = require('express')
const router = express.Router()


const userHandler = require('../router_handler/user')


const expressJoi = require('@escook/express-joi')
const { register_login_schema } = require('../schema/user')


// 注册
router.post('/register', expressJoi(register_login_schema), userHandler.register)

// 登录
router.post('/login', userHandler.login)


module.exports = router
