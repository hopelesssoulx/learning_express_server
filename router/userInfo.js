const express = require('express')
const router = express.Router()


const userInfo_handler = require('../router_handler/userInfo')


const expressJoi = require('@escook/express-joi')
const { update_userInfo_schema } = require('../schema/user')


// 获取用户信息
router.get('/userInfo', userInfo_handler.getUserInfo)

// 更新用户信息
router.post('/userInfo', expressJoi(update_userInfo_schema), userInfo_handler.updateUserInfo)


module.exports = router
