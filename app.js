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


const userRouter = require('./router/user')
app.use('/api', userRouter)


app.listen(3000, function () {
    console.log('api server running at http://127.0.0.1:3000')
})
