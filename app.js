const express = require('express')
const app = express()


const cors = require('cors')
app.use(cors())


app.use(express.urlencoded({ extended: false }))        // 仅解析 application/x-www-form-urlencoded


// 在路由前声明
// 响应数据的中间件
app.use(function (req, res, next) {
    // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
    res.cc = function (e, status = 1) {
        res.send({
            // 状态
            status,
            // 状态描述，判断 err 是 错误对象 还是 字符串
            message: e instanceof Error ? e.message : e,
        })
    }
    next()
})


// 在路由前声明
// 解析token的中间件
const { expressjwt: expressJWT } = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtKey, algorithms: ['HS256'] }).unless({ path: [/^\/api/] }))


const userRouter = require('./router/user')
app.use('/api', userRouter)


const joi = require('joi')
// 错误级别的中间件
app.use((e, req, res, next) => {
    if (e instanceof joi.ValidationError) {
        res.cc(e)
    }
    if (e.name === 'UnauthorizedError') {
        res.cc('身份验证失败')
    }
    res.cc(e)       // 未知错误 
})


app.listen(3000, function () {
    console.log('api server running at http://127.0.0.1:3000')
})
