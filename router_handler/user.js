// 在此文件定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用


const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

// 注册
exports.register = (req, res) => {
    const userInfo = req.body

    // // 判断数据是否存在
    // if (!userInfo.username || !userInfo.password) {
    //     return res.send({ status: 1, message: '用户名或密码不能为空！' })
    // }

    // 判断用户是否存在
    const sql1 = `select * from ev_users where username=?`
    db.query(sql1, [userInfo.username], function (e, rs) {
        if (e)
            // return res.send({ status: 1, message: e.message })
            return res.cc(e)

        if (rs.length > 0)
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')


        // 写入数据
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sql2 = 'insert into ev_users set ?'
        db.query(
            sql2, {
            username: userInfo.username,
            password: userInfo.password
        }, function (e, rs) {
            if (e)
                // return res.send({ status: 1, message: e.message })
                return res.cc(e)

            if (rs.affectedRows !== 1)
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')

            // res.send({ status: 0, message: '注册成功！' })
            return res.cc('注册成功！', 0)
        })
    })
}

// 登录
exports.login = (req, res) => {
    const userInfo = req.body

    const sql = 'select * from ev_users where username=?'
    db.query(sql, userInfo.username, (e, rs) => {
        if (e) return res.cc(e)
        if (rs.length !== 1) return res.cc('登录失败')


        // 判断密码
        const compareRs = bcrypt.compareSync(userInfo.password, rs[0].password)
        if (!compareRs) return res.cc('登录失败')


        const user = { ...rs[0], password: '', user_pic: '' }
        const token = jwt.sign(user, config.jwtKey, { expiresIn: config.expiresIn })

        res.send({
            status: 0,
            message: '登录成功',
            token: 'Bearer ' + token
        })
    })
}
