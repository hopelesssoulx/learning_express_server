const db = require("../db/index")
const bcrypt = require('bcryptjs')

// 获取用户信息
exports.getUserInfo = (req, res) => {
    // 原始req在token被解析后修改加上auth属性
    const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
    db.query(sql, req.auth.id, (e, rs) => {
        if (e) {
            return res.cc(e)
        }
        if (rs.length !== 1) {
            return res.cc('获取用户信息失败')
        }
        res.send({
            status: 0,
            message: '获取用户信息成功',
            data: rs[0]
        })
    })
}

// 更新用户信息
exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(
        sql, [
        req.body,
        req.body.id
    ], (e, rs) => {
        if (e) {
            return res.cc(e)
        }
        if (rs.affectedRows !== 1) {
            return res.cc('更新用户信息失败')
        }

        res.cc('更新用户信息成功', 0)
    })
}

// 更新用户密码
exports.updateUserPassword = (req, res) => {
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.auth.id, (e, rs) => {
        if (e) {
            return res.cc(e)
        }
        if (rs.length !== 1) {
            return res.cc('用户不存在')
        }

        // 判断密码是否正确
        const compareRs = bcrypt.compareSync(req.body.oldPwd, rs[0].password)
        if (!compareRs) {
            return res.cc('旧密码错误')
        }

        // 更新密码
        const sql = 'update ev_users set password=? where id=?'
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(
            sql, [
            newPwd,
            req.auth.id
        ], (e, rs) => {
            if (e) {
                return res.cc(e)
            }
            if (rs.affectedRows !== 1) {
                return res.cc('更新密码失败')
            }

            res.cc('更新密码成功', 0)
        })
    })
}

// 更新用户头像
exports.updateUserAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    console.log('abaab');
    db.query(
        sql, [
        req.body.avatar,
        req.auth.id
    ], (e, rs) => {
        if (e) {
            return res.cc(e)
        }
        if (rs.affectedRows !== 1) {
            return res.cc('更换头像失败')
        }

        res.cc('更换头像成功', 0)
    })
}
