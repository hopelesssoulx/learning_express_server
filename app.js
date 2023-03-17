const express = require('express')
const app = express()


const cors = require('cors')
app.use(cors())


app.use(express.urlencoded({ extended: false }))        // 仅解析 application/x-www-form-urlencoded


const userRouter = require('./router/user')
app.use('/api', userRouter)


app.listen(3000, function () {
    console.log('api server running at http://127.0.0.1:3000')
})
