const express = require('express')
const router = express.Router()


const userInfo_handler = require('../router_handler/userInfo')


const expressJoi = require('@escook/express-joi')
const {
    update_userInfo_schema,
    update_user_password_schema,
    updateUserAvatar,
    update_user_avatar_schema } = require('../schema/user')


// 获取用户信息
router.get('/userInfo', userInfo_handler.getUserInfo)

// 更新用户信息
router.post('/userInfo', expressJoi(update_userInfo_schema), userInfo_handler.updateUserInfo)

// 更新用户密码
router.post('/updateUserPwd', expressJoi(update_user_password_schema), userInfo_handler.updateUserPassword)

// 更新用户头像
router.post('/update/avatar', expressJoi(update_user_avatar_schema), userInfo_handler.updateUserAvatar)


module.exports = router
