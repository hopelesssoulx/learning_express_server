const express = require('express')
const router = express.Router()


const userInfo_handler = require('../router_handler/userInfo')


// 获取用户信息
router.get('/userInfo', userInfo_handler.getUserInfo)


module.exports = router
