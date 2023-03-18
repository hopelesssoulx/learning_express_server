// 在此文件定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用


const db = require('../db/index')
const bcrypt = require('bcryptjs')


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
        if (e) {
            // return res.send({ status: 1, message: e.message })
            return res.cc(e)
        }
        if (rs.length > 0) {
            // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
            return res.cc('用户名被占用，请更换其他用户名！')
        }

        // 写入数据
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)
        const sql2 = 'insert into ev_users set ?'
        db.query(
            sql2, {
            username: userInfo.username,
            password: userInfo.password
        }, function (e, rs) {
            if (e) {
                // return res.send({ status: 1, message: e.message })
                return res.cc(e)
            }
            if (rs.affectedRows !== 1) {
                // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
                return res.cc('注册用户失败，请稍后再试！')
            }
            // res.send({ status: 0, message: '注册成功！' })
            return res.cc('注册成功！', 0)
        })
    })
}

// 登录
exports.login = (req, res) => {
    res.send('login OK')
}